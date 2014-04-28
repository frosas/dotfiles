(function() {
  var $, Color, Tooltip, ViolationTooltip,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $ = require('atom').$;

  Color = require('color');

  window.jQuery = $;

  require('../vendor/bootstrap/js/tooltip');

  Tooltip = $.fn.tooltip.Constructor;

  module.exports = ViolationTooltip = (function(_super) {
    __extends(ViolationTooltip, _super);

    function ViolationTooltip() {
      return ViolationTooltip.__super__.constructor.apply(this, arguments);
    }

    ViolationTooltip.DEFAULTS = $.extend({}, Tooltip.DEFAULTS, {
      placement: 'bottom-right auto'
    });

    ViolationTooltip.prototype.getDefaults = function() {
      return ViolationTooltip.DEFAULTS;
    };

    ViolationTooltip.prototype.show = function() {
      
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return
      var that = this;

      var $tip = this.tip()

      this.setContent()

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'bottom-right'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)

      if (this.options.container) {
        $tip.appendTo(this.options.container)
      } else {
        $tip.insertAfter(this.$element)
      }

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        placement = this.autoPlace(orgPlacement, actualWidth, actualHeight)
        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)
      this.hoverState = null

      var complete = function() {
        that.$element.trigger('shown.bs.' + that.type)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one($.support.transition.end, complete)
          .emulateTransitionEnd(150) :
        complete()
    }
    ;
      return this.applyAdditionalStyle();
    };

    ViolationTooltip.prototype.autoPlace = function(orgPlacement, actualWidth, actualHeight) {
      var $editor, editorHeight, editorLeft, editorWidth, placement, pos;
      $editor = this.getEditorUnderLayer();
      editorWidth = $editor.outerWidth();
      editorHeight = $editor.outerHeight();
      editorLeft = $editor.offset().left;
      pos = this.getLogicalPosition();
      placement = orgPlacement.split('-');
      if (placement[0] === 'bottom' && (pos.top + pos.height + actualHeight > editorHeight)) {
        placement[0] = 'top';
      } else if (placement[0] === 'top' && (pos.top - actualHeight < 0)) {
        placement[0] = 'bottom';
      }
      if (placement[1] === 'right' && (pos.right + actualWidth > editorWidth)) {
        placement[1] = 'left';
      } else if (placement[1] === 'left' && (pos.left - actualWidth < editorLeft)) {
        placement[1] = 'right';
      }
      return placement.join('-');
    };

    ViolationTooltip.prototype.applyPlacement = function(offset, placement) {
      
    var replace
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      replace = true
      offset.top = offset.top + height - actualHeight
    }

    if (/bottom|top/.test(placement)) {
      var delta = 0

      if (offset.left < 0) {
        delta       = offset.left * -2
        offset.left = 0

        $tip.offset(offset)

        actualWidth  = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight
      }

      this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
    } else {
      this.replaceArrow(actualHeight - height, actualHeight, 'top')
    }

    if (replace) $tip.offset(offset)
    ;
    };

    ViolationTooltip.prototype.setContent = function() {
      var $tip, title;
      $tip = this.tip();
      title = this.getTitle();
      $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title);
      return $tip.removeClass('fade in top-left top-right bottom-left bottom-right');
    };

    ViolationTooltip.prototype.getLogicalPosition = function() {
      var el, position;
      el = this.$element[0];
      position = this.$element.position();
      position.width = el.offsetWidth;
      position.height = el.offsetHeight;
      position.right = position.left + position.width;
      position.bottom = position.top + position.height;
      return position;
    };

    ViolationTooltip.prototype.getCalculatedOffset = function(placement, pos, actualWidth, actualHeight) {
      switch (placement) {
        case 'bottom-right':
          return {
            top: pos.top + pos.height,
            left: pos.left + pos.width / 2
          };
        case 'top-right':
          return {
            top: pos.top - actualHeight,
            left: pos.left + pos.width / 2
          };
        case 'bottom-left':
          return {
            top: pos.top + pos.height,
            left: pos.left + pos.width / 2 - actualWidth
          };
        case 'top-left':
          return {
            top: pos.top - actualHeight,
            left: pos.left + pos.width / 2 - actualWidth
          };
      }
    };

    ViolationTooltip.prototype.applyAdditionalStyle = function() {
      var $code, $tip, editorBackgroundColor, frontColor, shadow;
      $tip = this.tip();
      editorBackgroundColor = Color(this.getEditorView().css('background-color'));
      shadow = "0 0 3px " + (editorBackgroundColor.clearer(0.1).rgbaString());
      $tip.find('.tooltip-inner').css('box-shadow', shadow);
      $code = $tip.find('.tooltip-inner code, pre');
      if ($code.length > 0) {
        frontColor = Color($tip.find('.tooltip-inner').css('color'));
        $code.css('color', frontColor.clone().rgbaString());
        $code.css('background-color', frontColor.clone().clearer(0.96).rgbaString());
        return $code.css('border-color', frontColor.clone().clearer(0.86).rgbaString());
      }
    };

    ViolationTooltip.prototype.getEditorUnderLayer = function() {
      return this.editorUnderlayer != null ? this.editorUnderlayer : this.editorUnderlayer = this.getEditorView().find('.underlayer');
    };

    ViolationTooltip.prototype.getEditorView = function() {
      return this.getViolationView().lintView.editorView;
    };

    ViolationTooltip.prototype.getViolationView = function() {
      return this.options.violationView;
    };

    return ViolationTooltip;

  })(Tooltip);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1DQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxJQUFLLE9BQUEsQ0FBUSxNQUFSLEVBQUwsQ0FBRCxDQUFBOztBQUFBLEVBQ0EsS0FBQSxHQUFRLE9BQUEsQ0FBUSxPQUFSLENBRFIsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxNQUFQLEdBQWdCLENBRmhCLENBQUE7O0FBQUEsRUFHQSxPQUFBLENBQVEsZ0NBQVIsQ0FIQSxDQUFBOztBQUFBLEVBSUEsT0FBQSxHQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFdBSnZCLENBQUE7O0FBQUEsRUFNQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osdUNBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsZ0JBQUMsQ0FBQSxRQUFELEdBQVksQ0FBQyxDQUFDLE1BQUYsQ0FBUyxFQUFULEVBQWEsT0FBTyxDQUFDLFFBQXJCLEVBQStCO0FBQUEsTUFBRSxTQUFBLEVBQVcsbUJBQWI7S0FBL0IsQ0FBWixDQUFBOztBQUFBLCtCQUVBLFdBQUEsR0FBYSxTQUFBLEdBQUE7YUFDWCxnQkFBZ0IsQ0FBQyxTQUROO0lBQUEsQ0FGYixDQUFBOztBQUFBLCtCQUtBLElBQUEsR0FBTSxTQUFBLEdBQUE7QUFDSixNQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsQ0FBQTthQWlFQSxJQUFDLENBQUEsb0JBQUQsQ0FBQSxFQWxFSTtJQUFBLENBTE4sQ0FBQTs7QUFBQSwrQkF5RUEsU0FBQSxHQUFXLFNBQUMsWUFBRCxFQUFlLFdBQWYsRUFBNEIsWUFBNUIsR0FBQTtBQUNULFVBQUEsOERBQUE7QUFBQSxNQUFBLE9BQUEsR0FBVSxJQUFDLENBQUEsbUJBQUQsQ0FB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
//# sourceURL=/Users/frosas/projects/dotfiles/home/.atom/packages/atom-lint/lib/violation-tooltip.coffee