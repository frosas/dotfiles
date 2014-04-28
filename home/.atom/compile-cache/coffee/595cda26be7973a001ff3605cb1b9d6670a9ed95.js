(function() {
  var Point, issymbol, mergeAdjacent, resym;

  Point = require('atom').Point;

  resym = /^(entity.name.type.class|entity.name.function|entity.other.attribute-name.class)/;

  module.exports = function(path, grammar, text) {
    var lineno, lines, offset, prev, symbols, token, tokens, _i, _j, _len, _len1;
    lines = grammar.tokenizeLines(text);
    symbols = [];
    for (lineno = _i = 0, _len = lines.length; _i < _len; lineno = ++_i) {
      tokens = lines[lineno];
      offset = 0;
      prev = null;
      for (_j = 0, _len1 = tokens.length; _j < _len1; _j++) {
        token = tokens[_j];
        if (issymbol(token)) {
          if (!mergeAdjacent(prev, token, symbols, offset)) {
            symbols.push({
              name: token.value,
              path: path,
              position: new Point(lineno, offset)
            });
            prev = token;
          }
        }
        offset += token.bufferDelta;
      }
    }
    return symbols;
  };

  issymbol = function(token) {
    var scope, _i, _len, _ref;
    if (token.value.trim().length && token.scopes) {
      _ref = token.scopes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        scope = _ref[_i];
        if (resym.test(scope)) {
          return true;
        }
      }
    }
    return false;
  };

  mergeAdjacent = function(prevToken, thisToken, symbols, offset) {
    var prevSymbol;
    if (offset && prevToken) {
      prevSymbol = symbols[symbols.length - 1];
      if (offset === prevSymbol.position.column + prevToken.value.length) {
        prevSymbol.name += thisToken.value;
        return true;
      }
    }
    return false;
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQ0E7QUFBQSxNQUFBLHFDQUFBOztBQUFBLEVBQUMsUUFBUyxPQUFBLENBQVEsTUFBUixFQUFULEtBQUQsQ0FBQTs7QUFBQSxFQUlBLEtBQUEsR0FBUSxrRkFKUixDQUFBOztBQUFBLEVBVUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsU0FBQyxJQUFELEVBQU8sT0FBUCxFQUFnQixJQUFoQixHQUFBO0FBQ2YsUUFBQSx3RUFBQTtBQUFBLElBQUEsS0FBQSxHQUFRLE9BQU8sQ0FBQyxhQUFSLENBQXNCLElBQXRCLENBQVIsQ0FBQTtBQUFBLElBRUEsT0FBQSxHQUFVLEVBRlYsQ0FBQTtBQUlBLFNBQUEsOERBQUE7NkJBQUE7QUFDRSxNQUFBLE1BQUEsR0FBUyxDQUFULENBQUE7QUFBQSxNQUNBLElBQUEsR0FBTyxJQURQLENBQUE7QUFFQSxXQUFBLCtDQUFBOzJCQUFBO0FBQ0UsUUFBQSxJQUFHLFFBQUEsQ0FBUyxLQUFULENBQUg7QUFDRSxVQUFBLElBQUcsQ0FBQSxhQUFJLENBQWMsSUFBZCxFQUFvQixLQUFwQixFQUEyQixPQUEzQixFQUFvQyxNQUFwQyxDQUFQO0FBQ0UsWUFBQSxPQUFPLENBQUMsSUFBUixDQUFhO0FBQUEsY0FBRSxJQUFBLEVBQU0sS0FBSyxDQUFDLEtBQWQ7QUFBQSxjQUFxQixJQUFBLEVBQU0sSUFBM0I7QUFBQSxjQUFpQyxRQUFBLEVBQWMsSUFBQSxLQUFBLENBQU0sTUFBTixFQUFjLE1BQWQsQ0FBL0M7YUFBYixDQUFBLENBQUE7QUFBQSxZQUNBLElBQUEsR0FBTyxLQURQLENBREY7V0FERjtTQUFBO0FBQUEsUUFJQSxNQUFBLElBQVUsS0FBSyxDQUFDLFdBSmhCLENBREY7QUFBQSxPQUhGO0FBQUEsS0FKQTtXQWNBLFFBZmU7RUFBQSxDQVZqQixDQUFBOztBQUFBLEVBMkJBLFFBQUEsR0FBVyxTQUFDLEtBQUQsR0FBQTtBQUlULFFBQUEscUJBQUE7QUFBQSxJQUFBLElBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFaLENBQUEsQ0FBa0IsQ0FBQyxNQUFuQixJQUE4QixLQUFLLENBQUMsTUFBdkM7QUFDRTtBQUFBLFdBQUEsMkNBQUE7eUJBQUE7QUFDRSxRQUFBLElBQUcsS0FBSyxDQUFDLElBQU4sQ0FBVyxLQUFYLENBQUg7QUFDRSxpQkFBTyxJQUFQLENBREY7U0FERjtBQUFBLE9BREY7S0FBQTtBQUlBLFdBQU8sS0FBUCxDQVJTO0VBQUEsQ0EzQlgsQ0FBQTs7QUFBQSxFQXFDQSxhQUFBLEdBQWdCLFNBQUMsU0FBRCxFQUFZLFNBQVosRUFBdUIsT0FBdkIsRUFBZ0MsTUFBaEMsR0FBQTtBQVNkLFFBQUEsVUFBQTtBQUFBLElBQUEsSUFBRyxNQUFBLElBQVcsU0FBZDtBQUNFLE1BQUEsVUFBQSxHQUFhLE9BQVEsQ0FBQSxPQUFPLENBQUMsTUFBUixHQUFlLENBQWYsQ0FBckIsQ0FBQTtBQUNBLE1BQUEsSUFBRyxNQUFBLEtBQVUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFwQixHQUE2QixTQUFTLENBQUMsS0FBSyxDQUFDLE1BQTFEO0FBQ0UsUUFBQSxVQUFVLENBQUMsSUFBWCxJQUFtQixTQUFTLENBQUMsS0FBN0IsQ0FBQTtBQUNBLGVBQU8sSUFBUCxDQUZGO09BRkY7S0FBQTtBQU1BLFdBQU8sS0FBUCxDQWZjO0VBQUEsQ0FyQ2hCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/frosas/projects/dotfiles/home/.atom/packages/goto/lib/symbol-generator.coffee