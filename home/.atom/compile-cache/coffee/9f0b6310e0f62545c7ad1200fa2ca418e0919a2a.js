(function() {
  var Violation, util, _;

  _ = require('lodash');

  util = require('./util');

  module.exports = Violation = (function() {
    Violation.SEVERITIES = ['warning', 'error'];

    function Violation(severity, bufferRange, message) {
      this.severity = severity;
      this.bufferRange = bufferRange;
      this.message = message;
      if (!_.contains(Violation.SEVERITIES, this.severity)) {
        message = "Severity must be any of " + (Violation.SEVERITIES.join(',')) + ". ";
        message += "" + this.severity + " is passed.";
        throw new Error(message);
      }
    }

    Violation.prototype.getHTML = function() {
      var HTML;
      HTML = util.punctuate(util.capitalize(this.message));
      HTML = _.escape(HTML);
      return HTML.replace(/(^|\s)(`|&#39;)(.+?)\2([\s\.\,\:\;\!\?\)]|$)/g, '$1<code>$3</code>$4');
    };

    return Violation;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtCQUFBOztBQUFBLEVBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxRQUFSLENBQUosQ0FBQTs7QUFBQSxFQUNBLElBQUEsR0FBTyxPQUFBLENBQVEsUUFBUixDQURQLENBQUE7O0FBQUEsRUFHQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osSUFBQSxTQUFDLENBQUEsVUFBRCxHQUFjLENBQUMsU0FBRCxFQUFZLE9BQVosQ0FBZCxDQUFBOztBQUVhLElBQUEsbUJBQUUsUUFBRixFQUFhLFdBQWIsRUFBMkIsT0FBM0IsR0FBQTtBQUNYLE1BRFksSUFBQyxDQUFBLFdBQUEsUUFDYixDQUFBO0FBQUEsTUFEdUIsSUFBQyxDQUFBLGNBQUEsV0FDeEIsQ0FBQTtBQUFBLE1BRHFDLElBQUMsQ0FBQSxVQUFBLE9BQ3RDLENBQUE7QUFBQSxNQUFBLElBQUEsQ0FBQSxDQUFRLENBQUMsUUFBRixDQUFXLFNBQVMsQ0FBQyxVQUFyQixFQUFpQyxJQUFDLENBQUEsUUFBbEMsQ0FBUDtBQUNFLFFBQUEsT0FBQSxHQUFZLDBCQUFBLEdBQXlCLENBQUEsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFyQixDQUEwQixHQUExQixDQUFBLENBQXpCLEdBQXlELElBQXJFLENBQUE7QUFBQSxRQUNBLE9BQUEsSUFBVyxFQUFBLEdBQUUsSUFBQyxDQUFBLFFBQUgsR0FBYSxhQUR4QixDQUFBO0FBRUEsY0FBVSxJQUFBLEtBQUEsQ0FBTSxPQUFOLENBQVYsQ0FIRjtPQURXO0lBQUEsQ0FGYjs7QUFBQSx3QkFRQSxPQUFBLEdBQVMsU0FBQSxHQUFBO0FBQ1AsVUFBQSxJQUFBO0FBQUEsTUFBQSxJQUFBLEdBQU8sSUFBSSxDQUFDLFNBQUwsQ0FBZSxJQUFJLENBQUMsVUFBTCxDQUFnQixJQUFDLENBQUEsT0FBakIsQ0FBZixDQUFQLENBQUE7QUFBQSxNQUNBLElBQUEsR0FBTyxDQUFDLENBQUMsTUFBRixDQUFTLElBQVQsQ0FEUCxDQUFBO2FBRUEsSUFBSSxDQUFDLE9BQUwsQ0FBYSwrQ0FBYixFQUE4RCxxQkFBOUQsRUFITztJQUFBLENBUlQsQ0FBQTs7cUJBQUE7O01BTEYsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/frosas/projects/dotfiles/home/.atom/packages/atom-lint/lib/violation.coffee