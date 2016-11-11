Object.defineProperty(exports, '__esModule', {
  value: true
});

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

/* eslint-env browser */

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _atom = require('atom');

var _reactForAtom = require('react-for-atom');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

/**
 * We need to create this custom HTML element so we can hook into the view
 * registry. The overlay decoration only works through the view registry.
 */
'use babel';

var SuggestionListElement = (function (_HTMLElement) {
  _inherits(SuggestionListElement, _HTMLElement);

  function SuggestionListElement() {
    _classCallCheck(this, SuggestionListElement);

    _get(Object.getPrototypeOf(SuggestionListElement.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(SuggestionListElement, [{
    key: 'initialize',
    value: function initialize(model) {
      this._model = model;
      return this;
    }

    // $FlowIssue -- readonly props: t10620219
  }, {
    key: 'attachedCallback',
    value: function attachedCallback() {
      _reactForAtom.ReactDOM.render(_reactForAtom.React.createElement(SuggestionList, { suggestionList: this._model }), this);
    }

    // $FlowIssue -- readonly props: t10620219
  }, {
    key: 'detachedCallback',
    value: function detachedCallback() {
      _reactForAtom.ReactDOM.unmountComponentAtNode(this);
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    }
  }]);

  return SuggestionListElement;
})(HTMLElement);

var SuggestionList = (function (_React$Component) {
  _inherits(SuggestionList, _React$Component);

  function SuggestionList(props) {
    _classCallCheck(this, SuggestionList);

    _get(Object.getPrototypeOf(SuggestionList.prototype), 'constructor', this).call(this, props);
    this.state = {
      selectedIndex: 0
    };
    this._subscriptions = new _atom.CompositeDisposable();
    this._boundConfirm = this._confirm.bind(this);
  }

  _createClass(SuggestionList, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var suggestionList = this.props.suggestionList;

      var suggestion = suggestionList.getSuggestion();
      (0, _assert2['default'])(suggestion);
      // TODO(nmote): This is assuming `suggestion.callback` is always an Array, which is not true
      //   according to hyperclick/lib/types. It can also be a function.
      this._items = suggestion.callback;
      this._textEditor = suggestionList.getTextEditor();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this = this;

      var textEditor = this._textEditor;
      (0, _assert2['default'])(textEditor);
      var textEditorView = atom.views.getView(textEditor);
      var boundClose = this._close.bind(this);
      this._subscriptions.add(atom.commands.add(textEditorView, {
        'core:move-up': this._moveSelectionUp.bind(this),
        'core:move-down': this._moveSelectionDown.bind(this),
        'core:move-to-top': this._moveSelectionToTop.bind(this),
        'core:move-to-bottom': this._moveSelectionToBottom.bind(this),
        'core:cancel': boundClose,
        'editor:newline': this._boundConfirm
      }));

      this._subscriptions.add(textEditor.onDidChange(boundClose));
      this._subscriptions.add(textEditor.onDidChangeCursorPosition(boundClose));

      // Prevent scrolling the editor when scrolling the suggestion list.
      var stopPropagation = function stopPropagation(event) {
        return event.stopPropagation();
      };
      _reactForAtom.ReactDOM.findDOMNode(this.refs.scroller).addEventListener('mousewheel', stopPropagation);
      this._subscriptions.add(new _atom.Disposable(function () {
        _reactForAtom.ReactDOM.findDOMNode(_this.refs.scroller).removeEventListener('mousewheel', stopPropagation);
      }));

      var keydown = function keydown(event) {
        // If the user presses the enter key, confirm the selection.
        if (event.keyCode === 13) {
          event.stopImmediatePropagation();
          _this._confirm();
        }
      };
      textEditorView.addEventListener('keydown', keydown);
      this._subscriptions.add(new _atom.Disposable(function () {
        textEditorView.removeEventListener('keydown', keydown);
      }));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var itemComponents = this._items.map(function (item, index) {
        var className = 'hyperclick-result-item';
        if (index === _this2.state.selectedIndex) {
          className += ' selected';
        }
        return _reactForAtom.React.createElement(
          'li',
          { className: className,
            key: index,
            onMouseDown: _this2._boundConfirm,
            onMouseEnter: _this2._setSelectedIndex.bind(_this2, index) },
          item.title,
          _reactForAtom.React.createElement(
            'span',
            { className: 'right-label' },
            item.rightLabel
          )
        );
      });

      return _reactForAtom.React.createElement(
        'div',
        { className: 'popover-list select-list hyperclick-suggestion-list-scroller', ref: 'scroller' },
        _reactForAtom.React.createElement(
          'ol',
          { className: 'list-group', ref: 'selectionList' },
          itemComponents
        )
      );
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.selectedIndex !== this.state.selectedIndex) {
        this._updateScrollPosition();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._subscriptions.dispose();
    }
  }, {
    key: '_confirm',
    value: function _confirm() {
      this._items[this.state.selectedIndex].callback();
      this._close();
    }
  }, {
    key: '_close',
    value: function _close() {
      this.props.suggestionList.hide();
    }
  }, {
    key: '_setSelectedIndex',
    value: function _setSelectedIndex(index) {
      this.setState({
        selectedIndex: index
      });
    }
  }, {
    key: '_moveSelectionDown',
    value: function _moveSelectionDown(event) {
      if (this.state.selectedIndex < this._items.length - 1) {
        this.setState({ selectedIndex: this.state.selectedIndex + 1 });
      } else {
        this._moveSelectionToTop();
      }
      if (event) {
        event.stopImmediatePropagation();
      }
    }
  }, {
    key: '_moveSelectionUp',
    value: function _moveSelectionUp(event) {
      if (this.state.selectedIndex > 0) {
        this.setState({ selectedIndex: this.state.selectedIndex - 1 });
      } else {
        this._moveSelectionToBottom();
      }
      if (event) {
        event.stopImmediatePropagation();
      }
    }
  }, {
    key: '_moveSelectionToBottom',
    value: function _moveSelectionToBottom(event) {
      this.setState({ selectedIndex: Math.max(this._items.length - 1, 0) });
      if (event) {
        event.stopImmediatePropagation();
      }
    }
  }, {
    key: '_moveSelectionToTop',
    value: function _moveSelectionToTop(event) {
      this.setState({ selectedIndex: 0 });
      if (event) {
        event.stopImmediatePropagation();
      }
    }
  }, {
    key: '_updateScrollPosition',
    value: function _updateScrollPosition() {
      var listNode = _reactForAtom.ReactDOM.findDOMNode(this.refs.selectionList);
      var selectedNode = listNode.getElementsByClassName('selected')[0];
      selectedNode.scrollIntoViewIfNeeded(false);
    }
  }]);

  return SuggestionList;
})(_reactForAtom.React.Component);

