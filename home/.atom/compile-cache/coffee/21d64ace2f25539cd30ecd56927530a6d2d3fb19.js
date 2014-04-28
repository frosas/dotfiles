(function() {
  var JsHint, Point, Range, Violation, XmlBase, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), Range = _ref.Range, Point = _ref.Point;

  XmlBase = require('./xml-base');

  Violation = require('../violation');

  module.exports = JsHint = (function(_super) {
    __extends(JsHint, _super);

    function JsHint() {
      return JsHint.__super__.constructor.apply(this, arguments);
    }

    JsHint.canonicalName = 'JSHint';

    JsHint.prototype.buildCommand = function() {
      var command, userJsHintPath;
      command = [];
      userJsHintPath = atom.config.get('atom-lint.jshint.path');
      if (userJsHintPath != null) {
        command.push(userJsHintPath);
      } else {
        command.push('jshint');
      }
      command.push('--reporter', 'checkstyle');
      command.push(this.filePath);
      return command;
    };

    JsHint.prototype.isValidExitCode = function(exitCode) {
      return exitCode === 0 || exitCode === 2;
    };

    JsHint.prototype.createViolationFromElement = function(element) {
      var bufferPoint, bufferRange;
      bufferPoint = new Point(element.$.line - 1, element.$.column - 1);
      bufferRange = new Range(bufferPoint, bufferPoint);
      return new Violation(element.$.severity, bufferRange, element.$.message);
    };

    return JsHint;

  })(XmlBase);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDhDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxPQUFpQixPQUFBLENBQVEsTUFBUixDQUFqQixFQUFDLGFBQUEsS0FBRCxFQUFRLGFBQUEsS0FBUixDQUFBOztBQUFBLEVBQ0EsT0FBQSxHQUFVLE9BQUEsQ0FBUSxZQUFSLENBRFYsQ0FBQTs7QUFBQSxFQUVBLFNBQUEsR0FBWSxPQUFBLENBQVEsY0FBUixDQUZaLENBQUE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osNkJBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsTUFBQyxDQUFBLGFBQUQsR0FBaUIsUUFBakIsQ0FBQTs7QUFBQSxxQkFFQSxZQUFBLEdBQWMsU0FBQSxHQUFBO0FBQ1osVUFBQSx1QkFBQTtBQUFBLE1BQUEsT0FBQSxHQUFVLEVBQVYsQ0FBQTtBQUFBLE1BRUEsY0FBQSxHQUFpQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsdUJBQWhCLENBRmpCLENBQUE7QUFJQSxNQUFBLElBQUcsc0JBQUg7QUFDRSxRQUFBLE9BQU8sQ0FBQyxJQUFSLENBQWEsY0FBYixDQUFBLENBREY7T0FBQSxNQUFBO0FBR0UsUUFBQSxPQUFPLENBQUMsSUFBUixDQUFhLFFBQWIsQ0FBQSxDQUhGO09BSkE7QUFBQSxNQVNBLE9BQU8sQ0FBQyxJQUFSLENBQWEsWUFBYixFQUEyQixZQUEzQixDQVRBLENBQUE7QUFBQSxNQVVBLE9BQU8sQ0FBQyxJQUFSLENBQWEsSUFBQyxDQUFBLFFBQWQsQ0FWQSxDQUFBO2FBV0EsUUFaWTtJQUFBLENBRmQsQ0FBQTs7QUFBQSxxQkFnQkEsZUFBQSxHQUFpQixTQUFDLFFBQUQsR0FBQTthQUdmLFFBQUEsS0FBWSxDQUFaLElBQWlCLFFBQUEsS0FBWSxFQUhkO0lBQUEsQ0FoQmpCLENBQUE7O0FBQUEscUJBcUJBLDBCQUFBLEdBQTRCLFNBQUMsT0FBRCxHQUFBO0FBRzFCLFVBQUEsd0JBQUE7QUFBQSxNQUFBLFdBQUEsR0FBa0IsSUFBQSxLQUFBLENBQU0sT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFWLEdBQWlCLENBQXZCLEVBQTBCLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBVixHQUFtQixDQUE3QyxDQUFsQixDQUFBO0FBQUEsTUFDQSxXQUFBLEdBQWtCLElBQUEsS0FBQSxDQUFNLFdBQU4sRUFBbUIsV0FBbkIsQ0FEbEIsQ0FBQTthQUVJLElBQUEsU0FBQSxDQUFVLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBcEIsRUFBOEIsV0FBOUIsRUFBMkMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFyRCxFQUxzQjtJQUFBLENBckI1QixDQUFBOztrQkFBQTs7S0FEbUIsUUFMckIsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/frosas/projects/dotfiles/home/.atom/packages/atom-lint/lib/linter/jshint.coffee