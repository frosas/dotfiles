(function() {
  var CSON, LintRunner, LintView, View, Violation, ViolationView, path, _,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  path = require('path');

  View = require('atom').View;

  CSON = require('season');

  _ = require('lodash');

  LintRunner = require('./lint-runner');

  ViolationView = require('./violation-view');

  Violation = require('./violation');

  module.exports = LintView = (function(_super) {
    __extends(LintView, _super);

    function LintView() {
      return LintView.__super__.constructor.apply(this, arguments);
    }

    LintView.content = function() {
      return this.div({
        "class": 'lint'
      });
    };

    LintView.prototype.initialize = function(editorView) {
      this.editorView = editorView;
      this.editorView.lintView = this;
      this.editorView.overlayer.append(this);
      this.editor = this.editorView.getEditor();
      this.gutterView = this.editorView.gutter;
      this.violationViews = [];
      this.lintRunner = new LintRunner(this.editor);
      this.lintRunner.on('activate', (function(_this) {
        return function() {
          return _this.onLinterActivation();
        };
      })(this));
      this.lintRunner.on('deactivate', (function(_this) {
        return function() {
          return _this.onLinterDeactivation();
        };
      })(this));
      this.lintRunner.on('lint', (function(_this) {
        return function(error, violations) {
          return _this.onLint(error, violations);
        };
      })(this));
      this.lintRunner.startWatching();
      this.editorView.command('lint:move-to-next-violation', (function(_this) {
        return function() {
          return _this.moveToNextViolation();
        };
      })(this));
      return this.editorView.command('lint:move-to-previous-violation', (function(_this) {
        return function() {
          return _this.moveToPreviousViolation();
        };
      })(this));
    };

    LintView.prototype.beforeRemove = function() {
      this.editorView.off('lint:move-to-next-violation lint:move-to-previous-violation');
      this.lintRunner.stopWatching();
      return this.editorView.lintView = void 0;
    };

    LintView.prototype.refresh = function() {
      return this.lintRunner.refresh();
    };

    LintView.prototype.onLinterActivation = function() {
      return this.editorDisplayUpdateSubscription = this.subscribe(this.editorView, 'editor:display-updated', (function(_this) {
        return function() {
          if (_this.pendingViolations != null) {
            _this.addViolationViews(_this.pendingViolations);
            _this.pendingViolations = null;
          }
          return _this.updateGutterMarkers();
        };
      })(this));
    };

    LintView.prototype.onLinterDeactivation = function() {
      var _ref;
      if ((_ref = this.editorDisplayUpdateSubscription) != null) {
        _ref.off();
      }
      this.removeViolationViews();
      return this.updateGutterMarkers();
    };

    LintView.prototype.onLint = function(error, violations) {
      this.removeViolationViews();
      if (error != null) {
        console.log(error);
      } else if (this.editorView.active) {
        this.addViolationViews(violations);
      } else {
        this.pendingViolations = violations;
      }
      return this.updateGutterMarkers();
    };

    LintView.prototype.addViolationViews = function(violations) {
      var violation, violationView, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = violations.length; _i < _len; _i++) {
        violation = violations[_i];
        violationView = new ViolationView(violation, this);
        _results.push(this.violationViews.push(violationView));
      }
      return _results;
    };

    LintView.prototype.removeViolationViews = function() {
      var view, _results;
      _results = [];
      while (view = this.violationViews.shift()) {
        _results.push(view.remove());
      }
      return _results;
    };

    LintView.prototype.getValidViolationViews = function() {
      return this.violationViews.filter(function(violationView) {
        return violationView.isValid;
      });
    };

    LintView.prototype.updateGutterMarkers = function() {
      var klass, line, severity, violationView, _i, _j, _len, _len1, _ref, _ref1, _results;
      if (!this.gutterView.isVisible()) {
        return;
      }
      _ref = Violation.SEVERITIES;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        severity = _ref[_i];
        this.gutterView.removeClassFromAllLines("lint-" + severity);
      }
      if (this.violationViews.length === 0) {
        return;
      }
      _ref1 = this.getValidViolationViews();
      _results = [];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        violationView = _ref1[_j];
        line = violationView.getCurrentBufferStartPosition().row;
        klass = "lint-" + violationView.violation.severity;
        _results.push(this.gutterView.addClassToLine(line, klass));
      }
      return _results;
    };

    LintView.prototype.moveToNextViolation = function() {
      return this.moveToNeighborViolation('next');
    };

    LintView.prototype.moveToPreviousViolation = function() {
      return this.moveToNeighborViolation('previous');
    };

    LintView.prototype.moveToNeighborViolation = function(direction) {
      var comparingMethod, currentCursorPosition, enumerationMethod, neighborViolationView;
      if (this.violationViews.length === 0) {
        atom.beep();
        return;
      }
      if (direction === 'next') {
        enumerationMethod = 'find';
        comparingMethod = 'isGreaterThan';
      } else {
        enumerationMethod = 'findLast';
        comparingMethod = 'isLessThan';
      }
      currentCursorPosition = this.editor.getCursor().getScreenPosition();
      neighborViolationView = _[enumerationMethod](this.getValidViolationViews(), function(violationView) {
        var violationPosition;
        violationPosition = violationView.screenStartPosition;
        return violationPosition[comparingMethod](currentCursorPosition);
      });
      if (neighborViolationView != null) {
        return this.editor.setCursorScreenPosition(neighborViolationView.screenStartPosition);
      } else {
        return atom.beep();
      }
    };

    return LintView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1FQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FBUCxDQUFBOztBQUFBLEVBQ0MsT0FBUSxPQUFBLENBQVEsTUFBUixFQUFSLElBREQsQ0FBQTs7QUFBQSxFQUVBLElBQUEsR0FBTyxPQUFBLENBQVEsUUFBUixDQUZQLENBQUE7O0FBQUEsRUFHQSxDQUFBLEdBQUksT0FBQSxDQUFRLFFBQVIsQ0FISixDQUFBOztBQUFBLEVBSUEsVUFBQSxHQUFhLE9BQUEsQ0FBUSxlQUFSLENBSmIsQ0FBQTs7QUFBQSxFQUtBLGFBQUEsR0FBZ0IsT0FBQSxDQUFRLGtCQUFSLENBTGhCLENBQUE7O0FBQUEsRUFNQSxTQUFBLEdBQVksT0FBQSxDQUFRLGFBQVIsQ0FOWixDQUFBOztBQUFBLEVBUUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLCtCQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLFFBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLE1BQVA7T0FBTCxFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLHVCQUdBLFVBQUEsR0FBWSxTQUFFLFVBQUYsR0FBQTtBQUNWLE1BRFcsSUFBQyxDQUFBLGFBQUEsVUFDWixDQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsVUFBVSxDQUFDLFFBQVosR0FBdUIsSUFBdkIsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBdEIsQ0FBNkIsSUFBN0IsQ0FEQSxDQUFBO0FBQUEsTUFHQSxJQUFDLENBQUEsTUFBRCxHQUFVLElBQUMsQ0FBQSxVQUFVLENBQUMsU0FBWixDQUFBLENBSFYsQ0FBQTtBQUFBLE1BSUEsSUFBQyxDQUFBLFVBQUQsR0FBYyxJQUFDLENBQUEsVUFBVSxDQUFDLE1BSjFCLENBQUE7QUFBQSxNQU1BLElBQUMsQ0FBQSxjQUFELEdBQWtCLEVBTmxCLENBQUE7QUFBQSxNQVFBLElBQUMsQ0FBQSxVQUFELEdBQWtCLElBQUEsVUFBQSxDQUFXLElBQUMsQ0FBQSxNQUFaLENBUmxCLENBQUE7QUFBQSxNQVNBLElBQUMsQ0FBQSxVQUFVLENBQUMsRUFBWixDQUFlLFVBQWYsRUFBMkIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFBRyxLQUFDLENBQUEsa0JBQUQsQ0FBQSxFQUFIO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBM0IsQ0FUQSxDQUFBO0FBQUEsTUFVQSxJQUFDLENBQUEsVUFBVSxDQUFDLEVBQVosQ0FBZSxZQUFmLEVBQTZCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQUcsS0FBQyxDQUFBLG9CQUFELENBQUEsRUFBSDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTdCLENBVkEsQ0FBQTtBQUFBLE1BV0EsSUFBQyxDQUFBLFVBQVUsQ0FBQyxFQUFaLENBQWUsTUFBZixFQUF1QixDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxLQUFELEVBQVEsVUFBUixHQUFBO2lCQUF1QixLQUFDLENBQUEsTUFBRCxDQUFRLEtBQVIsRUFBZSxVQUFmLEVBQXZCO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBdkIsQ0FYQSxDQUFBO0FBQUEsTUFZQSxJQUFDLENBQUEsVUFBVSxDQUFDLGFBQVosQ0FBQSxDQVpBLENBQUE7QUFBQSxNQWNBLElBQUMsQ0FBQSxVQUFVLENBQUMsT0FBWixDQUFvQiw2QkFBcEIsRUFBbUQsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFBRyxLQUFDLENBQUEsbUJBQUQsQ0FBQSxFQUFIO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbkQsQ0FkQSxDQUFBO2FBZUEsSUFBQyxDQUFBLFVBQVUsQ0FBQyxPQUFaLENBQW9CLGlDQUFwQixFQUF1RCxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUFHLEtBQUMsQ0FBQSx1QkFBRCxDQUFBLEVBQUg7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF2RCxFQWhCVTtJQUFBLENBSFosQ0FBQTs7QUFBQSx1QkFxQkEsWUFBQSxHQUFjLFNBQUEsR0FBQTtBQUNaLE1BQUEsSUFBQyxDQUFBLFVBQVUsQ0FBQyxHQUFaLENBQWdCLDZEQUFoQixDQUFBLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxVQUFVLENBQUMsWUFBWixDQUFBLENBREEsQ0FBQTthQUVBLElBQUMsQ0FBQSxVQUFVLENBQUMsUUFBWixHQUF1QixPQUhYO0lBQUEsQ0FyQmQsQ0FBQTs7QUFBQSx1QkEwQkEsT0FBQSxHQUFTLFNBQUEsR0FBQTthQUNQLElBQUMsQ0FBQSxVQUFVLENBQUMsT0FBWixDQUFBLEVBRE87SUFBQSxDQTFCVCxDQUFBOztBQUFBLHVCQTZCQSxrQkFBQSxHQUFvQixTQUFBLEdBQUE7YUFFbEIsSUFBQyxDQUFBLCtCQUFELEdBQW1DLElBQUMsQ0FBQSxTQUFELENBQVcsSUFBQyxDQUFBLFVBQVosRUFBd0Isd0JBQXhCLEVBQWtELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDbkYsVUFBQSxJQUFHLCtCQUFIO0FBQ0UsWUFBQSxLQUFDLENBQUEsaUJBQUQsQ0FBbUIsS0FBQyxDQUFBLGlCQUFwQixDQUFBLENBQUE7QUFBQSxZQUNBLEtBQUMsQ0FBQSxpQkFBRCxHQUFxQixJQURyQixDQURGO1dBQUE7aUJBR0EsS0FBQyxDQUFBLG1CQUFELENBQUEsRUFKbUY7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFsRCxFQUZqQjtJQUFBLENBN0JwQixDQUFBOztBQUFBLHVCQXFDQSxvQkFBQSxHQUFzQixTQUFBLEdBQUE7QUFDcEIsVUFBQSxJQUFBOztZQUFnQyxDQUFFLEdBQWxDLENBQUE7T0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLG9CQUFELENBQUEsQ0FEQSxDQUFBO2FBRUEsSUFBQyxDQUFBLG1CQUFELENBQUEsRUFIb0I7SUFBQSxDQXJDdEIsQ0FBQTs7QUFBQSx1QkEwQ0EsTUFBQSxHQUFRLFNBQUMsS0FBRCxFQUFRLFVBQVIsR0FBQTtBQUNOLE1BQUEsSUFBQyxDQUFBLG9CQUFELENBQUEsQ0FBQSxDQUFBO0FBRUEsTUFBQSxJQUFHLGFBQUg7QUFDRSxRQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksS0FBWixDQUFBLENBREY7T0FBQSxNQUVLLElBQUcsSUFBQyxDQUFBLFVBQVUsQ0FBQyxNQUFmO0FBQ0gsUUFBQSxJQUFDLENBQUEsaUJBQUQsQ0FBbUIsVUFBbkIsQ0FBQSxDQURHO09BQUEsTUFBQTtBQU1ILFFBQUEsSUFBQyxDQUFBLGlCQUFELEdBQXFCLFVBQXJCLENBTkc7T0FKTDthQVlBLElBQUMsQ0FBQSxtQkFBRCxDQUFBLEVBYk07SUFBQSxDQTFDUixDQUFBOztBQUFBLHVCQXlEQSxpQkFBQSxHQUFtQixTQUFDLFVBQUQsR0FBQTtBQUNqQixVQUFBLDRDQUFBO0FBQUE7V0FBQSxpREFBQTttQ0FBQTtBQUNFLFFBQUEsYUFBQSxHQUFvQixJQUFBLGFBQUEsQ0FBYyxTQUFkLEVBQXlCLElBQXpCLENBQXBCLENBQUE7QUFBQSxzQkFDQSxJQUFDLENBQUEsY0FBYyxDQUFDLElBQWhCLENBQXFCLGFBQXJCLEVBREEsQ0FERjtBQUFBO3NCQURpQjtJQUFBLENBekRuQixDQUFBOztBQUFBLHVCQThEQSxvQkFBQSxHQUFzQixTQUFBLEdBQUE7QUFDcEIsVUFBQSxjQUFBO0FBQUE7YUFBTSxJQUFBLEdBQU8sSUFBQyxDQUFBLGNBQWMsQ0FBQyxLQUFoQixDQUFBLENBQWIsR0FBQTtBQUNFLHNCQUFBLElBQUksQ0FBQyxNQUFMLENBQUEsRUFBQSxDQURGO01BQUEsQ0FBQTtzQkFEb0I7SUFBQSxDQTlEdEIsQ0FBQTs7QUFBQSx1QkFrRUEsc0JBQUEsR0FBd0IsU0FBQSxHQUFBO2FBQ3RCLElBQUMsQ0FBQSxjQUFjLENBQUMsTUFBaEIsQ0FBdUIsU0FBQyxhQUFELEdBQUE7ZUFDckIsYUFBYSxDQUFDLFFBRE87TUFBQSxDQUF2QixFQURzQjtJQUFBLENBbEV4QixDQUFBOztBQUFBLHVCQXNFQSxtQkFBQSxHQUFxQixTQUFBLEdBQUE7QUFDbkIsVUFBQSxnRkFBQTtBQUFBLE1BQUEsSUFBQSxDQUFBLElBQWUsQ0FBQSxVQUFVLENBQUMsU0FBWixDQUFBLENBQWQ7QUFBQSxjQUFBLENBQUE7T0FBQTtBQUVBO0FBQUEsV0FBQSwyQ0FBQTs0QkFBQTtBQUNFLFFBQUEsSUFBQyxDQUFBLFVBQVUsQ0FBQyx1QkFBWixDQUFxQyxPQUFBLEdBQU0sUUFBM0MsQ0FBQSxDQURGO0FBQUEsT0FGQTtBQUtBLE1BQUEsSUFBVSxJQUFDLENBQUEsY0FBYyxDQUFDLE1BQWhCLEtBQTBCLENBQXBDO0FBQUEsY0FBQSxDQUFBO09BTEE7QUFPQTtBQUFBO1dBQUEsOENBQUE7a0NBQUE7QUFDRSxRQUFBLElBQUEsR0FBTyxhQUFhLENBQUMsNkJBQWQsQ0FBQSxDQUE2QyxDQUFDLEdBQXJELENBQUE7QUFBQSxRQUNBLEtBQUEsR0FBUyxPQUFBLEdBQU0sYUFBYSxDQUFDLFNBQVMsQ0FBQyxRQUR2QyxDQUFBO0FBQUEsc0JBRUEsSUFBQyxDQUFBLFVBQVUsQ0FBQyxjQUFaLENBQTJCLElBQTNCLEVBQWlDLEtBQWpDLEVBRkEsQ0FERjtBQUFBO3NCQVJtQjtJQUFBLENBdEVyQixDQUFBOztBQUFBLHVCQW1GQSxtQkFBQSxHQUFxQixTQUFBLEdBQUE7YUFDbkIsSUFBQyxDQUFBLHVCQUFELENBQXlCLE1BQXpCLEVBRG1CO0lBQUEsQ0FuRnJCLENBQUE7O0FBQUEsdUJBc0ZBLHVCQUFBLEdBQXlCLFNBQUEsR0FBQTthQUN2QixJQUFDLENBQUEsdUJBQUQsQ0FBeUIsVUFBekIsRUFEdUI7SUFBQSxDQXRGekIsQ0FBQTs7QUFBQSx1QkF5RkEsdUJBQUEsR0FBeUIsU0FBQyxTQUFELEdBQUE7QUFDdkIsVUFBQSxnRkFBQTtBQUFBLE1BQUEsSUFBRyxJQUFDLENBQUEsY0FBYyxDQUFDLE1BQWhCLEtBQTBCLENBQTdCO0FBQ0UsUUFBQSxJQUFJLENBQUMsSUFBTCxDQUFBLENBQUEsQ0FBQTtBQUNBLGNBQUEsQ0FGRjtPQUFBO0FBSUEsTUFBQSxJQUFHLFNBQUEsS0FBYSxNQUFoQjtBQUNFLFFBQUEsaUJBQUEsR0FBb0IsTUFBcEIsQ0FBQTtBQUFBLFFBQ0EsZUFBQSxHQUFrQixlQURsQixDQURGO09BQUEsTUFBQTtBQUlFLFFBQUEsaUJBQUEsR0FBb0IsVUFBcEIsQ0FBQTtBQUFBLFFBQ0EsZUFBQSxHQUFrQixZQURsQixDQUpGO09BSkE7QUFBQSxNQVdBLHFCQUFBLEdBQXdCLElBQUMsQ0FBQSxNQUFNLENBQUMsU0FBUixDQUFBLENBQW1CLENBQUMsaUJBQXBCLENBQUEsQ0FYeEIsQ0FBQTtBQUFBLE1BY0EscUJBQUEsR0FBd0IsQ0FBRSxDQUFBLGlCQUFBLENBQUYsQ0FBcUIsSUFBQyxDQUFBLHNCQUFELENBQUEsQ0FBckIsRUFBZ0QsU0FBQyxhQUFELEdBQUE7QUFDdEUsWUFBQSxpQkFBQTtBQUFBLFFBQUEsaUJBQUEsR0FBb0IsYUFBYSxDQUFDLG1CQUFsQyxDQUFBO2VBQ0EsaUJBQWtCLENBQUEsZUFBQSxDQUFsQixDQUFtQyxxQkFBbkMsRUFGc0U7TUFBQSxDQUFoRCxDQWR4QixDQUFBO0FBa0JBLE1BQUEsSUFBRyw2QkFBSDtlQUNFLElBQUMsQ0FBQSxNQUFNLENBQUMsdUJBQVIsQ0FBZ0MscUJBQXFCLENBQUMsbUJBQXRELEVBREY7T0FBQSxNQUFBO2VBR0UsSUFBSSxDQUFDLElBQUwsQ0FBQSxFQUhGO09BbkJ1QjtJQUFBLENBekZ6QixDQUFBOztvQkFBQTs7S0FEcUIsS0FUdkIsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/frosas/projects/dotfiles/home/.atom/packages/atom-lint/lib/lint-view.coffee