exports['default'] = document.registerElement('hyperclick-suggestion-list', {
  prototype: SuggestionListElement.prototype
});
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hc3VhcmV6L0Rvd25sb2Fkcy9oeXBlcmNsaWNrL2xpYi9TdWdnZXN0aW9uTGlzdEVsZW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQWU4QyxNQUFNOzs0QkFDdEIsZ0JBQWdCOztzQkFDeEIsUUFBUTs7Ozs7Ozs7QUFqQjlCLFdBQVcsQ0FBQzs7SUF1Qk4scUJBQXFCO1lBQXJCLHFCQUFxQjs7V0FBckIscUJBQXFCOzBCQUFyQixxQkFBcUI7OytCQUFyQixxQkFBcUI7OztlQUFyQixxQkFBcUI7O1dBR2Ysb0JBQUMsS0FBeUIsRUFBRTtBQUNwQyxVQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztBQUNwQixhQUFPLElBQUksQ0FBQztLQUNiOzs7OztXQUdlLDRCQUFVO0FBQ3hCLDZCQUFTLE1BQU0sQ0FBQyxrQ0FBQyxjQUFjLElBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxNQUFNLEFBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ3hFOzs7OztXQUdlLDRCQUFVO0FBQ3hCLDZCQUFTLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3ZDOzs7V0FFTSxtQkFBRztBQUNSLFVBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtBQUNuQixZQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztPQUNuQztLQUNGOzs7U0F0QkcscUJBQXFCO0dBQVMsV0FBVzs7SUFpQ3pDLGNBQWM7WUFBZCxjQUFjOztBQVNQLFdBVFAsY0FBYyxDQVNOLEtBQVksRUFBRTswQkFUdEIsY0FBYzs7QUFVaEIsK0JBVkUsY0FBYyw2Q0FVVixLQUFLLEVBQUU7QUFDYixRQUFJLENBQUMsS0FBSyxHQUFHO0FBQ1gsbUJBQWEsRUFBRSxDQUFDO0tBQ2pCLENBQUM7QUFDRixRQUFJLENBQUMsY0FBYyxHQUFHLCtCQUF5QixDQUFDO0FBQ2hELFFBQUksQ0FBQyxhQUFhLEdBQUcsSUFB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QztLQUNGOzs7V0FFa0IsNkJBQUMsS0FBSyxFQUFFO0FBQ3pCLFVBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxhQUFhLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztBQUNsQyxVQUFJLEtBQUssRUFBRTtBQUNULGFBQUssQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO09BQ2xDO0tBQ0Y7OztXQUVvQixpQ0FBRztBQUN0QixVQUFNLFFBQVEsR0FBRyx1QkFBUyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUMvRCxVQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEUsa0JBQVksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM1Qzs7O1NBL0pHLGNBQWM7R0FBUyxvQkFBTSxTQUFTOztxQkFrSzdCLFFBQVEsQ0FBQyxlQUFlLENBQUMsNEJBQTRCLEVBQUU7QUFDcEUsV0FBUyxFQUFFLHFCQUFxQixDQUFDLFNBQVM7Q0FDM0MsQ0FBQyIsImZpbGUiOiIvVXNlcnMvYXN1YXJlei9Eb3dubG9hZHMvaHlwZXJjbGljay9saWIvU3VnZ2VzdGlvbkxpc3RFbGVtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG4vKiBAZmxvdyAqL1xuXG4vKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIGxpY2Vuc2UgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpblxuICogdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuLyogZXNsaW50LWVudiBicm93c2VyICovXG5cbmltcG9ydCB0eXBlIFN1Z2dlc3Rpb25MaXN0VHlwZSBmcm9tICcuL1N1Z2dlc3Rpb25MaXN0JztcblxuaW1wb3J0IHtDb21wb3NpdGVEaXNwb3NhYmxlLCBEaXNwb3NhYmxlfSBmcm9tICdhdG9tJztcbmltcG9ydCB7UmVhY3QsIFJlYWN0RE9NfSBmcm9tICdyZWFjdC1mb3ItYXRvbSc7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ2Fzc2VydCc7XG5cbi8qKlxuICogV2UgbmVlZCB0byBjcmVhdGUgdGhpcyBjdXN0b20gSFRNTCBlbGVtZW50IHNvIHdlIGNhbiBob29rIGludG8gdGhlIHZpZXdcbiAqIHJlZ2lzdHJ5LiBUaGUgb3ZlcmxheSBkZWNvcmF0aW9uIG9ubHkgd29ya3MgdGhyb3VnaCB0aGUgdmlldyByZWdpc3RyeS5cbiAqL1xuY2xhc3MgU3VnZ2VzdGlvbkxpc3RFbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBfbW9kZWw6IFN1Z2dlc3Rpb25MaXN0VHlwZTtcblxuICBpbml0aWFsaXplKG1vZGVsOiBTdWdnZXN0aW9uTGlzdFR5cGUpIHtcbiAgICB0aGlzLl9tb2RlbCA9IG1vZGVsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gJEZsb3dJc3N1ZSAtLSByZWFkb25seSBwcm9wczogdDEwNjIwMjE5XG4gIGF0dGFjaGVkQ2FsbGJhY2soKTogbWl4ZWQge1xuICAgIFJlYWN0RE9NLnJlbmRlcig8U3VnZ2VzdGlvbkxpc3Qgc3VnZ2VzdGlvbkxpc3Q9e3RoaXMuX21vZGVsfSAvPiwgdGhpcyk7XG4gIH1cblxuICAvLyAkRmxvd0lzc3VlIC0tIHJlYWRvbmx5IHByb3BzOiB0MTA2MjAyMTlcbiAgZGV0YWNoZWRDYWxsYmFjaygpOiBtaXhlZCB7XG4gICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzKTtcbiAgfVxuXG4gIGRpc3Bvc2UoKSB7XG4gICAgaWYgKHRoaXMucGFyZW50Tm9kZSkge1xuICAgICAgdGhpcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgIH1cbiAgfVxufVxuXG50eXBlIFByb3BzID0ge1xuICBzdWdnZXN0aW9uTGlzdDogU3VnZ2VzdGlvbkxpc3RUeXBlLFxufTtcblxudHlwZSBTdGF0ZSA9IHtcbiAgc2VsZWN0ZWRJbmRleDogbnVtYmVyLFxufTtcblxuY2xhc3MgU3VnZ2VzdGlvbkxpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBwcm9wczogUHJvcHM7XG4gIHN0YXRlOiBTdGF0ZTtcblxuICBfaXRlbXM6IEFycmF5PHtyaWdodExhYmVsPzogc3RyaW5nLCB0aXRsZTogc3RyaW5nLCBjYWxsYmFjazogKCkgPT4gbWl4ZWR9PjtcbiAgX3RleHRFZGl0b3I6ID9hdG9tJFRleHRFZGl0b3I7XG4gIF9zdWJzY3JpcHRpb25zOiBhdG9tJENvbXBvc2l0ZURpc3Bvc2FibGU7XG4gIF9ib3VuZENvbmZpcm06ICgpID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IocHJvcHM6IFByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzZWxlY3RlZEluZGV4OiAwLFxuICAgIH07XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gICAgdGhpcy5fYm91bmRDb25maXJtID0gdGhpcy5fY29uZmlybS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIGNvbnN0IHtzdWdnZXN0aW9uTGlzdH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHN1Z2dlc3Rpb24gPSBzdWdnZXN0aW9uTGlzdC5nZXRTdWdnZXN0aW9uKCk7XG4gICAgaW52YXJpYW50KHN1Z2dlc3Rpb24pO1xuICAgIC8vIFRPRE8obm1vdGUpOiBUaGlzIGlzIGFzc3VtaW5nIGBzdWdnZXN0aW9uLmNhbGxiYWNrYCBpcyBhbHdheXMgYW4gQXJyYXksIHdoaWNoIGlzIG5vdCB0cnVlXG4gICAgLy8gICBhY2NvcmRpbmcgdG8gaHlwZXJjbGljay9saWIvdHlwZXMuIEl0IGNhbiBhbHNvIGJlIGEgZnVuY3Rpb24uXG4gICAgdGhpcy5faXRlbXMgPSAoKHN1Z2dlc3Rpb24uY2FsbGJhY2s6IGFueSk6XG4gICAgICAgIEFycmF5PHtyaWdodExhYmVsPzogc3RyaW5nLCB0aXRsZTogc3RyaW5nLCBjYWxsYmFjazogKCkgPT4gbWl4ZWR9Pik7XG4gICAgdGhpcy5fdGV4dEVkaXRvciA9IHN1Z2dlc3Rpb25MaXN0LmdldFRleHRFZGl0b3IoKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHRleHRFZGl0b3IgPSB0aGlzLl90ZXh0RWRpdG9yO1xuICAgIGludmFyaWFudCh0ZXh0RWRpdG9yKTtcbiAgICBjb25zdCB0ZXh0RWRpdG9yVmlldyA9IGF0b20udmlld3MuZ2V0Vmlldyh0ZXh0RWRpdG9yKTtcbiAgICBjb25zdCBib3VuZENsb3NlID0gdGhpcy5fY2xvc2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgICAgYXRvbS5jb21tYW5kcy5hZGQodGV4dEVkaXRvclZpZXcsIHtcbiAgICAgICAgICAnY29yZTptb3ZlLXVwJzogdGhpcy5fbW92ZVNlbGVjdGlvblVwLmJpbmQodGhpcyksXG4gICAgICAgICAgJ2NvcmU6bW92ZS1kb3duJzogdGhpcy5fbW92ZVNlbGVjdGlvbkRvd24uYmluZCh0aGlzKSxcbiAgICAgICAgICAnY29yZTptb3ZlLXRvLXRvcCc6IHRoaXMuX21vdmVTZWxlY3Rpb25Ub1RvcC5iaW5kKHRoaXMpLFxuICAgICAgICAgICdjb3JlOm1vdmUtdG8tYm90dG9tJzogdGhpcy5fbW92ZVNlbGVjdGlvblRvQm90dG9tLmJpbmQodGhpcyksXG4gICAgICAgICAgJ2NvcmU6Y2FuY2VsJzogYm91bmRDbG9zZSxcbiAgICAgICAgICAnZWRpdG9yOm5ld2xpbmUnOiB0aGlzLl9ib3VuZENvbmZpcm0sXG4gICAgICAgIH0pKTtcblxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuYWRkKHRleHRFZGl0b3Iub25EaWRDaGFuZ2UoYm91bmRDbG9zZSkpO1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuYWRkKHRleHRFZGl0b3Iub25EaWRDaGFuZ2VDdXJzb3JQb3NpdGlvbihib3VuZENsb3NlKSk7XG5cbiAgICAvLyBQcmV2ZW50IHNjcm9sbGluZyB0aGUgZWRpdG9yIHdoZW4gc2Nyb2xsaW5nIHRoZSBzdWdnZXN0aW9uIGxpc3QuXG4gICAgY29uc3Qgc3RvcFByb3BhZ2F0aW9uID0gZXZlbnQgPT4gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLnNjcm9sbGVyKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXdoZWVsJywgc3RvcFByb3BhZ2F0aW9uKTtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmFkZChuZXcgRGlzcG9zYWJsZSgoKSA9PiB7XG4gICAgICBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuc2Nyb2xsZXIpXG4gICAgICAgIC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXdoZWVsJywgc3RvcFByb3BhZ2F0aW9uKTtcbiAgICB9KSk7XG5cbiAgICBjb25zdCBrZXlkb3duID0gKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAvLyBJZiB0aGUgdXNlciBwcmVzc2VzIHRoZSBlbnRlciBrZXksIGNvbmZpcm0gdGhlIHNlbGVjdGlvbi5cbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMykge1xuICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdGhpcy5fY29uZmlybSgpO1xuICAgICAgfVxuICAgIH07XG4gICAgdGV4dEVkaXRvclZpZXcuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleWRvd24pO1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuYWRkKG5ldyBEaXNwb3NhYmxlKCgpID0+IHtcbiAgICAgIHRleHRFZGl0b3JWaWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlkb3duKTtcbiAgICB9KSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgaXRlbUNvbXBvbmVudHMgPSB0aGlzLl9pdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICBsZXQgY2xhc3NOYW1lID0gJ2h5cGVyY2xpY2stcmVzdWx0LWl0ZW0nO1xuICAgICAgaWYgKGluZGV4ID09PSB0aGlzLnN0YXRlLnNlbGVjdGVkSW5kZXgpIHtcbiAgICAgICAgY2xhc3NOYW1lICs9ICcgc2VsZWN0ZWQnO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGxpIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgIG9uTW91c2VEb3duPXt0aGlzLl9ib3VuZENvbmZpcm19XG4gICAgICAgICAgICBvbk1vdXNlRW50ZXI9e3RoaXMuX3NldFNlbGVjdGVkSW5kZXguYmluZCh0aGlzLCBpbmRleCl9PlxuICAgICAgICAgICAge2l0ZW0udGl0bGV9XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyaWdodC1sYWJlbFwiPntpdGVtLnJpZ2h0TGFiZWx9PC9zcGFuPlxuICAgICAgICA8L2xpPlxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvcG92ZXItbGlzdCBzZWxlY3QtbGlzdCBoeXBlcmNsaWNrLXN1Z2dlc3Rpb24tbGlzdC1zY3JvbGxlclwiIHJlZj1cInNjcm9sbGVyXCI+XG4gICAgICAgIDxvbCBjbGFzc05hbWU9XCJsaXN0LWdyb3VwXCIgcmVmPVwic2VsZWN0aW9uTGlzdFwiPlxuICAgICAgICAgIHtpdGVtQ29tcG9uZW50c31cbiAgICAgICAgPC9vbD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzOiBPYmplY3QsIHByZXZTdGF0ZTogT2JqZWN0KSB7XG4gICAgaWYgKHByZXZTdGF0ZS5zZWxlY3RlZEluZGV4ICE9PSB0aGlzLnN0YXRlLnNlbGVjdGVkSW5kZXgpIHtcbiAgICAgIHRoaXMuX3VwZGF0ZVNjcm9sbFBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5kaXNwb3NlKCk7XG4gIH1cblxuICBfY29uZmlybSgpIHtcbiAgICB0aGlzLl9pdGVtc1t0aGlzLnN0YXRlLnNlbGVjdGVkSW5kZXhdLmNhbGxiYWNrKCk7XG4gICAgdGhpcy5fY2xvc2UoKTtcbiAgfVxuXG4gIF9jbG9zZSgpIHtcbiAgICB0aGlzLnByb3BzLnN1Z2dlc3Rpb25MaXN0LmhpZGUoKTtcbiAgfVxuXG4gIF9zZXRTZWxlY3RlZEluZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkSW5kZXg6IGluZGV4LFxuICAgIH0pO1xuICB9XG5cbiAgX21vdmVTZWxlY3Rpb25Eb3duKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWRJbmRleCA8IHRoaXMuX2l0ZW1zLmxlbmd0aCAtIDEpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkSW5kZXg6IHRoaXMuc3RhdGUuc2VsZWN0ZWRJbmRleCArIDF9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbW92ZVNlbGVjdGlvblRvVG9wKCk7XG4gICAgfVxuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgX21vdmVTZWxlY3Rpb25VcChldmVudCkge1xuICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGVkSW5kZXggPiAwKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZEluZGV4OiB0aGlzLnN0YXRlLnNlbGVjdGVkSW5kZXggLSAxfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX21vdmVTZWxlY3Rpb25Ub0JvdHRvbSgpO1xuICAgIH1cbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIF9tb3ZlU2VsZWN0aW9uVG9Cb3R0b20oZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZEluZGV4OiBNYXRoLm1heCh0aGlzLl9pdGVtcy5sZW5ndGggLSAxLCAwKX0pO1xuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgX21vdmVTZWxlY3Rpb25Ub1RvcChldmVudCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkSW5kZXg6IDB9KTtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIF91cGRhdGVTY3JvbGxQb3NpdGlvbigpIHtcbiAgICBjb25zdCBsaXN0Tm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5zZWxlY3Rpb25MaXN0KTtcbiAgICBjb25zdCBzZWxlY3RlZE5vZGUgPSBsaXN0Tm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzZWxlY3RlZCcpWzBdO1xuICAgIHNlbGVjdGVkTm9kZS5zY3JvbGxJbnRvVmlld0lmTmVlZGVkKGZhbHNlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBkb2N1bWVudC5yZWdpc3RlckVsZW1lbnQoJ2h5cGVyY2xpY2stc3VnZ2VzdGlvbi1saXN0Jywge1xuICBwcm90b3R5cGU6IFN1Z2dlc3Rpb25MaXN0RWxlbWVudC5wcm90b3R5cGUsXG59KTtcbiJdfQ==