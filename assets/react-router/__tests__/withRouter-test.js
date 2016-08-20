'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _createMemoryHistory = require('../createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _Route = require('../Route');

var _Route2 = _interopRequireDefault(_Route);

var _Router = require('../Router');

var _Router2 = _interopRequireDefault(_Router);

var _PropTypes = require('../PropTypes');

var _PropTypes2 = _interopRequireDefault(_PropTypes);

var _withRouter = require('../withRouter');

var _withRouter2 = _interopRequireDefault(_withRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

describe('withRouter', function () {
  var App = function (_Component) {
    _inherits(App, _Component);

    function App() {
      _classCallCheck(this, App);

      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    App.prototype.render = function render() {
      (0, _expect2.default)(this.props.router).toExist();
      return _react2.default.createElement(
        'h1',
        null,
        'App'
      );
    };

    return App;
  }(_react.Component);

  var node = void 0;
  beforeEach(function () {
    node = document.createElement('div');
  });

  afterEach(function () {
    (0, _reactDom.unmountComponentAtNode)(node);
  });

  it('puts router on context', function (done) {
    var WrappedApp = (0, _withRouter2.default)(App);

    (0, _reactDom.render)(_react2.default.createElement(
      _Router2.default,
      { history: (0, _createMemoryHistory2.default)('/') },
      _react2.default.createElement(_Route2.default, { path: '/', component: WrappedApp })
    ), node, function () {
      done();
    });
  });
});