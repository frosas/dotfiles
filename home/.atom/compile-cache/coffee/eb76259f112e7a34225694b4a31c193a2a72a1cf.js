(function() {
  var FileTypeNotSupportedView, jsbeautify;

  FileTypeNotSupportedView = require('./not-supported-view');

  jsbeautify = (require('js-beautify')).js_beautify;

  module.exports = {
    configDefaults: {
      indent_with_tabs: false,
      max_preserve_newlines: 4,
      preserve_newlines: true,
      space_in_paren: false,
      jslint_happy: false,
      brace_style: "collapse",
      keep_array_indentation: false,
      keep_function_indentation: false,
      space_before_conditional: true,
      eval_code: false,
      unescape_strings: false,
      break_chained_methods: false,
      e4x: false
    },
    activate: function(state) {
      return atom.workspaceView.command("jsformat:format", (function(_this) {
        return function() {
          return _this.format(state);
        };
      })(this));
    },
    format: function(state) {
      var destroyer, editor, grammar, notification, _ref;
      editor = atom.workspace.activePaneItem;
      if (!editor) {
        return;
      }
      grammar = (_ref = editor.getGrammar()) != null ? _ref.scopeName : void 0;
      if (grammar === 'source.json' || grammar === 'source.js') {
        return this.formatJavascript(editor);
      } else {
        notification = new FileTypeNotSupportedView(state);
        atom.workspaceView.append(notification);
        destroyer = function() {
          return notification.detach();
        };
        return setTimeout(destroyer, 1500);
      }
    },
    formatJavascript: function(editor) {
      var configKey, defaultValue, opts, selection, settings, _i, _len, _ref, _ref1, _ref2, _results;
      settings = atom.config.getSettings().editor;
      opts = {
        indent_size: settings.tabLength,
        wrap_line_length: settings.preferredLineLength
      };
      _ref = this.configDefaults;
      for (configKey in _ref) {
        defaultValue = _ref[configKey];
        opts[configKey] = (_ref1 = atom.config.get('jsformat.' + configKey)) != null ? _ref1 : defaultValue;
      }
      if (this.selectionsAreEmpty(editor)) {
        return editor.setText(jsbeautify(editor.getText(), opts));
      } else {
        _ref2 = editor.getSelections();
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          selection = _ref2[_i];
          _results.push(selection.insertText(jsbeautify(selection.getText(), opts), {
            select: true
          }));
        }
        return _results;
      }
    },
    selectionsAreEmpty: function(editor) {
      var selection, _i, _len, _ref;
      _ref = editor.getSelections();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        selection = _ref[_i];
        if (!selection.isEmpty()) {
          return false;
        }
      }
      return true;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG9DQUFBOztBQUFBLEVBQUEsd0JBQUEsR0FBMkIsT0FBQSxDQUFRLHNCQUFSLENBQTNCLENBQUE7O0FBQUEsRUFFQSxVQUFBLEdBQWEsQ0FBQyxPQUFBLENBQVEsYUFBUixDQUFELENBQXVCLENBQUMsV0FGckMsQ0FBQTs7QUFBQSxFQUlBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLGNBQUEsRUFDRTtBQUFBLE1BQUEsZ0JBQUEsRUFBa0IsS0FBbEI7QUFBQSxNQUNBLHFCQUFBLEVBQXVCLENBRHZCO0FBQUEsTUFFQSxpQkFBQSxFQUFtQixJQUZuQjtBQUFBLE1BR0EsY0FBQSxFQUFnQixLQUhoQjtBQUFBLE1BSUEsWUFBQSxFQUFjLEtBSmQ7QUFBQSxNQUtBLFdBQUEsRUFBYSxVQUxiO0FBQUEsTUFNQSxzQkFBQSxFQUF3QixLQU54QjtBQUFBLE1BT0EseUJBQUEsRUFBMkIsS0FQM0I7QUFBQSxNQVFBLHdCQUFBLEVBQTBCLElBUjFCO0FBQUEsTUFTQSxTQUFBLEVBQVcsS0FUWDtBQUFBLE1BVUEsZ0JBQUEsRUFBa0IsS0FWbEI7QUFBQSxNQVdBLHFCQUFBLEVBQXVCLEtBWHZCO0FBQUEsTUFZQSxHQUFBLEVBQUssS0FaTDtLQURGO0FBQUEsSUFlQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7YUFDUixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLGlCQUEzQixFQUE4QyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUFHLEtBQUMsQ0FBQSxNQUFELENBQVEsS0FBUixFQUFIO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBOUMsRUFEUTtJQUFBLENBZlY7QUFBQSxJQWtCQSxNQUFBLEVBQVEsU0FBQyxLQUFELEdBQUE7QUFDTixVQUFBLDhDQUFBO0FBQUEsTUFBQSxNQUFBLEdBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUF4QixDQUFBO0FBRUEsTUFBQSxJQUFHLENBQUEsTUFBSDtBQUNFLGNBQUEsQ0FERjtPQUZBO0FBQUEsTUFLQSxPQUFBLDhDQUE2QixDQUFFLGtCQUwvQixDQUFBO0FBT0EsTUFBQSxJQUFHLE9BQUEsS0FBVyxhQUFYLElBQTRCLE9BQUEsS0FBVyxXQUExQztlQUNFLElBQUMsQ0FBQSxnQkFBRCxDQUFrQixNQUFsQixFQURGO09BQUEsTUFBQTtBQUdFLFFBQUEsWUFBQSxHQUFtQixJQUFBLHdCQUFBLENBQXlCLEtBQXpCLENBQW5CLENBQUE7QUFBQSxRQUNBLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBbkIsQ0FBMEIsWUFBMUIsQ0FEQSxDQUFBO0FBQUEsUUFFQSxTQUFBLEdBQVksU0FBQSxHQUFBO2lCQUNWLFlBQVksQ0FBQyxNQUFiLENBQUEsRUFEVTtRQUFBLENBRlosQ0FBQTtlQUtBLFVBQUEsQ0FBVyxTQUFYLEVBQXNCLElBQXRCLEVBUkY7T0FSTTtJQUFBLENBbEJSO0FBQUEsSUFvQ0EsZ0JBQUEsRUFBa0IsU0FBQyxNQUFELEdBQUE7QUFDaEIsVUFBQSwwRkFBQTtBQUFBLE1BQUEsUUFBQSxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBWixDQUFBLENBQXlCLENBQUMsTUFBckMsQ0FBQTtBQUFBLE1BQ0EsSUFBQSxHQUFPO0FBQUEsUUFDTCxXQUFBLEVBQWEsUUFBUSxDQUFDLFNBRGpCO0FBQUEsUUFFTCxnQkFBQSxFQUFrQixRQUFRLENBQUMsbUJBRnRCO09BRFAsQ0FBQTtBQU1BO0FBQUEsV0FBQSxpQkFBQTt1Q0FBQTtBQUNFLFFBQUEsSUFBSyxDQUFBLFNBQUEsQ0FBTCx3RUFBNkQsWUFBN0QsQ0FERjtBQUFBLE9BTkE7QUFTQSxNQUFBLElBQUcsSUFBQyxDQUFBLGtCQUFELENBQW9CLE1BQXBCLENBQUg7ZUFDRSxNQUFNLENBQUMsT0FBUCxDQUFlLFVBQUEsQ0FBVyxNQUFNLENBQUMsT0FBUCxDQUFBLENBQVgsRUFBNkIsSUFBN0IsQ0FBZixFQURGO09BQUEsTUFBQTtBQUdFO0FBQUE7YUFBQSw0Q0FBQTtnQ0FBQTtBQUNFLHdCQUFBLFNBQVMsQ0FBQyxVQUFWLENBQXFCLFVBQUEsQ0FBVyxTQUFTLENBQUMsT0FBVixDQUFBLENBQVgsRUFBZ0MsSUFBaEMsQ0FBckIsRUFBNEQ7QUFBQSxZQUFDLE1BQUEsRUFBTyxJQUFSO1dBQTVELEVBQUEsQ0FERjtBQUFBO3dCQUhGO09BVmdCO0lBQUEsQ0FwQ2xCO0FBQUEsSUFvREEsa0JBQUEsRUFBb0IsU0FBQyxNQUFELEdBQUE7QUFDbEIsVUFBQSx5QkFBQTtBQUFBO0FBQUEsV0FBQSwyQ0FBQTs2QkFBQTtBQUNFLFFBQUEsSUFBQSxDQUFBLFNBQTZCLENBQUMsT0FBVixDQUFBLENBQXBCO0FBQUEsaUJBQU8sS0FBUCxDQUFBO1NBREY7QUFBQSxPQUFBO2FBRUEsS0FIa0I7SUFBQSxDQXBEcEI7R0FMRixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/frosas/projects/dotfiles/home/.atom/packages/jsformat/lib/format.coffee