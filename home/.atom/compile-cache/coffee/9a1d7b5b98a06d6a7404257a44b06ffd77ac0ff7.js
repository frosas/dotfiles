(function() {
  var RangeFinder, beautify, prettify;

  RangeFinder = require('./range-finder');

  beautify = require('js-beautify').html;

  module.exports = {
    activate: function() {
      return atom.workspaceView.command('prettify:prettify', '.editor', function() {
        var editor;
        editor = atom.workspaceView.getActivePaneItem();
        return prettify(editor);
      });
    }
  };

  prettify = function(editor) {
    var sortableRanges;
    sortableRanges = RangeFinder.rangesFor(editor);
    return sortableRanges.forEach(function(range) {
      var text;
      text = editor.getTextInBufferRange(range);
      text = beautify(text, {
        "indent_size": 2
      });
      return editor.setTextInBufferRange(range, text);
    });
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLCtCQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQUFkLENBQUE7O0FBQUEsRUFDQSxRQUFBLEdBQVcsT0FBQSxDQUFRLGFBQVIsQ0FBc0IsQ0FBQyxJQURsQyxDQUFBOztBQUFBLEVBR0EsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsUUFBQSxFQUFVLFNBQUEsR0FBQTthQUNSLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIsbUJBQTNCLEVBQWdELFNBQWhELEVBQTJELFNBQUEsR0FBQTtBQUN6RCxZQUFBLE1BQUE7QUFBQSxRQUFBLE1BQUEsR0FBUyxJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFuQixDQUFBLENBQVQsQ0FBQTtlQUNBLFFBQUEsQ0FBUyxNQUFULEVBRnlEO01BQUEsQ0FBM0QsRUFEUTtJQUFBLENBQVY7R0FKRixDQUFBOztBQUFBLEVBU0EsUUFBQSxHQUFXLFNBQUMsTUFBRCxHQUFBO0FBQ1QsUUFBQSxjQUFBO0FBQUEsSUFBQSxjQUFBLEdBQWlCLFdBQVcsQ0FBQyxTQUFaLENBQXNCLE1BQXRCLENBQWpCLENBQUE7V0FDQSxjQUFjLENBQUMsT0FBZixDQUF1QixTQUFDLEtBQUQsR0FBQTtBQUNyQixVQUFBLElBQUE7QUFBQSxNQUFBLElBQUEsR0FBTyxNQUFNLENBQUMsb0JBQVAsQ0FBNEIsS0FBNUIsQ0FBUCxDQUFBO0FBQUEsTUFDQSxJQUFBLEdBQU8sUUFBQSxDQUFTLElBQVQsRUFDTDtBQUFBLFFBQUEsYUFBQSxFQUFlLENBQWY7T0FESyxDQURQLENBQUE7YUFHQSxNQUFNLENBQUMsb0JBQVAsQ0FBNEIsS0FBNUIsRUFBbUMsSUFBbkMsRUFKcUI7SUFBQSxDQUF2QixFQUZTO0VBQUEsQ0FUWCxDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/frosas/projects/dotfiles/home/.atom/packages/atom-prettify/lib/prettify.coffee