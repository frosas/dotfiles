(function() {
  var SymbolIndex, fs, generate, minimatch, path, utils, _;

  fs = require('fs');

  path = require('path');

  _ = require('underscore');

  minimatch = require('minimatch');

  generate = require('./symbol-generator');

  utils = require('./symbol-utils');

  module.exports = SymbolIndex = (function() {
    function SymbolIndex(entries) {
      var n, _ref, _ref1, _ref2;
      this.entries = {};
      this.rescanDirectories = true;
      this.root = atom.project.getRootDirectory();
      this.repo = atom.project.getRepo();
      this.ignoredNames = (_ref = atom.config.get('core.ignoredNames')) != null ? _ref : [];
      if (typeof this.ignoredNames === 'string') {
        this.ignoredNames = [ignoredNames];
      }
      this.logToConsole = (_ref1 = atom.config.get('goto.logToConsole')) != null ? _ref1 : false;
      this.moreIgnoredNames = (_ref2 = atom.config.get('goto.moreIgnoredNames')) != null ? _ref2 : '';
      this.moreIgnoredNames = (function() {
        var _i, _len, _ref3, _results;
        _ref3 = this.moreIgnoredNames.split(/[, \t]+/);
        _results = [];
        for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
          n = _ref3[_i];
          if (n != null ? n.length : void 0) {
            _results.push(n);
          }
        }
        return _results;
      }).call(this);
      this.noGrammar = {};
      this.subscribe();
    }

    SymbolIndex.prototype.invalidate = function() {
      this.entries = {};
      return this.rescanDirectories = true;
    };

    SymbolIndex.prototype.subscribe = function() {
      atom.project.on('path-changed', (function(_this) {
        return function() {
          _this.root = atom.project.getRootDirectory();
          _this.repo = atom.project.getRepo();
          return _this.invalidate();
        };
      })(this));
      atom.config.observe('core.ignoredNames', (function(_this) {
        return function() {
          var _ref;
          _this.ignoredNames = (_ref = atom.config.get('core.ignoredNames')) != null ? _ref : [];
          if (typeof _this.ignoredNames === 'string') {
            _this.ignoredNames = [ignoredNames];
          }
          return _this.invalidate();
        };
      })(this));
      atom.config.observe('goto.moreIgnoredNames', (function(_this) {
        return function() {
          var n, _ref;
          _this.moreIgnoredNames = (_ref = atom.config.get('goto.moreIgnoredNames')) != null ? _ref : '';
          _this.moreIgnoredNames = (function() {
            var _i, _len, _ref1, _results;
            _ref1 = this.moreIgnoredNames.split(/[, \t]+/);
            _results = [];
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
              n = _ref1[_i];
              if (n != null ? n.length : void 0) {
                _results.push(n);
              }
            }
            return _results;
          }).call(_this);
          return _this.invalidate();
        };
      })(this));
      atom.project.eachBuffer((function(_this) {
        return function(buffer) {
          buffer.on('contents-modified', function() {
            return _this.entries[buffer.getPath()] = null;
          });
          return buffer.on('destroyed', function() {
            return buffer.off();
          });
        };
      })(this));
      return atom.workspace.eachEditor((function(_this) {
        return function(editor) {
          editor.on('grammar-changed', function() {
            return _this.entries[editor.getPath()] = null;
          });
          return editor.on('destroyed', function() {
            return editor.off();
          });
        };
      })(this));
    };

    SymbolIndex.prototype.destroy = function() {
      return this.entries = null;
    };

    SymbolIndex.prototype.getEditorSymbols = function(editor) {
      var fqn;
      fqn = editor.getPath();
      if (!this.entries[fqn] && this.keepPath(fqn)) {
        this.entries[fqn] = generate(fqn, editor.getGrammar(), editor.getText());
      }
      return this.entries[fqn];
    };

    SymbolIndex.prototype.getAllSymbols = function() {
      var fqn, s, symbols, _ref;
      this.update();
      s = [];
      _ref = this.entries;
      for (fqn in _ref) {
        symbols = _ref[fqn];
        Array.prototype.push.apply(s, symbols);
      }
      return s;
    };

    SymbolIndex.prototype.update = function() {
      var fqn, symbols, _ref, _results;
      if (this.rescanDirectories) {
        return this.rebuild();
      } else {
        _ref = this.entries;
        _results = [];
        for (fqn in _ref) {
          symbols = _ref[fqn];
          if (symbols === null && this.keepPath(fqn)) {
            _results.push(this.processFile(fqn));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    };

    SymbolIndex.prototype.rebuild = function() {
      if (this.root) {
        this.processDirectory(this.root.path);
      }
      this.rescanDirectories = false;
      if (this.logToConsole) {
        return console.log('No Grammar:', Object.keys(this.noGrammar));
      }
    };

    SymbolIndex.prototype.gotoDeclaration = function() {
      var e, filePath, fqn, matches, symbols, word, _ref;
      e = atom.workspace.getActiveEditor();
      word = e != null ? e.getTextInRange(e.getCursor().getCurrentWordBufferRange()) : void 0;
      if (!(word != null ? word.length : void 0)) {
        return null;
      }
      this.update();
      filePath = e.getPath();
      matches = [];
      this.matchSymbol(matches, word, this.entries[filePath]);
      _ref = this.entries;
      for (fqn in _ref) {
        symbols = _ref[fqn];
        if (fqn !== filePath) {
          this.matchSymbol(matches, word, symbols);
        }
      }
      if (matches.length === 0) {
        return null;
      }
      if (matches.length > 1) {
        return matches;
      }
      return utils.gotoSymbol(matches[0]);
    };

    SymbolIndex.prototype.matchSymbol = function(matches, word, symbols) {
      var symbol, _i, _len, _results;
      if (symbols) {
        _results = [];
        for (_i = 0, _len = symbols.length; _i < _len; _i++) {
          symbol = symbols[_i];
          if (symbol.name === word) {
            _results.push(matches.push(symbol));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    };

    SymbolIndex.prototype.processDirectory = function(dirPath) {
      var dir, dirs, entries, entry, fqn, stats, _i, _j, _len, _len1, _results;
      if (this.logToConsole) {
        console.log('GOTO: directory', dirPath);
      }
      entries = fs.readdirSync(dirPath);
      dirs = [];
      for (_i = 0, _len = entries.length; _i < _len; _i++) {
        entry = entries[_i];
        fqn = path.join(dirPath, entry);
        if (this.keepPath(fqn)) {
          stats = fs.statSync(fqn);
          if (stats.isDirectory()) {
            dirs.push(fqn);
          } else if (stats.isFile()) {
            this.processFile(fqn);
          }
        }
      }
      entries = null;
      _results = [];
      for (_j = 0, _len1 = dirs.length; _j < _len1; _j++) {
        dir = dirs[_j];
        _results.push(this.processDirectory(dir));
      }
      return _results;
    };

    SymbolIndex.prototype.processFile = function(fqn) {
      var grammar, text;
      if (this.logToConsole) {
        console.log('GOTO: file', fqn);
      }
      text = fs.readFileSync(fqn, {
        encoding: 'utf8'
      });
      grammar = atom.syntax.selectGrammar(fqn, text);
      if ((grammar != null ? grammar.name : void 0) !== "Null Grammar") {
        return this.entries[fqn] = generate(fqn, grammar, text);
      } else {
        return this.noGrammar[path.extname(fqn)] = true;
      }
    };

    SymbolIndex.prototype.keepPath = function(filePath) {
      var base, ext, glob, _i, _len, _ref;
      base = path.basename(filePath);
      ext = path.extname(base);
      if (this.noGrammar[ext] != null) {
        if (this.logToConsole) {
          console.log('GOTO: ignore/grammar', filePath);
        }
        return false;
      }
      _ref = this.moreIgnoredNames;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        glob = _ref[_i];
        if (minimatch(base, glob)) {
          if (this.logToConsole) {
            console.log('GOTO: ignore/core', filePath);
          }
          return false;
        }
      }
      if (_.contains(this.ignoredNames, base)) {
        if (this.logToConsole) {
          console.log('GOTO: ignore/core', filePath);
        }
        return false;
      }
      if (ext && _.contains(this.ignoredNames, '*#{ext}')) {
        if (this.logToConsole) {
          console.log('GOTO: ignore/core', filePath);
        }
        return false;
      }
      if (this.repo && this.repo.isPathIgnored(filePath)) {
        if (this.logToConsole) {
          console.log('GOTO: ignore/git', filePath);
        }
        return false;
      }
      return true;
    };

    return SymbolIndex;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQ0E7QUFBQSxNQUFBLG9EQUFBOztBQUFBLEVBQUEsRUFBQSxHQUFLLE9BQUEsQ0FBUSxJQUFSLENBQUwsQ0FBQTs7QUFBQSxFQUNBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQURQLENBQUE7O0FBQUEsRUFFQSxDQUFBLEdBQUksT0FBQSxDQUFRLFlBQVIsQ0FGSixDQUFBOztBQUFBLEVBR0EsU0FBQSxHQUFZLE9BQUEsQ0FBUSxXQUFSLENBSFosQ0FBQTs7QUFBQSxFQUlBLFFBQUEsR0FBVyxPQUFBLENBQVEsb0JBQVIsQ0FKWCxDQUFBOztBQUFBLEVBS0EsS0FBQSxHQUFRLE9BQUEsQ0FBUSxnQkFBUixDQUxSLENBQUE7O0FBQUEsRUFPQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ1MsSUFBQSxxQkFBQyxPQUFELEdBQUE7QUFFWCxVQUFBLHFCQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsT0FBRCxHQUFXLEVBQVgsQ0FBQTtBQUFBLE1BT0EsSUFBQyxDQUFBLGlCQUFELEdBQXFCLElBUHJCLENBQUE7QUFBQSxNQXFCQSxJQUFDLENBQUEsSUFBRCxHQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWIsQ0FBQSxDQXJCUixDQUFBO0FBQUEsTUFzQkEsSUFBQyxDQUFBLElBQUQsR0FBUSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQWIsQ0FBQSxDQXRCUixDQUFBO0FBQUEsTUF1QkEsSUFBQyxDQUFBLFlBQUQsa0VBQXVELEVBdkJ2RCxDQUFBO0FBd0JBLE1BQUEsSUFBRyxNQUFBLENBQUEsSUFBUSxDQUFBLFlBQVIsS0FBd0IsUUFBM0I7QUFDRSxRQUFBLElBQUMsQ0FBQSxZQUFELEdBQWdCLENBQUUsWUFBRixDQUFoQixDQURGO09BeEJBO0FBQUEsTUEyQkEsSUFBQyxDQUFBLFlBQUQsb0VBQXVELEtB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
//# sourceURL=/Users/frosas/projects/dotfiles/home/.atom/packages/goto/lib/symbol-index.coffee