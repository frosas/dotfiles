(function() {
  var $, Point, Range, View, ViolationTooltip, ViolationView, _, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ = require('lodash');

  _ref = require('atom'), $ = _ref.$, View = _ref.View, Range = _ref.Range, Point = _ref.Point;

  ViolationTooltip = require('./violation-tooltip');

  module.exports = ViolationView = (function(_super) {
    __extends(ViolationView, _super);

    function ViolationView() {
      return ViolationView.__super__.constructor.apply(this, arguments);
    }

    ViolationView.content = function() {
      return this.div({
        "class": 'violation'
      }, (function(_this) {
        return function() {
          _this.div({
            "class": 'violation-arrow'
          });
          return _this.div({
            "class": 'violation-area'
          });
        };
      })(this));
    };

    ViolationView.prototype.initialize = function(violation, lintView) {
      this.violation = violation;
      this.lintView = lintView;
      this.lintView.append(this);
      this.editorView = this.lintView.editorView;
      this.editor = this.editorView.getEditor();
      this.initializeSubviews();
      this.initializeStates();
      this.prepareTooltip();
      this.trackEdit();
      this.trackCursor();
      this.showHighlight();
      return this.toggleTooltipWithCursorPosition();
    };

    ViolationView.prototype.initializeSubviews = function() {
      this.arrow = this.find('.violation-arrow');
      this.arrow.addClass("violation-" + this.violation.severity);
      this.area = this.find('.violation-area');
      return this.area.addClass("violation-" + this.violation.severity);
    };

    ViolationView.prototype.initializeStates = function() {
      var screenRange;
      screenRange = this.editor.screenRangeForBufferRange(this.violation.bufferRange);
      this.screenStartPosition = screenRange.start;
      this.screenEndPosition = screenRange.end;
      return this.isValid = true;
    };

    ViolationView.prototype.prepareTooltip = function() {
      var HTML;
      HTML = this.violation.getHTML();
      return this.tooltip({
        title: HTML || this.violation.message,
        html: HTML != null,
        container: this.lintView,
        selector: this.find('.violation-area')
      });
    };

    ViolationView.prototype.trackEdit = function() {
      var options;
      options = {
        invalidation: 'inside',
        persistent: false
      };
      this.marker = this.editor.markScreenRange(this.getCurrentScreenRange(), options);
      return this.marker.on('changed', (function(_this) {
        return function(event) {
          _this.screenStartPosition = event.newTailScreenPosition;
          _this.screenEndPosition = event.newHeadScreenPosition;
          _this.isValid = event.isValid;
          if (_this.isValid) {
            if (_this.isVisibleMarkerChange(event)) {
              return setImmediate(function() {
                _this.showHighlight();
                return _this.toggleTooltipWithCursorPosition();
              });
            } else {
              _this.hide();
              if (_this.scheduleDeferredShowHighlight == null) {
                _this.scheduleDeferredShowHighlight = _.debounce(_this.showHighlight, 500);
              }
              return _this.scheduleDeferredShowHighlight();
            }
          } else {
            _this.hideHighlight();
            return _this.tooltip('hide');
          }
        };
      })(this));
    };

    ViolationView.prototype.isVisibleMarkerChange = function(event) {
      var editorFirstVisibleRow, editorLastVisibleRow;
      editorFirstVisibleRow = this.editorView.getFirstVisibleScreenRow();
      editorLastVisibleRow = this.editorView.getLastVisibleScreenRow();
      return [event.oldTailScreenPosition, event.newTailScreenPosition].some(function(position) {
        var _ref1;
        return (editorFirstVisibleRow <= (_ref1 = position.row) && _ref1 <= editorLastVisibleRow);
      });
    };

    ViolationView.prototype.trackCursor = function() {
      return this.subscribe(this.editor.getCursor(), 'moved', (function(_this) {
        return function() {
          if (_this.isValid) {
            return _this.toggleTooltipWithCursorPosition();
          } else {
            return _this.tooltip('hide');
          }
        };
      })(this));
    };

    ViolationView.prototype.showHighlight = function() {
      this.updateHighlight();
      return this.show();
    };

    ViolationView.prototype.hideHighlight = function() {
      return this.hide();
    };

    ViolationView.prototype.updateHighlight = function() {
      var arrowSize, borderOffset, borderThickness, endPixelPosition, startPixelPosition, verticalOffset;
      startPixelPosition = this.editorView.pixelPositionForScreenPosition(this.screenStartPosition);
      endPixelPosition = this.editorView.pixelPositionForScreenPosition(this.screenEndPosition);
      arrowSize = this.editorView.charWidth / 2;
      verticalOffset = this.editorView.lineHeight + Math.floor(arrowSize / 4);
      this.css({
        'top': startPixelPosition.top,
        'left': startPixelPosition.left,
        'width': this.editorView.charWidth - (this.editorView.charWidth % 2),
        'height': verticalOffset
      });
      this.arrow.css({
        'border-right-width': arrowSize,
        'border-bottom-width': arrowSize,
        'border-left-width': arrowSize
      });
      borderThickness = 1;
      borderOffset = arrowSize / 2;
      this.area.css({
        'left': borderOffset,
        'width': endPixelPosition.left - startPixelPosition.left - borderOffset,
        'height': verticalOffset
      });
      if (this.screenEndPosition.column - this.screenStartPosition.column > 1) {
        return this.area.addClass("violation-border");
      } else {
        return this.area.removeClass("violation-border");
      }
    };

    ViolationView.prototype.toggleTooltipWithCursorPosition = function() {
      var cursorPosition;
      cursorPosition = this.editor.getCursor().getScreenPosition();
      if (cursorPosition.row === this.screenStartPosition.row && cursorPosition.column === this.screenStartPosition.column) {
        return this.tooltip('show');
      } else {
        return this.tooltip('hide');
      }
    };

    ViolationView.prototype.getCurrentBufferStartPosition = function() {
      return this.editor.bufferPositionForScreenPosition(this.screenStartPosition);
    };

    ViolationView.prototype.getCurrentScreenRange = function() {
      return new Range(this.screenStartPosition, this.screenEndPosition);
    };

    ViolationView.prototype.tooltip = function(option) {
      var violationView;
      violationView = this;
      return this.each(function() {
        var $this, data, options;
        $this = $(this);
        data = $this.data('bs.tooltip');
        options = typeof option === 'object' && option;
        options.violationView = violationView;
        if (!data) {
          $this.data('bs.tooltip', (data = new ViolationTooltip(this, options)));
        }
        if (typeof option === 'string') {
          return data[option]();
        }
      });
    };

    ViolationView.prototype.beforeRemove = function() {
      var _ref1;
      if ((_ref1 = this.marker) != null) {
        _ref1.destroy();
      }
      return this.tooltip('destroy');
    };

    return ViolationView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLCtEQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLFFBQVIsQ0FBSixDQUFBOztBQUFBLEVBQ0EsT0FBMEIsT0FBQSxDQUFRLE1BQVIsQ0FBMUIsRUFBQyxTQUFBLENBQUQsRUFBSSxZQUFBLElBQUosRUFBVSxhQUFBLEtBQVYsRUFBaUIsYUFBQSxLQURqQixDQUFBOztBQUFBLEVBRUEsZ0JBQUEsR0FBbUIsT0FBQSxDQUFRLHFCQUFSLENBRm5CLENBQUE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osb0NBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsYUFBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsUUFBQSxPQUFBLEVBQU8sV0FBUDtPQUFMLEVBQXlCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDdkIsVUFBQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxPQUFBLEVBQU8saUJBQVA7V0FBTCxDQUFBLENBQUE7aUJBQ0EsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFlBQUEsT0FBQSxFQUFPLGdCQUFQO1dBQUwsRUFGdUI7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF6QixFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLDRCQUtBLFVBQUEsR0FBWSxTQUFFLFNBQUYsRUFBYyxRQUFkLEdBQUE7QUFDVixNQURXLElBQUMsQ0FBQSxZQUFBLFNBQ1osQ0FBQTtBQUFBLE1BRHVCLElBQUMsQ0FBQSxXQUFBLFFBQ3hCLENBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxRQUFRLENBQUMsTUFBVixDQUFpQixJQUFqQixDQUFB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
//# sourceURL=/Users/frosas/projects/dotfiles/home/.atom/packages/atom-lint/lib/violation-view.coffee