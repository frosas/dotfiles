(function() {
  var moveToPosition;

  module.exports.gotoSymbol = function(symbol) {
    return atom.workspaceView.open(symbol.path).done((function(_this) {
      return function() {
        return moveToPosition(symbol.position);
      };
    })(this));
  };

  moveToPosition = function(position) {
    var editor, editorView;
    editorView = atom.workspaceView.getActiveView();
    if (editor = typeof editorView.getEditor === "function" ? editorView.getEditor() : void 0) {
      editorView.scrollToBufferPosition(position, {
        center: true
      });
      editor.setCursorBufferPosition(position);
      return editor.moveCursorToFirstCharacterOfLine();
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQ0E7QUFBQSxNQUFBLGNBQUE7O0FBQUEsRUFBQSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQWYsR0FBNEIsU0FBQyxNQUFELEdBQUE7V0FDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFuQixDQUF3QixNQUFNLENBQUMsSUFBL0IsQ0FBb0MsQ0FBQyxJQUFyQyxDQUEwQyxDQUFBLFNBQUEsS0FBQSxHQUFBO2FBQUEsU0FBQSxHQUFBO2VBQ3hDLGNBQUEsQ0FBZSxNQUFNLENBQUMsUUFBdEIsRUFEd0M7TUFBQSxFQUFBO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUExQyxFQUR3QjtFQUFBLENBQTVCLENBQUE7O0FBQUEsRUFJQSxjQUFBLEdBQWlCLFNBQUMsUUFBRCxHQUFBO0FBQ2IsUUFBQSxrQkFBQTtBQUFBLElBQUEsVUFBQSxHQUFhLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBbkIsQ0FBQSxDQUFiLENBQUE7QUFDQSxJQUFBLElBQUcsTUFBQSxnREFBUyxVQUFVLENBQUMsb0JBQXZCO0FBQ0UsTUFBQSxVQUFVLENBQUMsc0JBQVgsQ0FBa0MsUUFBbEMsRUFBNEM7QUFBQSxRQUFBLE1BQUEsRUFBUSxJQUFSO09BQTVDLENBQUEsQ0FBQTtBQUFBLE1BQ0EsTUFBTSxDQUFDLHVCQUFQLENBQStCLFFBQS9CLENBREEsQ0FBQTthQUVBLE1BQU0sQ0FBQyxnQ0FBUCxDQUFBLEVBSEY7S0FGYTtFQUFBLENBSmpCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/frosas/projects/dotfiles/home/.atom/packages/goto/lib/symbol-utils.coffee