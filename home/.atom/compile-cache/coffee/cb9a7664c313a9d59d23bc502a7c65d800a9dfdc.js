(function() {
  var recentPaths;

  recentPaths = [];

  module.exports = {
    configDefaults: {
      maxRecentDirectories: 10,
      updated: true
    },
    activate: function() {
      this.maxRecentDirectories = atom.config.get('recent-files.maxRecentDirectories');
      this.loadPaths();
      this.insertCurrentPath();
      this.createMenu(this.createSubmenu());
      this.addListeners();
      this.savePaths();
      return this.markUpdatedAndListenForFutureUpdates();
    },
    loadPaths: function() {
      if (localStorage['recentPaths']) {
        return recentPaths = JSON.parse(localStorage['recentPaths']);
      }
    },
    savePaths: function() {
      return localStorage['recentPaths'] = JSON.stringify(recentPaths);
    },
    insertCurrentPath: function() {
      var index, path;
      if (atom.project.getRootDirectory()) {
        path = atom.project.getRootDirectory().path;
        index = recentPaths.indexOf(path);
        if (index !== -1) {
          recentPaths.splice(index, 1);
        }
        recentPaths.splice(0, 0, path);
        if (recentPaths.length > this.maxRecentDirectories) {
          return recentPaths.splice(this.maxRecentDirectories, recentPaths.length - this.maxRecentDirectories);
        }
      }
    },
    createSubmenu: function() {
      var index, path, submenu, _i, _len;
      submenu = [];
      for (_i = 0, _len = recentPaths.length; _i < _len; _i++) {
        path = recentPaths[_i];
        index = recentPaths.indexOf(path);
        submenu.push({
          label: path,
          command: "recent-files:" + index
        });
      }
      return {
        label: 'Recent',
        submenu: submenu
      };
    },
    createMenu: function(submenu) {
      var dropdown, index, item, _i, _j, _len, _len1, _ref, _ref1, _results;
      _ref = atom.menu.template;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        dropdown = _ref[_i];
        if (dropdown.label === "File") {
          _ref1 = dropdown.submenu;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            item = _ref1[_j];
            if (item.type === "separator") {
              index = dropdown.submenu.indexOf(item);
              dropdown.submenu.splice(index, 0, submenu);
              atom.menu.update();
              break;
            }
          }
          break;
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    },
    markUpdatedAndListenForFutureUpdates: function() {
      atom.config.set('recent-files.updated', true);
      return atom.config.observe('recent-files.updated', (function(_this) {
        return function() {
          if (atom.config.get('recent-files.updated') === true) {
            atom.config.set('recent-files.updated', false);
            _this.removeListeners();
            _this.loadPaths();
            return _this.addListeners();
          }
        };
      })(this));
    },
    addListeners: function() {
      var index, path, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = recentPaths.length; _i < _len; _i++) {
        path = recentPaths[_i];
        index = recentPaths.indexOf(path);
        _results.push((function(capturedPath, capturedIndex) {
          return atom.workspaceView.on("recent-files:" + capturedIndex, (function(_this) {
            return function() {
              return atom.open({
                pathsToOpen: [capturedPath]
              });
            };
          })(this));
        })(path, index));
      }
      return _results;
    },
    removeListeners: function() {
      var index, path, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = recentPaths.length; _i < _len; _i++) {
        path = recentPaths[_i];
        index = recentPaths.indexOf(path);
        _results.push(atom.workspaceView.off("recent-files:" + index));
      }
      return _results;
    },
    deactivate: function() {
      return this.removeListeners();
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFdBQUE7O0FBQUEsRUFBQSxXQUFBLEdBQWMsRUFBZCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsY0FBQSxFQUNFO0FBQUEsTUFBQSxvQkFBQSxFQUFzQixFQUF0QjtBQUFBLE1BQ0EsT0FBQSxFQUFTLElBRFQ7S0FERjtBQUFBLElBSUEsUUFBQSxFQUFVLFNBQUEsR0FBQTtBQUNSLE1BQUEsSUFBQyxDQUFBLG9CQUFELEdBQXdCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixtQ0FBaEIsQ0FBeEIsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLFNBQUQsQ0FBQSxDQURBLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQSxpQkFBRCxDQUFBLENBRkEsQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFBLFVBQUQsQ0FBWSxJQUFDLENBQUEsYUFBRCxDQUFBLENBQVosQ0FIQSxDQUFBO0FBQUEsTUFJQSxJQUFDLENBQUEsWUFBRCxDQUFBLENBSkEsQ0FBQTtBQUFBLE1BS0EsSUFBQyxDQUFBLFNBQUQsQ0FBQSxDQUxBLENBQUE7YUFNQSxJQUFDLENBQUEsb0NBQUQsQ0FBQSxFQVBRO0lBQUEsQ0FKVjtBQUFBLElBYUEsU0FBQSxFQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsSUFBRyxZQUFhLENBQUEsYUFBQSxDQUFoQjtlQUNFLFdBQUEsR0FBYyxJQUFJLENBQUMsS0FBTCxDQUFXLFlBQWEsQ0FBQSxhQUFBLENBQXhCLEVBRGhCO09BRFM7SUFBQSxDQWJYO0FBQUEsSUFpQkEsU0FBQSxFQUFXLFNBQUEsR0FBQTthQUNULFlBQWEsQ0FBQSxhQUFBLENBQWIsR0FBOEIsSUFBSSxDQUFDLFNBQUwsQ0FBZSxXQUFmLEVBRHJCO0lBQUEsQ0FqQlg7QUFBQSxJ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
//# sourceURL=/Users/frosas/projects/dotfiles/home/.atom/packages/recent-files/lib/recent-files.coffee