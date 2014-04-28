(function() {
  var $$, GotoView, SelectListView, fs, path, utils, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  path = require('path');

  fs = require('fs');

  _ref = require('atom'), $$ = _ref.$$, SelectListView = _ref.SelectListView;

  utils = require('./symbol-utils');

  module.exports = GotoView = (function(_super) {
    __extends(GotoView, _super);

    function GotoView() {
      return GotoView.__super__.constructor.apply(this, arguments);
    }

    GotoView.prototype.initialize = function() {
      GotoView.__super__.initialize.apply(this, arguments);
      return this.addClass('goto-view overlay from-top');
    };

    GotoView.prototype.destroy = function() {
      this.cancel();
      return this.detach();
    };

    GotoView.prototype.attach = function() {
      this.storeFocusedElement();
      atom.workspaceView.appendToTop(this);
      return this.focusFilterEditor();
    };

    GotoView.prototype.populate = function(symbols) {
      this.setItems(symbols);
      return this.attach();
    };

    GotoView.prototype.getFilterKey = function() {
      return 'name';
    };

    GotoView.prototype.viewForItem = function(symbol) {
      return $$(function() {
        return this.li({
          "class": 'two-lines'
        }, (function(_this) {
          return function() {
            var dir, text;
            _this.div(symbol.name, {
              "class": 'primary-line'
            });
            dir = path.basename(symbol.path);
            text = "" + dir + " " + (symbol.position.row + 1);
            return _this.div(text, {
              "class": 'secondary-line'
            });
          };
        })(this));
      });
    };

    GotoView.prototype.getEmptyMessage = function(itemCount) {
      if (itemCount === 0) {
        return 'No symbols found';
      } else {
        return GotoView.__super__.getEmptyMessage.apply(this, arguments);
      }
    };

    GotoView.prototype.confirmed = function(symbol) {
      if (!fs.existsSync(atom.project.resolve(symbol.path))) {
        this.setError('Selected file does not exist');
        return setTimeout(((function(_this) {
          return function() {
            return _this.setError();
          };
        })(this)), 2000);
      } else {
        this.cancel();
        return utils.gotoSymbol(symbol);
      }
    };

    return GotoView;

  })(SelectListView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQ0E7QUFBQSxNQUFBLG1EQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FBUCxDQUFBOztBQUFBLEVBQ0EsRUFBQSxHQUFLLE9BQUEsQ0FBUSxJQUFSLENBREwsQ0FBQTs7QUFBQSxFQUVBLE9BQXVCLE9BQUEsQ0FBUSxNQUFSLENBQXZCLEVBQUMsVUFBQSxFQUFELEVBQUssc0JBQUEsY0FGTCxDQUFBOztBQUFBLEVBR0EsS0FBQSxHQUFRLE9BQUEsQ0FBUSxnQkFBUixDQUhSLENBQUE7O0FBQUEsRUFLQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBRUosK0JBQUEsQ0FBQTs7OztLQUFBOztBQUFBLHVCQUFBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDUixNQUFBLDBDQUFBLFNBQUEsQ0FBQSxDQUFBO2FBQ0EsSUFBQyxDQUFBLFFBQUQsQ0FBVSw0QkFBVixFQUZRO0lBQUEsQ0FBWixDQUFBOztBQUFBLHVCQUlBLE9BQUEsR0FBUyxTQUFBLEdBQUE7QUFDUCxNQUFBLElBQUMsQ0FBQSxNQUFELENBQUEsQ0FBQSxDQUFBO2FBQ0EsSUFBQyxDQUFBLE1BQUQsQ0FBQSxFQUZPO0lBQUEsQ0FKVCxDQUFBOztBQUFBLHVCQVFBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFDTixNQUFBLElBQUMsQ0FBQSxtQkFBRCxDQUFBLENBQUEsQ0FBQTtBQUFBLE1BQ0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFuQixDQUErQixJQUEvQixDQURBLENBQUE7YUFFQSxJQUFDLENBQUEsaUJBQUQsQ0FBQSxFQUhNO0lBQUEsQ0FSUixDQUFBOztBQUFBLHVCQWFBLFFBQUEsR0FBVSxTQUFDLE9BQUQsR0FBQTtBQUNSLE1BQUEsSUFBQyxDQUFBLFFBQUQsQ0FBVSxPQUFWLENBQUEsQ0FBQTthQUNBLElBQUMsQ0FBQSxNQUFELENBQUEsRUFGUTtJQUFBLENBYlYsQ0FBQTs7QUFBQSx1QkFpQkEsWUFBQSxHQUFjLFNBQUEsR0FBQTthQUFHLE9BQUg7SUFBQSxDQWpCZCxDQUFBOztBQUFBLHVCQW1CQSxXQUFBLEdBQWEsU0FBQyxNQUFELEdBQUE7YUFDWCxFQUFBLENBQUcsU0FBQSxHQUFBO2VBQ0QsSUFBQyxDQUFBLEVBQUQsQ0FBSTtBQUFBLFVBQUEsT0FBQSxFQUFPLFdBQVA7U0FBSixFQUF3QixDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEsR0FBQTtBQUN0QixnQkFBQSxTQUFBO0FBQUEsWUFBQSxLQUFDLENBQUEsR0FBRCxDQUFLLE1BQU0sQ0FBQyxJQUFaLEVBQWtCO0FBQUEsY0FBQSxPQUFBLEVBQU8sY0FBUDthQUFsQixDQUFBLENBQUE7QUFBQSxZQUNBLEdBQUEsR0FBTSxJQUFJLENBQUMsUUFBTCxDQUFjLE1BQU0sQ0FBQyxJQUFyQixDQUROLENBQUE7QUFBQSxZQUVBLElBQUEsR0FBTyxFQUFBLEdBQUUsR0FBRixHQUFPLEdBQVAsR0FBUyxDQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBaEIsR0FBc0IsQ0FBdEIsQ0FGaEIsQ0FBQTttQkFHQSxLQUFDLENBQUEsR0FBRCxDQUFLLElBQUwsRUFBVztBQUFBLGNBQUEsT0FBQSxFQUFPLGdCQUFQO2FBQVgsRUFKc0I7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF4QixFQURDO01BQUEsQ0FBSCxFQURXO0lBQUEsQ0FuQmIsQ0FBQTs7QUFBQSx1QkEyQkEsZUFBQSxHQUFpQixTQUFDLFNBQUQsR0FBQTtBQUNmLE1BQUEsSUFBRyxTQUFBLEtBQWEsQ0FBaEI7ZUFDRSxtQkFERjtPQUFBLE1BQUE7ZUFHRSwrQ0FBQSxTQUFBLEVBSEY7T0FEZTtJQUFBLENBM0JqQixDQUFBOztBQUFBLHVCQWlDQSxTQUFBLEdBQVcsU0FBQyxNQUFELEdBQUE7QUFDVCxNQUFBLElBQUcsQ0FBQSxFQUFNLENBQUMsVUFBSCxDQUFjLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBYixDQUFxQixNQUFNLENBQUMsSUFBNUIsQ0FBZCxDQUFQO0FBQ0UsUUFBQSxJQUFDLENBQUEsUUFBRCxDQUFVLDhCQUFWLENBQUEsQ0FBQTtlQUNBLFVBQUEsQ0FBVyxDQUFDLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQSxHQUFBO21CQUFHLEtBQUMsQ0FBQSxRQUFELENBQUEsRUFBSDtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQUQsQ0FBWCxFQUE2QixJQUE3QixFQUZGO09BQUEsTUFBQTtBQUlFLFFBQUEsSUFBQyxDQUFBLE1BQUQsQ0FBQSxDQUFBLENBQUE7ZUFDQSxLQUFLLENBQUMsVUFBTixDQUFpQixNQUFqQixFQUxGO09BRFM7SUFBQSxDQWpDWCxDQUFBOztvQkFBQTs7S0FGcUIsZUFOdkIsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/frosas/projects/dotfiles/home/.atom/packages/goto/lib/goto-view.coffee