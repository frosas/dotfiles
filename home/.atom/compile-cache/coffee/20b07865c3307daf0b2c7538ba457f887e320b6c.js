(function() {
  var CSON, Emitter, LINTER_MAP, LintRunner, LinterConfig, Subscriber, path, _ref;

  path = require('path');

  CSON = require('season');

  _ref = require('emissary'), Emitter = _ref.Emitter, Subscriber = _ref.Subscriber;

  LinterConfig = require('./linter-config');

  LINTER_MAP = CSON.readFileSync(path.join(__dirname, 'linter-map.cson'));

  module.exports = LintRunner = (function() {
    Emitter.includeInto(LintRunner);

    Subscriber.includeInto(LintRunner);

    function LintRunner(editor) {
      this.editor = editor;
      this.buffer = this.editor.getBuffer();
      this.lastViolations = null;
    }

    LintRunner.prototype.startWatching = function() {
      if (this.isWatching()) {
        return;
      }
      this.switchLinter();
      return this.grammerChangeSubscription = this.subscribe(this.editor, 'grammar-changed', (function(_this) {
        return function() {
          return _this.switchLinter();
        };
      })(this));
    };

    LintRunner.prototype.stopWatching = function() {
      if (this.grammerChangeSubscription != null) {
        this.grammerChangeSubscription.off();
        this.grammerChangeSubscription = null;
      }
      return this.deactivate();
    };

    LintRunner.prototype.refresh = function() {
      if (!this.isWatching()) {
        return;
      }
      return this.switchLinter();
    };

    LintRunner.prototype.isWatching = function() {
      return this.grammerChangeSubscription != null;
    };

    LintRunner.prototype.switchLinter = function() {
      var linterConfig, linterName, scopeName;
      scopeName = this.editor.getGrammar().scopeName;
      linterName = LINTER_MAP[scopeName];
      if (!linterName) {
        return this.deactivate();
      }
      linterConfig = new LinterConfig(linterName);
      if (!linterConfig.isFileToLint(this.getFilePath())) {
        return this.deactivate();
      }
      return this.activate(linterName);
    };

    LintRunner.prototype.activate = function(linterName) {
      var linterPath, wasAlreadyActivated;
      wasAlreadyActivated = this.linterConstructor != null;
      linterPath = "./linter/" + linterName;
      this.linterConstructor = require(linterPath);
      if (!wasAlreadyActivated) {
        this.emit('activate');
      }
      this.lint();
      if (this.bufferSubscription == null) {
        return this.bufferSubscription = this.subscribe(this.buffer, 'saved reloaded', (function(_this) {
          return function() {
            return _this.lint();
          };
        })(this));
      }
    };

    LintRunner.prototype.deactivate = function() {
      this.lastViolations = null;
      if (this.bufferSubscription != null) {
        this.bufferSubscription.off();
        this.bufferSubscription = null;
      }
      if (this.linterConstructor != null) {
        this.linterConstructor = null;
        return this.emit('deactivate');
      }
    };

    LintRunner.prototype.lint = function() {
      var linter;
      linter = new this.linterConstructor(this.getFilePath());
      return linter.run((function(_this) {
        return function(error, violations) {
          _this.setLastViolations(violations);
          return _this.emit('lint', error, _this.lastViolations);
        };
      })(this));
    };

    LintRunner.prototype.getFilePath = function() {
      return this.buffer.getUri();
    };

    LintRunner.prototype.getActiveLinter = function() {
      return this.linterConstructor;
    };

    LintRunner.prototype.getLastViolations = function() {
      return this.lastViolations;
    };

    LintRunner.prototype.setLastViolations = function(violations) {
      this.lastViolations = violations;
      if (this.lastViolations == null) {
        return;
      }
      return this.lastViolations = this.lastViolations.sort(function(a, b) {
        return a.bufferRange.compare(b.bufferRange);
      });
    };

    return LintRunner;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDJFQUFBOztBQUFBLEVBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBQVAsQ0FBQTs7QUFBQSxFQUNBLElBQUEsR0FBTyxPQUFBLENBQVEsUUFBUixDQURQLENBQUE7O0FBQUEsRUFFQSxPQUF3QixPQUFBLENBQVEsVUFBUixDQUF4QixFQUFDLGVBQUEsT0FBRCxFQUFVLGtCQUFBLFVBRlYsQ0FBQTs7QUFBQSxFQUdBLFlBQUEsR0FBZSxPQUFBLENBQVEsaUJBQVIsQ0FIZixDQUFBOztBQUFBLEVBS0EsVUFBQSxHQUFhLElBQUksQ0FBQyxZQUFMLENBQWtCLElBQUksQ0FBQyxJQUFMLENBQVUsU0FBVixFQUFxQixpQkFBckIsQ0FBbEIsQ0FMYixDQUFBOztBQUFBLEVBT0EsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLElBQUEsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsVUFBcEIsQ0FBQSxDQUFBOztBQUFBLElBQ0EsVUFBVSxDQUFDLFdBQVgsQ0FBdUIsVUFBdkIsQ0FEQSxDQUFBOztBQUdhLElBQUEsb0JBQUUsTUFBRixHQUFBO0FBQ1gsTUFEWSxJQUFDLENBQUEsU0FBQSxNQUNiLENBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBQyxDQUFBLE1BQU0sQ0FBQyxTQUFSLENBQUEsQ0FBVixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsY0FBRCxHQUFrQixJQURsQixDQURXO0lBQUEsQ0FIYjs7QUFBQSx5QkFPQSxhQUFBLEdBQWUsU0FBQSxHQUFBO0FBQ2IsTUFBQSxJQUFVLElBQUMsQ0FBQSxVQUFELENBQUEsQ0FBVjtBQUFBLGNBQUEsQ0FBQTtPQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEsWUFBRCxDQUFBLENBRkEsQ0FBQTthQUlBLElBQUMsQ0FBQSx5QkFBRCxHQUE2QixJQUFDLENBQUEsU0FBRCxDQUFXLElBQUMsQ0FBQSxNQUFaLEVBQW9CLGlCQUFwQixFQUF1QyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUNsRSxLQUFDLENBQUEsWUFBRCxDQUFBLEVBRGtFO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBdkMsRUFMaEI7SUFBQSxDQVBmLENBQUE7O0FBQUEseUJBZUEsWUFBQSxHQUFjLFNBQUEsR0FBQTtBQUNaLE1BQUEsSUFBRyxzQ0FBSDtBQUNFLFFBQUEsSUFBQyxDQUFBLHlCQUF5QixDQUFDLEdBQTNCLENBQUEsQ0FBQSxDQUFBO0FBQUEsUUFDQSxJQUFDLENBQUEseUJBQUQsR0FBNkIsSUFEN0IsQ0FERjtPQUFBO2FBSUEsSUFBQyxDQUFBLFVBQUQsQ0FBQSxFQUxZO0lBQUEsQ0FmZCxDQUFBOztBQUFBLHlCQXNCQSxPQUFBLEdBQVMsU0FBQSxHQUFBO0FBQ1AsTUFBQSxJQUFBLENBQUEsSUFBZSxDQUFBLFVBQUQsQ0FBQSxDQUFkO0FBQUEsY0FBQSxDQUFBO09BQUE7YUFDQSxJQUFDLENBQUEsWUFBRCxDQUFBLEVBRk87SUFBQSxDQXRCVCxDQUFBOztBQUFBLHlCQTBCQSxVQUFBLEdBQVksU0FBQSxHQUFBO2FBQ1YsdUNBRFU7SUFBQSxDQTFCWixDQUFBOztBQUFBLHlCQTZCQSxZQUFBLEdBQWMsU0FBQSxHQUFBO0FBQ1osVUFBQSxtQ0FBQTtBQUFBLE1BQUEsU0FBQSxHQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsVUFBUixDQUFBLENBQW9CLENBQUMsU0FBakMsQ0FBQTtBQUFBLE1BQ0EsVUFBQSxHQUFhLFVBQVcsQ0FBQSxTQUFBLENBRHhCLENBQUE7QUFHQSxNQUFBLElBQUEsQ0FBQSxVQUFBO0FBQUEsZUFBTyxJQUFDLENBQUEsVUFBRCxDQUFBLENBQVAsQ0FBQTtPQUhBO0FBQUEsTUFLQSxZQUFBLEdBQW1CLElBQUEsWUFBQSxDQUFhLFVBQWIsQ0FMbkIsQ0FBQTtBQU1BLE1BQUEsSUFBQSxDQUFBLFlBQXdDLENBQUMsWUFBYixDQUEwQixJQUFDLENBQUEsV0FBRCxDQUFBLENBQTFCLENBQTVCO0FBQUEsZUFBTyxJQUFDLENBQUEsVUFBRCxDQUFBLENBQVAsQ0FBQTtPQU5BO2FBUUEsSUFBQyxDQUFBLFFBQUQsQ0FBVSxVQUFWLEVBVFk7SUFBQSxDQTdCZCxDQUFBOztBQUFBLHlCQXdDQSxRQUFBLEdBQVUsU0FBQyxVQUFELEdBQUE7QUFDUixVQUFBLCtCQUFBO0FBQUEsTUFBQSxtQkFBQSxHQUFzQiw4QkFBdEIsQ0FBQTtBQUFBLE1BRUEsVUFBQSxHQUFjLFdBQUEsR0FBVSxVQUZ4QixDQUFBO0FBQUEsTUFHQSxJQUFDLENBQUEsaUJBQUQsR0FBcUIsT0FBQSxDQUFRLFVBQVIsQ0FIckIsQ0FBQTtBQUtBLE1BQUEsSUFBQSxDQUFBLG1CQUFBO0FBQ0UsUUFBQSxJQUFDLENBQUEsSUFBRCxDQUFNLFVBQU4sQ0FBQSxDQURGO09BTEE7QUFBQSxNQVFBLElBQUMsQ0FBQSxJQUFELENBQUEsQ0FSQSxDQUFBO0FBVUEsTUFBQSxJQUFPLCtCQUFQO2VBQ0UsSUFBQyxDQUFBLGtCQUFELEdBQXNCLElBQUMsQ0FBQSxTQUFELENBQVcsSUFBQyxDQUFBLE1BQVosRUFBb0IsZ0JBQXBCLEVBQXNDLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQSxHQUFBO21CQUMxRCxLQUFDLENBQUEsSUFBRCxDQUFBLEVBRDBEO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBdEMsRUFEeEI7T0FYUTtJQUFBLENBeENWLENBQUE7O0FBQUEseUJBdURBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDVixNQUFBLElBQUMsQ0FBQSxjQUFELEdBQWtCLElBQWxCLENBQUE7QUFFQSxNQUFBLElBQUcsK0JBQUg7QUFDRSxRQUFBLElBQUMsQ0FBQSxrQkFBa0IsQ0FBQyxHQUFwQixDQUFBLENBQUEsQ0FBQTtBQUFBLFFBQ0EsSUFBQyxDQUFBLGtCQUFELEdBQXNCLElBRHRCLENBREY7T0FGQTtBQU1BLE1BQUEsSUFBRyw4QkFBSDtBQUNFLFFBQUEsSUFBQyxDQUFBLGlCQUFELEdBQXFCLElBQXJCLENBQUE7ZUFDQSxJQUFDLENBQUEsSUFBRCxDQUFNLFlBQU4sRUFGRjtPQVBVO0lBQUEsQ0F2RFosQ0FBQTs7QUFBQSx5QkFrRUEsSUFBQSxHQUFNLFNBQUEsR0FBQTtBQUNKLFVBQUEsTUFBQTtBQUFBLE1BQUEsTUFBQSxHQUFhLElBQUEsSUFBQyxDQUFBLGlCQUFELENBQW1CLElBQUMsQ0FBQSxXQUFELENBQUEsQ0FBbkIsQ0FBYixDQUFBO2FBQ0EsTUFBTSxDQUFDLEdBQVAsQ0FBVyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxLQUFELEVBQVEsVUFBUixHQUFBO0FBQ1QsVUFBQSxLQUFDLENBQUEsaUJBQUQsQ0FBbUIsVUFBbkIsQ0FBQSxDQUFBO2lCQUNBLEtBQUMsQ0FBQSxJQUFELENBQU0sTUFBTixFQUFjLEtBQWQsRUFBcUIsS0FBQyxDQUFBLGNBQXRCLEVBRlM7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFYLEVBRkk7SUFBQSxDQWxFTixDQUFBOztBQUFBLHlCQXdFQSxXQUFBLEdBQWEsU0FBQSxHQUFBO2FBQ1gsSUFBQyxDQUFBLE1BQU0sQ0FBQyxNQUFSLENBQUEsRUFEVztJQUFBLENBeEViLENBQUE7O0FBQUEseUJBMkVBLGVBQUEsR0FBaUIsU0FBQSxHQUFBO2FBQ2YsSUFBQyxDQUFBLGtCQURjO0lBQUEsQ0EzRWpCLENBQUE7O0FBQUEseUJBOEVBLGlCQUFBLEdBQW1CLFNBQUEsR0FBQTthQUNqQixJQUFDLENBQUEsZUFEZ0I7SUFBQSxDQTlFbkIsQ0FBQTs7QUFBQSx5QkFpRkEsaUJBQUEsR0FBbUIsU0FBQyxVQUFELEdBQUE7QUFDakIsTUFBQSxJQUFDLENBQUEsY0FBRCxHQUFrQixVQUFsQixDQUFBO0FBQ0EsTUFBQSxJQUFjLDJCQUFkO0FBQUEsY0FBQSxDQUFBO09BREE7YUFFQSxJQUFDLENBQUEsY0FBRCxHQUFrQixJQUFDLENBQUEsY0FBYyxDQUFDLElBQWhCLENBQXFCLFNBQUMsQ0FBRCxFQUFJLENBQUosR0FBQTtlQUNyQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQWQsQ0FBc0IsQ0FBQyxDQUFDLFdBQXhCLEVBRHFDO01BQUEsQ0FBckIsRUFIRDtJQUFBLENBakZuQixDQUFBOztzQkFBQTs7TUFURixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/frosas/projects/dotfiles/home/.atom/packages/atom-lint/lib/lint-runner.coffee