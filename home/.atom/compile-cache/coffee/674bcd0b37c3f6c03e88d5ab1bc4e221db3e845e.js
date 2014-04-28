(function() {
  var LintStatusView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom').View;

  module.exports = LintStatusView = (function(_super) {
    __extends(LintStatusView, _super);

    function LintStatusView() {
      return LintStatusView.__super__.constructor.apply(this, arguments);
    }

    LintStatusView.content = function() {
      return this.div({
        "class": 'lint-status inline-block'
      }, (function(_this) {
        return function() {
          _this.span({
            "class": 'linter-name'
          });
          return _this.span({
            "class": 'lint-summary'
          });
        };
      })(this));
    };

    LintStatusView.prototype.initialize = function(statusBarView) {
      this.statusBarView = statusBarView;
      this.subscribeToLintRunner();
      this.update();
      return this.subscribe(this.statusBarView, 'active-buffer-changed', (function(_this) {
        return function() {
          _this.unsubscribeFromLintRunner();
          _this.subscribeToLintRunner();
          return _this.update();
        };
      })(this));
    };

    LintStatusView.prototype.getActiveLintRunner = function() {
      var editorView, _ref;
      editorView = atom.workspaceView.getActiveView();
      return editorView != null ? (_ref = editorView.lintView) != null ? _ref.lintRunner : void 0 : void 0;
    };

    LintStatusView.prototype.subscribeToLintRunner = function() {
      var activeLintRunner;
      activeLintRunner = this.getActiveLintRunner();
      if (activeLintRunner == null) {
        return;
      }
      return this.subscription = activeLintRunner.on('activate deactivate lint', (function(_this) {
        return function(error) {
          return _this.update(error);
        };
      })(this));
    };

    LintStatusView.prototype.unsubscribeFromLintRunner = function() {
      var _ref;
      if ((_ref = this.subscription) != null) {
        _ref.off();
      }
      return this.subscription = null;
    };

    LintStatusView.prototype.update = function(error) {
      var activeLinter, violations, _ref;
      activeLinter = (_ref = this.getActiveLintRunner()) != null ? _ref.getActiveLinter() : void 0;
      if (activeLinter != null) {
        if ((error != null) && error.code === 'ENOENT') {
          this.displayLinterName("" + activeLinter.canonicalName + " is not installed");
          return this.displaySummary(violations);
        } else {
          this.displayLinterName(activeLinter.canonicalName);
          violations = this.getActiveLintRunner().getLastViolations();
          return this.displaySummary(violations);
        }
      } else {
        this.displayLinterName();
        return this.displaySummary();
      }
    };

    LintStatusView.prototype.displayLinterName = function(text) {
      return this.find('.linter-name').text(text || '');
    };

    LintStatusView.prototype.displaySummary = function(violations) {
      var errorCount, html, warningCount;
      html = '';
      if (violations != null) {
        if (violations.length === 0) {
          html += '<span class="icon icon-check lint-clean"></span>';
        } else {
          errorCount = this.countViolationsOfSeverity(violations, 'error');
          if (errorCount > 0) {
            html += "<span class=\"icon icon-alert lint-error\">" + errorCount + "</span>";
          }
          warningCount = this.countViolationsOfSeverity(violations, 'warning');
          if (warningCount > 0) {
            html += "<span class=\"icon icon-alert lint-warning\">" + warningCount + "</span>";
          }
        }
      }
      return this.find('.lint-summary').html(html);
    };

    LintStatusView.prototype.countViolationsOfSeverity = function(violations, severity) {
      if (violations == null) {
        return 0;
      }
      return violations.filter(function(violation) {
        return violation.severity === severity;
      }).length;
    };

    return LintStatusView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG9CQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxPQUFRLE9BQUEsQ0FBUSxNQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLHFDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLGNBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLDBCQUFQO09BQUwsRUFBd0MsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUN0QyxVQUFBLEtBQUMsQ0FBQSxJQUFELENBQU07QUFBQSxZQUFBLE9BQUEsRUFBTyxhQUFQO1dBQU4sQ0FBQSxDQUFBO2lCQUNBLEtBQUMsQ0FBQSxJQUFELENBQU07QUFBQSxZQUFBLE9BQUEsRUFBTyxjQUFQO1dBQU4sRUFGc0M7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF4QyxFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLDZCQUtBLFVBQUEsR0FBWSxTQUFFLGFBQUYsR0FBQTtBQUNWLE1BRFcsSUFBQyxDQUFBLGdCQUFBLGFBQ1osQ0FBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLHFCQUFELENBQUEsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsTUFBRCxDQUFBLENBREEsQ0FBQTthQUdBLElBQUMsQ0FBQSxTQUFELENBQVcsSUFBQyxDQUFBLGFBQVosRUFBMkIsdUJBQTNCLEVBQW9ELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDbEQsVUFBQSxLQUFDLENBQUEseUJBQUQsQ0FBQSxDQUFBLENBQUE7QUFBQSxVQUNBLEtBQUMsQ0FBQSxxQkFBRCxDQUFBLENBREEs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
//# sourceURL=/Users/frosas/projects/dotfiles/home/.atom/packages/atom-lint/lib/lint-status-view.coffee