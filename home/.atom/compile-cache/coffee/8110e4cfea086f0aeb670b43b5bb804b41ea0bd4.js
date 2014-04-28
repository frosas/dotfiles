(function() {
  var GotoView, SymbolIndex;

  SymbolIndex = require('./symbol-index');

  GotoView = require('./goto-view');

  module.exports = {
    configDefaults: {
      logToConsole: false,
      moreIgnoredNames: ''
    },
    index: null,
    gotoView: null,
    activate: function(state) {
      this.index = new SymbolIndex(state != null ? state.entries : void 0);
      this.gotoView = new GotoView();
      atom.workspaceView.command("goto:project-symbol", (function(_this) {
        return function() {
          return _this.gotoProjectSymbol();
        };
      })(this));
      atom.workspaceView.command("goto:file-symbol", (function(_this) {
        return function() {
          return _this.gotoFileSymbol();
        };
      })(this));
      atom.workspaceView.command("goto:declaration", (function(_this) {
        return function() {
          return _this.gotoDeclaration();
        };
      })(this));
      atom.workspaceView.command("goto:rebuild-index", (function(_this) {
        return function() {
          return _this.index.rebuild();
        };
      })(this));
      return atom.workspaceView.command("goto:invalidate-index", (function(_this) {
        return function() {
          return _this.index.invalidate();
        };
      })(this));
    },
    deactivate: function() {
      var _ref, _ref1;
      if ((_ref = this.index) != null) {
        _ref.destroy();
      }
      this.index = null;
      if ((_ref1 = this.gotoView) != null) {
        _ref1.destroy();
      }
      return this.gotoView = null;
    },
    serialize: function() {
      return {
        'entries': this.index.entries
      };
    },
    gotoDeclaration: function() {
      var symbols;
      symbols = this.index.gotoDeclaration();
      if (symbols) {
        return this.gotoView.populate(symbols);
      }
    },
    gotoProjectSymbol: function() {
      var symbols;
      symbols = this.index.getAllSymbols();
      return this.gotoView.populate(symbols);
    },
    gotoFileSymbol: function() {
      var e, filePath, symbols;
      e = atom.workspace.getActiveEditor();
      filePath = e != null ? e.getPath() : void 0;
      if (filePath) {
        symbols = this.index.getEditorSymbols(e);
        return this.gotoView.populate(symbols);
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQ0E7QUFBQSxNQUFBLHFCQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQUFkLENBQUE7O0FBQUEsRUFDQSxRQUFBLEdBQVcsT0FBQSxDQUFRLGFBQVIsQ0FEWCxDQUFBOztBQUFBLEVBR0EsTUFBTSxDQUFDLE9BQVAsR0FFRTtBQUFBLElBQUEsY0FBQSxFQUNFO0FBQUEsTUFBQSxZQUFBLEVBQWMsS0FBZDtBQUFBLE1BQ0EsZ0JBQUEsRUFBa0IsRUFEbEI7S0FERjtBQUFBLElBSUEsS0FBQSxFQUFPLElBSlA7QUFBQSxJQUtBLFFBQUEsRUFBVSxJQUxWO0FBQUEsSUFPQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFDUixNQUFBLElBQUMsQ0FBQSxLQUFELEdBQWEsSUFBQSxXQUFBLGlCQUFZLEtBQUssQ0FBRSxnQkFBbkIsQ0FBYixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsUUFBRCxHQUFnQixJQUFBLFFBQUEsQ0FBQSxDQURoQixDQUFBO0FBQUEsTUFFQSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLHFCQUEzQixFQUFrRCxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUFHLEtBQUMsQ0FBQSxpQkFBRCxDQUFBLEVBQUg7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFsRCxDQUZBLENBQUE7QUFBQSxNQUdBLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIsa0JBQTNCLEVBQStDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQUcsS0FBQyxDQUFBLGNBQUQsQ0FBQSxFQUFIO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBL0MsQ0FIQSxDQUFBO0FBQUEsTUFJQSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLGtCQUEzQixFQUErQyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUFHLEtBQUMsQ0FBQSxlQUFELENBQUEsRUFBSDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQS9DLENBSkEsQ0FBQTtBQUFBLE1BS0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQixvQkFBM0IsRUFBaUQsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFBRyxLQUFDLENBQUEsS0FBSyxDQUFDLE9BQVAsQ0FBQSxFQUFIO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBakQsQ0FMQSxDQUFBO2FBTUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQix1QkFBM0IsRUFBb0QsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFBRyxLQUFDLENBQUEsS0FBSyxDQUFDLFVBQVAsQ0FBQSxFQUFIO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBcEQsRUFQUTtJQUFBLENBUFY7QUFBQSxJQWdCQSxVQUFBLEVBQVksU0FBQSxHQUFBO0FBQ1YsVUFBQSxXQUFBOztZQUFNLENBQUUsT0FBUixDQUFBO09BQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxLQUFELEdBQVMsSUFEVCxDQUFBOzthQUVTLENBQUUsT0FBWCxDQUFBO09BRkE7YUFHQSxJQUFDLENBQUEsUUFBRCxHQUFZLEtBSkY7SUFBQSxDQWhCWjtBQUFBLElBc0JBLFNBQUEsRUFBVyxTQUFBLEdBQUE7YUFBRztBQUFBLFFBQUUsU0FBQSxFQUFXLElBQUMsQ0FBQSxLQUFLLENBQUMsT0FBcEI7UUFBSDtJQUFBLENBdEJYO0FBQUEsSUF3QkEsZUFBQSxFQUFpQixTQUFBLEdBQUE7QUFDZixVQUFBLE9BQUE7QUFBQSxNQUFBLE9BQUEsR0FBVSxJQUFDLENBQUEsS0FBSyxDQUFDLGVBQVAsQ0FBQSxDQUFWLENBQUE7QUFDQSxNQUFBLElBQUcsT0FBSDtlQUNFLElBQUMsQ0FBQSxRQUFRLENBQUMsUUFBVixDQUFtQixPQUFuQixFQURGO09BRmU7SUFBQSxDQXhCakI7QUFBQSxJQTZCQSxpQkFBQSxFQUFtQixTQUFBLEdBQUE7QUFDakIsVUFBQSxPQUFBO0FBQUEsTUFBQSxPQUFBLEdBQVUsSUFBQyxDQUFBLEtBQUssQ0FBQyxhQUFQLENBQUEsQ0FBVixDQUFBO2FBQ0EsSUFBQyxDQUFBLFFBQVEsQ0FBQyxRQUFWLENBQW1CLE9BQW5CLEVBRmlCO0lBQUEsQ0E3Qm5CO0FBQUEsSUFpQ0EsY0FBQSxFQUFnQixTQUFBLEdBQUE7QUFDZCxVQUFBLG9CQUFBO0FBQUEsTUFBQSxDQUFBLEdBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFmLENBQUEsQ0FBSixDQUFBO0FBQUEsTUFDQSxRQUFBLGVBQVcsQ0FBQyxDQUFFLE9BQUgsQ0FBQSxVQURYLENBQUE7QUFFQSxNQUFBLElBQUcsUUFBSDtBQUNFLFFBQUEsT0FBQSxHQUFVLElBQUMsQ0FBQSxLQUFLLENBQUMsZ0JBQVAsQ0FBd0IsQ0FBeEIsQ0FBVixDQUFBO2VBQ0EsSUFBQyxDQUFBLFFBQVEsQ0FBQyxRQUFWLENBQW1CLE9BQW5CLEVBRkY7T0FIYztJQUFBLENBakNoQjtHQUxGLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/frosas/projects/dotfiles/home/.atom/packages/goto/lib/index.coffee