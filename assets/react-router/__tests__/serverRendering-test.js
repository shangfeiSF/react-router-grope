'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _createMemoryHistory = require('../createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _Link = require('../Link');

var _Link2 = _interopRequireDefault(_Link);

var _match = require('../match');

var _match2 = _interopRequireDefault(_match);

var _Router = require('../Router');

var _Router2 = _interopRequireDefault(_Router);

var _RouterContext = require('../RouterContext');

var _RouterContext2 = _interopRequireDefault(_RouterContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

describe('server rendering', function () {
  var App = function (_Component) {
    _inherits(App, _Component);

    function App() {
      _classCallCheck(this, App);

      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    App.prototype.render = function render() {
      return _react2.default.createElement(
        'div',
        { className: 'App' },
        _react2.default.createElement(
          'h1',
          null,
          'App'
        ),
        _react2.default.createElement(
          _Link2.default,
          { to: '/about', activeClassName: 'about-is-active' },
          'About'
        ),
        ' ',
        _react2.default.createElement(
          _Link2.default,
          { to: '/dashboard', activeClassName: 'dashboard-is-active' },
          'Dashboard'
        ),
        _react2.default.createElement(
          'div',
          null,
          this.props.children
        )
      );
    };

    return App;
  }(_react.Component);

  var Dashboard = function (_Component2) {
    _inherits(Dashboard, _Component2);

    function Dashboard() {
      _classCallCheck(this, Dashboard);

      return _possibleConstructorReturn(this, _Component2.apply(this, arguments));
    }

    Dashboard.prototype.render = function render() {
      return _react2.default.createElement(
        'div',
        { className: 'Dashboard' },
        _react2.default.createElement(
          'h1',
          null,
          'The Dashboard'
        )
      );
    };

    return Dashboard;
  }(_react.Component);

  var About = function (_Component3) {
    _inherits(About, _Component3);

    function About() {
      _classCallCheck(this, About);

      return _possibleConstructorReturn(this, _Component3.apply(this, arguments));
    }

    About.prototype.render = function render() {
      return _react2.default.createElement(
        'div',
        { className: 'About' },
        _react2.default.createElement(
          'h1',
          null,
          'About'
        )
      );
    };

    return About;
  }(_react.Component);

  var Async = function (_Component4) {
    _inherits(Async, _Component4);

    function Async() {
      _classCallCheck(this, Async);

      return _possibleConstructorReturn(this, _Component4.apply(this, arguments));
    }

    Async.prototype.render = function render() {
      return _react2.default.createElement(
        'div',
        { className: 'Async' },
        _react2.default.createElement(
          'h1',
          null,
          'Async'
        ),
        _react2.default.createElement(
          _Link2.default,
          { to: '/async', activeClassName: 'async-is-active' },
          'Link'
        )
      );
    };

    return Async;
  }(_react.Component);

  var DashboardRoute = {
    path: '/dashboard',
    component: Dashboard
  };

  var AboutRoute = {
    path: '/about',
    component: About
  };

  var RedirectRoute = {
    path: '/company',
    onEnter: function onEnter(nextState, replace) {
      replace('/about');
    }
  };

  var AsyncRoute = {
    path: '/async',
    getComponent: function getComponent(location, cb) {
      setTimeout(function () {
        return cb(null, Async);
      });
    }
  };

  var routes = {
    path: '/',
    component: App,
    childRoutes: [DashboardRoute, AboutRoute, RedirectRoute, AsyncRoute]
  };

  it('works for synchronous route', function (done) {
    (0, _match2.default)({ routes: routes, location: '/dashboard' }, function (error, redirectLocation, renderProps) {
      var string = (0, _server.renderToString)(_react2.default.createElement(_RouterContext2.default, renderProps));
      (0, _expect2.default)(string).toMatch(/The Dashboard/);
      done();
    });
  });

  it('works for asynchronous route', function (done) {
    (0, _match2.default)({ routes: routes, location: '/async' }, function (error, redirectLocation, renderProps) {
      var string = (0, _server.renderToString)(_react2.default.createElement(_RouterContext2.default, renderProps));
      (0, _expect2.default)(string).toMatch(/Async/);
      done();
    });
  });

  it('accepts a custom history', function (done) {
    var history = (0, _createMemoryHistory2.default)();
    var spy = (0, _expect.spyOn)(history, 'createLocation').andCallThrough();

    (0, _match2.default)({ history: history, routes: routes, location: '/dashboard' }, function (error, redirectLocation, renderProps) {
      var string = (0, _server.renderToString)(_react2.default.createElement(_RouterContext2.default, renderProps));
      (0, _expect2.default)(string).toMatch(/The Dashboard/);
      (0, _expect2.default)(spy).toHaveBeenCalled();
      done();
    });
  });

  it('renders active Links as active', function (done) {
    (0, _match2.default)({ routes: routes, location: '/about' }, function (error, redirectLocation, renderProps) {
      var string = (0, _server.renderToString)(_react2.default.createElement(_RouterContext2.default, renderProps));
      (0, _expect2.default)(string).toMatch(/about-is-active/);
      (0, _expect2.default)(string).toNotMatch(/dashboard-is-active/);
      done();
    });
  });

  it('sends the redirect location', function (done) {
    (0, _match2.default)({ routes: routes, location: '/company' }, function (error, redirectLocation) {
      (0, _expect2.default)(redirectLocation).toExist();
      (0, _expect2.default)(redirectLocation.pathname).toEqual('/about');
      (0, _expect2.default)(redirectLocation.search).toEqual('');
      (0, _expect2.default)(redirectLocation.state).toEqual(null);
      (0, _expect2.default)(redirectLocation.action).toEqual('REPLACE');
      done();
    });
  });

  it('sends null values when no routes match', function (done) {
    (0, _match2.default)({ routes: routes, location: '/no-match' }, function (error, redirectLocation, state) {
      (0, _expect2.default)(error).toNotExist();
      (0, _expect2.default)(redirectLocation).toNotExist();
      (0, _expect2.default)(state).toNotExist();
      done();
    });
  });

  it('accepts a basename option', function (done) {
    (0, _match2.default)({ routes: routes, location: '/dashboard', basename: '/nasebame' }, function (error, redirectLocation, renderProps) {
      var string = (0, _server.renderToString)(_react2.default.createElement(_RouterContext2.default, renderProps));
      (0, _expect2.default)(string).toMatch(/\/nasebame/);
      done();
    });
  });

  it('supports basenames with trailing slash', function (done) {
    (0, _match2.default)({ routes: routes, location: '/dashboard', basename: '/nasebame/' }, function (error, redirectLocation, renderProps) {
      var string = (0, _server.renderToString)(_react2.default.createElement(_RouterContext2.default, renderProps));
      (0, _expect2.default)(string).toMatch(/\/nasebame/);
      done();
    });
  });

  describe('server/client consistency', function () {
    // Just render to static markup here to avoid having to normalize markup.

    it('should match for synchronous route', function () {
      var serverString = void 0;

      (0, _match2.default)({ routes: routes, location: '/dashboard' }, function (error, redirectLocation, renderProps) {
        serverString = (0, _server.renderToStaticMarkup)(_react2.default.createElement(_RouterContext2.default, renderProps));
      });

      var browserString = (0, _server.renderToStaticMarkup)(_react2.default.createElement(_Router2.default, { history: (0, _createMemoryHistory2.default)('/dashboard'), routes: routes }));

      (0, _expect2.default)(browserString).toEqual(serverString);
    });

    it('should match for asynchronous route', function (done) {
      (0, _match2.default)({ routes: routes, location: '/async' }, function (error, redirectLocation, renderProps) {
        var serverString = (0, _server.renderToStaticMarkup)(_react2.default.createElement(_RouterContext2.default, renderProps));

        (0, _match2.default)({ history: (0, _createMemoryHistory2.default)('/async'), routes: routes }, function (error, redirectLocation, renderProps) {
          var browserString = (0, _server.renderToStaticMarkup)(_react2.default.createElement(_Router2.default, renderProps));

          (0, _expect2.default)(browserString).toEqual(serverString);
          (0, _expect2.default)(browserString).toMatch(/async-is-active/);

          done();
        });
      });
    });
  });
});