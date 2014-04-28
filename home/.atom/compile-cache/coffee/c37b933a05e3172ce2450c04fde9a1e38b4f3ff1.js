(function() {
  var NotSupportedNotificationView, View, path,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom').View;

  path = require('path');

  module.exports = NotSupportedNotificationView = (function(_super) {
    __extends(NotSupportedNotificationView, _super);

    function NotSupportedNotificationView(state, message) {
      this.message = message;
      this.message = this.message;
      NotSupportedNotificationView.__super__.constructor.call(this, state);
    }

    NotSupportedNotificationView.content = function() {
      var editor, ext, message, title;
      editor = atom.workspace.activePaneItem;
      title = editor.getTitle();
      ext = path.extname(title);
      message = ext.length > 0 ? ext : title;
      return this.div({
        "class": 'test overlay from-top'
      }, (function(_this) {
        return function() {
          return _this.div("Format: '" + message + "' files not yet supported.", {
            "class": "message"
          });
        };
      })(this));
    };

    return NotSupportedNotificationView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHdDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxPQUFRLE9BQUEsQ0FBUSxNQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBQ0EsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRFAsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDSixtREFBQSxDQUFBOztBQUFhLElBQUEsc0NBQUMsS0FBRCxFQUFTLE9BQVQsR0FBQTtBQUNYLE1BRG1CLElBQUMsQ0FBQSxVQUFBLE9BQ3BCLENBQUE7QUFBQSxNQUFBLElBQUksQ0FBQyxPQUFMLEdBQWUsSUFBQyxDQUFBLE9BQWhCLENBQUE7QUFBQSxNQUNBLDhEQUFNLEtBQU4sQ0FEQSxDQURXO0lBQUEsQ0FBYjs7QUFBQSxJQUlBLDRCQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTtBQUNSLFVBQUEsMkJBQUE7QUFBQSxNQUFBLE1BQUEsR0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQXhCLENBQUE7QUFBQSxNQUNBLEtBQUEsR0FBUSxNQUFNLENBQUMsUUFBUCxDQUFBLENBRFIsQ0FBQTtBQUFBLE1BRUEsR0FBQSxHQUFNLElBQUksQ0FBQyxPQUFMLENBQWEsS0FBYixDQUZOLENBQUE7QUFBQSxNQUdBLE9BQUEsR0FBYSxHQUFHLENBQUMsTUFBSixHQUFhLENBQWhCLEdBQXVCLEdBQXZCLEdBQWdDLEtBSDFDLENBQUE7YUFLQSxJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsUUFBQSxPQUFBLEVBQU8sdUJBQVA7T0FBTCxFQUFxQyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUNuQyxLQUFDLENBQUEsR0FBRCxDQUFNLFdBQUEsR0FBVSxPQUFWLEdBQW1CLDRCQUF6QixFQUFzRDtBQUFBLFlBQUEsT0FBQSxFQUFPLFNBQVA7V0FBdEQsRUFEbUM7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFyQyxFQU5RO0lBQUEsQ0FKVixDQUFBOzt3Q0FBQTs7S0FEeUMsS0FKM0MsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/frosas/projects/dotfiles/home/.atom/packages/jsformat/lib/not-supported-view.coffee