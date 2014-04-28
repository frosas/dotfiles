(function() {
  var LinterConfig, minimatch,
    __slice = [].slice;

  minimatch = require('minimatch');

  module.exports = LinterConfig = (function() {
    LinterConfig.ROOT_KEY = 'atom-lint';

    function LinterConfig(linterKey) {
      this.linterKey = linterKey;
    }

    LinterConfig.prototype.getKeyPathForSubKeys = function() {
      var keys;
      keys = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      keys.unshift(LinterConfig.ROOT_KEY);
      return keys.join('.');
    };

    LinterConfig.prototype.getLinterSetting = function(key) {
      var keyPath;
      keyPath = this.getKeyPathForSubKeys(this.linterKey, key);
      return atom.config.get(keyPath);
    };

    LinterConfig.prototype.getGlobalSetting = function(key) {
      var keyPath;
      keyPath = this.getKeyPathForSubKeys(key);
      return atom.config.get(keyPath);
    };

    LinterConfig.prototype.isFileToLint = function(absolutePath) {
      var globalIgnoredNames, ignoredNames, linterIgnoredNames, relativePath;
      linterIgnoredNames = this.getLinterSetting('ignoredNames') || [];
      globalIgnoredNames = this.getGlobalSetting('ignoredNames') || [];
      ignoredNames = linterIgnoredNames.concat(globalIgnoredNames);
      relativePath = atom.project.relativize(absolutePath);
      return ignoredNames.every(function(ignoredName) {
        return !minimatch(relativePath, ignoredName);
      });
    };

    return LinterConfig;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHVCQUFBO0lBQUEsa0JBQUE7O0FBQUEsRUFBQSxTQUFBLEdBQVksT0FBQSxDQUFRLFdBQVIsQ0FBWixDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLElBQUEsWUFBQyxDQUFBLFFBQUQsR0FBWSxXQUFaLENBQUE7O0FBRWEsSUFBQSxzQkFBRSxTQUFGLEdBQUE7QUFBYyxNQUFiLElBQUMsQ0FBQSxZQUFBLFNBQVksQ0FBZDtJQUFBLENBRmI7O0FBQUEsMkJBSUEsb0JBQUEsR0FBc0IsU0FBQSxHQUFBO0FBQ3BCLFVBQUEsSUFBQTtBQUFBLE1BRHFCLDhEQUNyQixDQUFBO0FBQUEsTUFBQSxJQUFJLENBQUMsT0FBTCxDQUFhLFlBQVksQ0FBQyxRQUExQixDQUFBLENBQUE7YUFDQSxJQUFJLENBQUMsSUFBTCxDQUFVLEdBQVYsRUFGb0I7SUFBQSxDQUp0QixDQUFBOztBQUFBLDJCQVFBLGdCQUFBLEdBQWtCLFNBQUMsR0FBRCxHQUFBO0FBQ2hCLFVBQUEsT0FBQTtBQUFBLE1BQUEsT0FBQSxHQUFVLElBQUMsQ0FBQSxvQkFBRCxDQUFzQixJQUFDLENBQUEsU0FBdkIsRUFBa0MsR0FBbEMsQ0FBVixDQUFBO2FBQ0EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLE9BQWhCLEVBRmdCO0lBQUEsQ0FSbEIsQ0FBQTs7QUFBQSwyQkFZQSxnQkFBQSxHQUFrQixTQUFDLEdBQUQsR0FBQTtBQUNoQixVQUFBLE9BQUE7QUFBQSxNQUFBLE9BQUEsR0FBVSxJQUFDLENBQUEsb0JBQUQsQ0FBc0IsR0FBdEIsQ0FBVixDQUFBO2FBQ0EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLE9BQWhCLEVBRmdCO0lBQUEsQ0FabEIsQ0FBQTs7QUFBQSwyQkFnQkEsWUFBQSxHQUFjLFNBQUMsWUFBRCxHQUFBO0FBQ1osVUFBQSxrRUFBQTtBQUFBLE1BQUEsa0JBQUEsR0FBcUIsSUFBQyxDQUFBLGdCQUFELENBQWtCLGNBQWxCLENBQUEsSUFBcUMsRUFBMUQsQ0FBQTtBQUFBLE1BQ0Esa0JBQUEsR0FBcUIsSUFBQyxDQUFBLGdCQUFELENBQWtCLGNBQWxCLENBQUEsSUFBcUMsRUFEMUQsQ0FBQTtBQUFBLE1BRUEsWUFBQSxHQUFlLGtCQUFrQixDQUFDLE1BQW5CLENBQTBCLGtCQUExQixDQUZmLENBQUE7QUFBQSxNQUlBLFlBQUEsR0FBZSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQWIsQ0FBd0IsWUFBeEIsQ0FKZixDQUFBO2FBTUEsWUFBWSxDQUFDLEtBQWIsQ0FBbUIsU0FBQyxXQUFELEdBQUE7ZUFDakIsQ0FBQSxTQUFDLENBQVUsWUFBVixFQUF3QixXQUF4QixFQURnQjtNQUFBLENBQW5CLEVBUFk7SUFBQSxDQWhCZCxDQUFBOzt3QkFBQTs7TUFKRixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/frosas/projects/dotfiles/home/.atom/packages/atom-lint/lib/linter-config.coffee