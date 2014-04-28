(function() {
  var containsRange, sameRange;

  module.exports = {
    activate: function(state) {
      return atom.workspaceView.command("select-scope:select-more", (function(_this) {
        return function() {
          return _this.selectMore();
        };
      })(this));
    },
    selectMore: function() {
      var editor, scope, scopeRange, scopes, selectionRange, _i, _len, _ref;
      editor = atom.workspace.activePaneItem;
      scopes = editor != null ? (_ref = editor.getCursor()) != null ? _ref.getScopes() : void 0 : void 0;
      if (!scopes) {
        return;
      }
      selectionRange = editor.getSelectedBufferRange();
      scopes = scopes.slice().reverse();
      for (_i = 0, _len = scopes.length; _i < _len; _i++) {
        scope = scopes[_i];
        scopeRange = editor.bufferRangeForScopeAtCursor(scope);
        if (containsRange(scopeRange, selectionRange) && !sameRange(scopeRange, selectionRange)) {
          editor.setSelectedBufferRange(scopeRange);
          return;
        }
      }
    }
  };

  containsRange = function(range1, range2) {
    return range1.start.row <= range2.start.row && range1.start.column <= range2.start.column && range1.end.row >= range2.end.row && range1.end.column >= range2.end.column;
  };

  sameRange = function(range1, range2) {
    return range1.start.row === range2.start.row && range1.start.column === range2.start.column && range1.end.row === range2.end.row && range1.end.column === range2.end.column;
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHdCQUFBOztBQUFBLEVBQUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO2FBQ1IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQiwwQkFBM0IsRUFBdUQsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFBRyxLQUFDLENBQUEsVUFBRCxDQUFBLEVBQUg7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF2RCxFQURRO0lBQUEsQ0FBVjtBQUFBLElBR0EsVUFBQSxFQUFZLFNBQUEsR0FBQTtBQUNWLFVBQUEsaUVBQUE7QUFBQSxNQUFBLE1BQUEsR0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQXhCLENBQUE7QUFBQSxNQUNBLE1BQUEsOERBQTRCLENBQUUsU0FBckIsQ0FBQSxtQkFEVCxDQUFBO0FBR0EsTUFBQSxJQUFBLENBQUEsTUFBQTtBQUFBLGNBQUEsQ0FBQTtPQUhBO0FBQUEsTUFLQSxjQUFBLEdBQWlCLE1BQU0sQ0FBQyxzQkFBUCxDQUFBLENBTGpCLENBQUE7QUFBQSxNQVFBLE1BQUEsR0FBUyxNQUFNLENBQUMsS0FBUCxDQUFBLENBQWMsQ0FBQyxPQUFmLENBQUEsQ0FSVCxDQUFBO0FBVUEsV0FBQSw2Q0FBQTsyQkFBQTtBQUNFLFFBQUEsVUFBQSxHQUFhLE1BQU0sQ0FBQywyQkFBUCxDQUFtQyxLQUFuQyxDQUFiLENBQUE7QUFFQSxRQUFBLElBQUcsYUFBQSxDQUFjLFVBQWQsRUFBMEIsY0FBMUIsQ0FBQSxJQUE2QyxDQUFBLFNBQUMsQ0FBVSxVQUFWLEVBQXNCLGNBQXRCLENBQWpEO0FBQ0UsVUFBQSxNQUFNLENBQUMsc0JBQVAsQ0FBOEIsVUFBOUIsQ0FBQSxDQUFBO0FBQ0EsZ0JBQUEsQ0FGRjtTQUhGO0FBQUEsT0FYVTtJQUFBLENBSFo7R0FERixDQUFBOztBQUFBLEVBdUJBLGFBQUEsR0FBZ0IsU0FBQyxNQUFELEVBQVMsTUFBVCxHQUFBO1dBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFiLElBQW9CLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBakMsSUFBd0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFiLElBQXVCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBNUUsSUFDRSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQVgsSUFBa0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUQvQixJQUNzQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQVgsSUFBcUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUZ4RDtFQUFBLENBdkJoQixDQUFBOztBQUFBLEVBNEJBLFNBQUEsR0FBWSxTQUFDLE1BQUQsRUFBUyxNQUFULEdBQUE7V0FDVixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQWIsS0FBb0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFqQyxJQUF3QyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQWIsS0FBdUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUE1RSxJQUNFLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBWCxLQUFrQixNQUFNLENBQUMsR0FBRyxDQUFDLEdBRC9CLElBQ3NDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBWCxLQUFxQixNQUFNLENBQUMsR0FBRyxDQUFDLE9BRjVEO0VBQUEsQ0E1QlosQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/frosas/projects/dotfiles/home/.atom/packages/select-scope/lib/select-scope.coffee