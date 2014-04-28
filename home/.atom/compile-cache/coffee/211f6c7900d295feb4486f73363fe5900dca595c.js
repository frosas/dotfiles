(function() {
  module.exports = {
    capitalize: function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    punctuate: function(string) {
      if (string.match(/[\.,:;]$/)) {
        return string;
      } else {
        return string + '.';
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxFQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFVBQUEsRUFBWSxTQUFDLE1BQUQsR0FBQTthQUNWLE1BQU0sQ0FBQyxNQUFQLENBQWMsQ0FBZCxDQUFnQixDQUFDLFdBQWpCLENBQUEsQ0FBQSxHQUFpQyxNQUFNLENBQUMsS0FBUCxDQUFhLENBQWIsRUFEdkI7SUFBQSxDQUFaO0FBQUEsSUFHQSxTQUFBLEVBQVcsU0FBQyxNQUFELEdBQUE7QUFDVCxNQUFBLElBQUcsTUFBTSxDQUFDLEtBQVAsQ0FBYSxVQUFiLENBQUg7ZUFDRSxPQURGO09BQUEsTUFBQTtlQUdFLE1BQUEsR0FBUyxJQUhYO09BRFM7SUFBQSxDQUhYO0dBREYsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/frosas/projects/dotfiles/home/.atom/packages/atom-lint/lib/util.coffee