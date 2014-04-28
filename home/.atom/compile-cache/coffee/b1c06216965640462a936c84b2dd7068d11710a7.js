(function() {
  var CommandRunner, XmlBase, xml2js;

  xml2js = require('xml2js');

  CommandRunner = require('../command-runner');

  module.exports = XmlBase = (function() {
    function XmlBase(filePath) {
      this.filePath = filePath;
    }

    XmlBase.prototype.run = function(callback) {
      var runner;
      runner = new CommandRunner(this.buildCommand());
      return runner.run((function(_this) {
        return function(commandError, result) {
          if (commandError != null) {
            return callback(commandError);
          }
          if (!_this.isValidExitCode(result.exitCode)) {
            return callback(new Error("Process exited with code " + result.exitCode));
          }
          return xml2js.parseString(result.stdout, function(xmlError, xml) {
            if (xmlError != null) {
              return callback(xmlError);
            }
            return callback(null, _this.createViolationsFromXml(xml));
          });
        };
      })(this));
    };

    XmlBase.prototype.buildCommand = function() {
      throw new Error('::buildCommand must be overridden');
    };

    XmlBase.prototype.isValidExitCode = function(exitCode) {
      throw new Error('::isValidExitCode must be overridden');
    };

    XmlBase.prototype.createViolationsFromXml = function(xml) {
      var element, _i, _len, _ref, _results;
      if (xml.checkstyle.file == null) {
        return [];
      }
      _ref = xml.checkstyle.file[0].error;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        element = _ref[_i];
        _results.push(this.createViolationFromElement(element));
      }
      return _results;
    };

    XmlBase.prototype.createViolationFromElement = function(element) {
      throw new Error('::createViolationFromElement must be overridden');
    };

    return XmlBase;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDhCQUFBOztBQUFBLEVBQUEsTUFBQSxHQUFTLE9BQUEsQ0FBUSxRQUFSLENBQVQsQ0FBQTs7QUFBQSxFQUNBLGFBQUEsR0FBZ0IsT0FBQSxDQUFRLG1CQUFSLENBRGhCLENBQUE7O0FBQUEsRUFHQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ1MsSUFBQSxpQkFBRSxRQUFGLEdBQUE7QUFBYSxNQUFaLElBQUMsQ0FBQSxXQUFBLFFBQVcsQ0FBYjtJQUFBLENBQWI7O0FBQUEsc0JBRUEsR0FBQSxHQUFLLFNBQUMsUUFBRCxHQUFBO0FBQ0gsVUFBQSxNQUFBO0FBQUEsTUFBQSxNQUFBLEdBQWEsSUFBQSxhQUFBLENBQWMsSUFBQyxDQUFBLFlBQUQsQ0FBQSxDQUFkLENBQWIsQ0FBQTthQUNBLE1BQU0sQ0FBQyxHQUFQLENBQVcsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsWUFBRCxFQUFlLE1BQWYsR0FBQTtBQUNULFVBQUEsSUFBaUMsb0JBQWpDO0FBQUEsbUJBQU8sUUFBQSxDQUFTLFlBQVQsQ0FBUCxDQUFBO1dBQUE7QUFFQSxVQUFBLElBQUEsQ0FBQSxLQUFRLENBQUEsZUFBRCxDQUFpQixNQUFNLENBQUMsUUFBeEIsQ0FBUDtBQUNFLG1CQUFPLFFBQUEsQ0FBYSxJQUFBLEtBQUEsQ0FBTywyQkFBQSxHQUEwQixNQUFNLENBQUMsUUFBeEMsQ0FBYixDQUFQLENBREY7V0FGQTtpQkFLQSxNQUFNLENBQUMsV0FBUCxDQUFtQixNQUFNLENBQUMsTUFBMUIsRUFBa0MsU0FBQyxRQUFELEVBQVcsR0FBWCxHQUFBO0FBQ2hDLFlBQUEsSUFBNkIsZ0JBQTdCO0FBQUEscUJBQU8sUUFBQSxDQUFTLFFBQVQsQ0FBUCxDQUFBO2FBQUE7bUJBQ0EsUUFBQSxDQUFTLElBQVQsRUFBZSxLQUFDLENBQUEsdUJBQUQsQ0FBeUIsR0FBekIsQ0FBZixFQUZnQztVQUFBLENBQWxDLEVBTlM7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFYLEVBRkc7SUFBQSxDQUZMLENBQUE7O0FBQUEsc0JBY0EsWUFBQSxHQUFjLFNBQUEsR0FBQTtBQUNaLFlBQVUsSUFBQSxLQUFBLENBQU0sbUNBQU4sQ0FBVixDQURZO0lBQUEsQ0FkZCxDQUFBOztBQUFBLHNCQWlCQSxlQUFBLEdBQWlCLFNBQUMsUUFBRCxHQUFBO0FBQ2YsWUFBVSxJQUFBLEtBQUEsQ0FBTSxzQ0FBTixDQUFWLENBRGU7SUFBQSxDQWpCakIsQ0FBQTs7QUFBQSxzQkFvQkEsdUJBQUEsR0FBeUIsU0FBQyxHQUFELEdBQUE7QUFDdkIsVUFBQSxpQ0FBQTtBQUFBLE1BQUEsSUFBaUIsMkJBQWpCO0FBQUEsZUFBTyxFQUFQLENBQUE7T0FBQTtBQUNBO0FBQUE7V0FBQSwyQ0FBQTsyQkFBQTtBQUNFLHNCQUFBLElBQUMsQ0FBQSwwQkFBRCxDQUE0QixPQUE1QixFQUFBLENBREY7QUFBQTtzQkFGdUI7SUFBQSxDQXBCekIsQ0FBQTs7QUFBQSxzQkF5QkEsMEJBQUEsR0FBNEIsU0FBQyxPQUFELEdBQUE7QUFDMUIsWUFBVSxJQUFBLEtBQUEsQ0FBTSxpREFBTixDQUFWLENBRDBCO0lBQUEsQ0F6QjVCLENBQUE7O21CQUFBOztNQUxGLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/frosas/projects/dotfiles/home/.atom/packages/atom-lint/lib/linter/xml-base.coffee