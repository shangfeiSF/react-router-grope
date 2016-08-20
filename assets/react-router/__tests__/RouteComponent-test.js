'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _createMemoryHistory = require('../createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _Router = require('../Router');

var _Router2 = _interopRequireDefault(_Router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

describe('a Route Component', function () {

  var node = void 0;
  beforeEach(function () {
    node = document.createElement('div');
  });

  afterEach(function () {
    (0, _reactDom.unmountComponentAtNode)(node);
  });

  it('injects the right props', function (done) {
    var Parent = function (_Component) {
      _inherits(Parent, _Component);

      function Parent() {
        _classCallCheck(this, Parent);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
      }

      Parent.prototype.componentDidMount = function componentDidMount() {
        (0, _expect2.default)(this.props.route).toEqual(parent);
        (0, _expect2.default)(this.props.routes).toEqual([parent, child]);
      };

      Parent.prototype.render = function render() {
        return null;
      };

      return Parent;
    }(_react.Component);

    var Child = function (_Component2) {
      _inherits(Child, _Component2);

      function Child() {
        _classCallCheck(this, Child);

        return _possibleConstructorReturn(this, _Component2.apply(this, arguments));
      }

      Child.prototype.render = function render() {
        return null;
      };

      return Child;
    }(_react.Component);

    var child = { path: 'child', component: Child };
    var parent = { path: '/', component: Parent, childRoutes: [child] };

    (0, _reactDom.render)(_react2.default.createElement(_Router2.default, { history: (0, _createMemoryHistory2.default)('/child'), routes: parent }), node, done);
  });
});