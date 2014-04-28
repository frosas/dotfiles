(function() {
  var Subscriber;

  Subscriber = require('emissary').Subscriber;

  module.exports = {
    activate: function(state) {
      return this.subscribe(atom.workspace.eachEditor((function(_this) {
        return function(editor) {
          return _this._handleLoad(editor);
        };
      })(this)));
    },
    _handleLoad: function(editor) {
      this._loadSettingsForEditor(editor);
      return this.subscribe(editor.buffer, 'saved', (function(_this) {
        return function() {
          return _this._loadSettingsForEditor(editor);
        };
      })(this));
    },
    deactivate: function() {
      return this.unsubscribe();
    },
    _loadSettingsForEditor: function(editor) {
      var firstSpaces, found, i, length, lineCount, numLinesWithSpaces, numLinesWithTabs, shortest, spaceChars, _i, _ref;
      lineCount = editor.getLineCount();
      shortest = 0;
      numLinesWithTabs = 0;
      numLinesWithSpaces = 0;
      found = false;
      for (i = _i = 0, _ref = lineCount - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (!(i < 100 || !found)) {
          continue;
        }
        firstSpaces = editor.lineForBufferRow(i).match(/^([ \t]+)[^ \t]/m);
        if (firstSpaces) {
          found = true;
          spaceChars = firstSpaces[1];
          if (spaceChars[0] === '\t') {
            numLinesWithTabs++;
          } else {
            length = spaceChars.length;
            if (length === 1) {
              continue;
            }
            numLinesWithSpaces++;
            if (length < shortest || shortest === 0) {
              shortest = length;
            }
          }
        }
      }
      if (found) {
        if (numLinesWithTabs > numLinesWithSpaces) {
          editor.setSoftTabs(false);
          return editor.setTabLength(atom.config.get("editor.tabLength"));
        } else {
          editor.setSoftTabs(true);
          return editor.setTabLength(shortest);
        }
      }
    }
  };

  Subscriber.extend(module.exports);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFVBQUE7O0FBQUEsRUFBQyxhQUFjLE9BQUEsQ0FBUSxVQUFSLEVBQWQsVUFBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO2FBQ1IsSUFBQyxDQUFBLFNBQUQsQ0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQWYsQ0FBMEIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsTUFBRCxHQUFBO2lCQUNuQyxLQUFDLENBQUEsV0FBRCxDQUFhLE1BQWIsRUFEbUM7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUExQixDQUFYLEVBRFE7SUFBQSxDQUFWO0FBQUEsSUFJQSxXQUFBLEVBQWEsU0FBQyxNQUFELEdBQUE7QUFDWCxNQUFBLElBQUMsQ0FBQSxzQkFBRCxDQUF3QixNQUF4QixDQUFBLENBQUE7YUFDQSxJQUFDLENBQUEsU0FBRCxDQUFXLE1BQU0sQ0FBQyxNQUFsQixFQUEwQixPQUExQixFQUFtQyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUNqQyxLQUFDLENBQUEsc0JBQUQsQ0FBd0IsTUFBeEIsRUFEaUM7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFuQyxFQUZXO0lBQUEsQ0FKYjtBQUFBLElBU0EsVUFBQSxFQUFZLFNBQUEsR0FBQTthQUNWLElBQUMsQ0FBQSxXQUFELENBQUEsRUFEVTtJQUFBLENBVFo7QUFBQSxJQVlBLHNCQUFBLEVBQXdCLFNBQUMsTUFBRCxHQUFBO0FBQ3RCLFVBQUEsOEdBQUE7QUFBQSxNQUFBLFNBQUEsR0FBWSxNQUFNLENBQUMsWUFBUCxDQUFBLENBQVosQ0FBQTtBQUFBLE1BQ0EsUUFBQSxHQUFXLENBRFgsQ0FBQTtBQUFBLE1BRUEsZ0JBQUEsR0FBbUIsQ0FGbkIsQ0FBQTtBQUFBLE1BR0Esa0JBQUEsR0FBcUIsQ0FIckIsQ0FBQTtBQUFBLE1BSUEsS0FBQSxHQUFRLEtBSlIsQ0FBQTtBQU9BLFdBQVMsa0dBQVQsR0FBQTtjQUFnQyxDQUFBLEdBQUksR0FBSixJQUFXLENBQUE7O1NBS3pDO0FBQUEsUUFBQSxXQUFBLEdBQWMsTUFBTSxDQUFDLGdCQUFQLENBQXdCLENBQXhCLENBQTBCLENBQUMsS0FBM0IsQ0FBaUMsa0JBQWpDLENBQWQsQ0FBQTtBQUVBLFFBQUEsSUFBRyxXQUFIO0FBQ0UsVUFBQSxLQUFBLEdBQVEsSUFBUixDQUFBO0FBQUEsVUFDQSxVQUFBLEdBQWEsV0FBWSxDQUFBLENBQUEsQ0FEekIsQ0FBQTtBQUdBLFVBQUEsSUFBRyxVQUFXLENBQUEsQ0FBQSxDQUFYLEtBQWlCLElBQXBCO0FBQ0UsWUFBQSxnQkFBQSxFQUFBLENBREY7V0FBQSxNQUFBO0FBR0UsWUFBQSxNQUFBLEdBQVMsVUFBVSxDQUFDLE1BQXBCLENBQUE7QUFHQSxZQUFBLElBQVksTUFBQSxLQUFVLENBQXRCO0FBQUEsdUJBQUE7YUFIQTtBQUFBLFlBS0Esa0JBQUEsRUFMQSxDQUFBO0FBT0EsWUFBQSxJQUFxQixNQUFBLEdBQVMsUUFBVCxJQUFxQixRQUFBLEtBQVksQ0FBdEQ7QUFBQSxjQUFBLFFBQUEsR0FBVyxNQUFYLENBQUE7YUFWRjtXQUpGO1NBUEY7QUFBQSxPQVBBO0FBOEJBLE1BQUEsSUFBRyxLQUFIO0FBQ0UsUUFBQSxJQUFHLGdCQUFBLEdBQW1CLGtCQUF0QjtBQUNFLFVBQUEsTUFBTSxDQUFDLFdBQVAsQ0FBbUIsS0FBbkIsQ0FBQSxDQUFBO2lCQUNBLE1BQU0sQ0FBQyxZQUFQLENBQW9CLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixrQkFBaEIsQ0FBcEIsRUFGRjtTQUFBLE1BQUE7QUFJRSxVQUFBLE1BQU0sQ0FBQyxXQUFQLENBQW1CLElBQW5CLENBQUEsQ0FBQTtpQkFDQSxNQUFNLENBQUMsWUFBUCxDQUFvQixRQUFwQixFQUxGO1NBREY7T0EvQnNCO0lBQUEsQ0FaeEI7R0FIRixDQUFBOztBQUFBLEVBc0RBLFVBQVUsQ0FBQyxNQUFYLENBQWtCLE1BQU0sQ0FBQyxPQUF6QixDQXREQSxDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/frosas/projects/dotfiles/home/.atom/packages/auto-detect-indentation/lib/auto-detect-indentation.coffee