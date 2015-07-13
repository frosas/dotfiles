'use strict';

var debug = require('debug')('rocambole:indent');
var tk = require('rocambole-token');
var escapeRegExp = require('mout/string/escapeRegExp');
var repeat = require('mout/string/repeat');


// ---

var _opts = {
  value: '  '
};

// ---


exports.setOptions = function(opts) {
  _opts = opts;
};


exports.inBetween = indentInBetween;
function indentInBetween(startToken, endToken, level) {
  level = level != null ? level : 1;

  if (!level || (!startToken || !endToken) || startToken === endToken) {
    debug(
      '[inBetween] not going to indent. start: %s, end: %s, level: %s',
      startToken && startToken.value,
      endToken && endToken.value,
      level
    );
    return;
  }

  var token = startToken && startToken.next;
  var endsWithBraces = isClosingBrace(endToken);
  while (token && token !== endToken) {
    if (tk.isBr(token.prev)) {
      // we ignore the last indent (if first token on the line is a ws or
      // ident) just because in most cases we don't want to change the indent
      // just before "}", ")" and "]" - this allow us to pass
      // `node.body.startToken` and `node.body.endToken` as the range
      if (token.next !== endToken || !endsWithBraces || !tk.isEmpty(token)) {
        addLevel(token, level);
      }
    }
    token = token.next;
  }
}


function isClosingBrace(token) {
  var val = token.value;
  return val === ')' || val === '}' || val === ']';
}


exports.addLevel = addLevel;
function addLevel(token, level) {
  if (!level) {
    // zero is a noop
    return;
  }

  token = findStartOfLine(token);

  if (!token) {
    // we never indent empty lines!
    debug('[indent.addLevel] can\'t find start of line');
    return;
  }

  var value = repeat(_opts.value, Math.abs(level));

  if (tk.isIndent(token)) {
    if (level > 0) {
      // if it's already an Indent we just bump the value & level
      token.value += value;
      token.level += level;
    } else {
      if (token.level + level <= 0) {
        tk.remove(token);
      } else {
        token.value = token.value.replace(value, '');
        token.level += level;
      }
    }
    if (token.next && token.next.type === 'BlockComment') {
      updateBlockComment(token.next);
    }
    return;
  }

  if (level < 1) {
    // we can't remove indent if previous token isn't an indent
    debug(
      '[addLevel] we can\'t decrement if line doesn\'t start with Indent. token: %s, level: %s',
      token && token.value,
      level
    );
    return;
  }

  if (tk.isWs(token)) {
    // convert WhiteSpace token into Indent
    token.type = 'Indent';
    token.value = value;
    token.level = level;
    return;
  }

  // if regular token we add a new Indent before it
  tk.before(token, {
    type: 'Indent',
    value: value,
    level: level
  });

  if (token.type === 'BlockComment') {
    updateBlockComment(token);
  }
}

function findStartOfLine(token) {
  if (tk.isBr(token) && tk.isBr(token.prev)) {
    // empty lines are ignored
    return null;
  }
  var prev = token.prev;
  while(true) {
    if (!prev || tk.isBr(prev)) {
      return token;
    }
    token = prev;
    prev = token.prev;
  }
}


exports.sanitize = sanitize;
function sanitize(astOrNode) {
  var token = astOrNode.startToken;
  var end = astOrNode.endToken && astOrNode.endToken.next;
  while (token && token !== end) {
    var next = token.next;
    if (isOriginalIndent(token)) {
      tk.remove(token);
    }
    token = next;
  }
}


function isOriginalIndent(token) {
  // original indent don't have a "level" value
  // we also need to remove any indent that happens after a token that
  // isn't a line break (just in case these are added by mistake)
  return (token.type === 'WhiteSpace' && (!token.prev || tk.isBr(token.prev)) && !tk.isBr(token.next)) ||
    (token.type === 'Indent' && (token.level == null || !tk.isBr(token.prev)));
}


exports.updateBlockComment = updateBlockComment;
function updateBlockComment(comment) {
  var orig = new RegExp('([\\n\\r]+)' + escapeRegExp(comment.originalIndent || ''), 'gm');
  var update = comment.prev && comment.prev.type === 'Indent'? comment.prev.value : '';
  comment.raw = comment.raw.replace(orig, '$1' + update);
  // override the originalIndent so multiple consecutive calls still work as
  // expected
  comment.originalIndent = update;
}


// comments are aligned based on the next line unless the line/block is
// followed by an empty line, in that case it will use the previous line as
// reference.
exports.alignComments = alignComments;
function alignComments(nodeOrAst) {
  var first = nodeOrAst.startToken;
  var token = nodeOrAst.endToken;
  while (token && token !== first) {
    if (tk.isComment(token) && (tk.isBr(token.prev) || tk.isIndent(token.prev) || !token.prev)) {
      var base = findReferenceIndent(token);
      if (!base) {
        if (tk.isIndent(token.prev)) {
          tk.remove(token.prev);
        }
      } else {
        if (tk.isIndent(token.prev)) {
          token.prev.value = base.value;
          token.prev.level = base.level;
        } else {
          tk.before(token, {
            type: 'Indent',
            value: base.value,
            level: base.level
          });
        }
      }

      if (token.type === 'BlockComment') {
        updateBlockComment(token);
      }
    }
    token = token.prev;
  }
}

function findReferenceIndent(start) {
  var prevLine = findPrevReference(start);
  var nextLine = findNextReference(start);
  // we favor nextLine unless it's empty
  if (tk.isBr(nextLine) || tk.isWs(nextLine) || !nextLine) {
    return tk.isIndent(prevLine) && prevLine.level ? prevLine : null;
  }
  return tk.isIndent(nextLine) && nextLine.level ? nextLine : null;
}

function findPrevReference(start) {
  var token = start.prev;
  var changedLine = false;
  while (token) {
    // multiple consecutive comments should use the same reference (consider as
    // a single block)
    if (changedLine && tk.isBr(token) && nextInLineNotComment(token)) {
      return token.next;
    }
    if (tk.isBr(token)) {
      changedLine = true;
    }
    token = token.prev;
  }
}

function findNextReference(start) {
  var token = start.next;
  while (token) {
    // multiple consecutive comments should use the same reference (consider as
    // a single block)
    if (tk.isBr(token) && nextInLineNotComment(token)) {
      return token.next;
    }
    token = token.next;
  }
}

function nextInLineNotComment(token) {
  token = token.next;
  while (token) {
    if (tk.isBr(token)) {
      return true;
    }
    if (!tk.isEmpty(token)) {
      return !tk.isComment(token);
    }
    token = token.next;
  }
  return true;
}
