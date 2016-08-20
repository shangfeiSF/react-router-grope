'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _createMemoryHistory = require('history/lib/createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _execSteps = require('./execSteps');

var _execSteps2 = _interopRequireDefault(_execSteps);

var _Router = require('../Router');

var _Router2 = _interopRequireDefault(_Router);

var _shouldWarn = require('./shouldWarn');

var _shouldWarn2 = _interopRequireDefault(_shouldWarn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

describe('v1 When a router enters a branch', function () {
  var Dashboard = function (_Component) {
    _inherits(Dashboard, _Component);

    function Dashboard() {
      _classCallCheck(this, Dashboard);

      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Dashboard.prototype.render = function render() {
      return _react2.default.createElement(
        'div',
        { className: 'Dashboard' },
        _react2.default.createElement(
          'h1',
          null,
          'The Dashboard'
        ),
        this.props.children
      );
    };

    return Dashboard;
  }(_react.Component);

  var NewsFeed = function (_Component2) {
    _inherits(NewsFeed, _Component2);

    function NewsFeed() {
      _classCallCheck(this, NewsFeed);

      return _possibleConstructorReturn(this, _Component2.apply(this, arguments));
    }

    NewsFeed.prototype.render = function render() {
      return _react2.default.createElement(
        'div',
        null,
        'News'
      );
    };

    return NewsFeed;
  }(_react.Component);

  var Inbox = function (_Component3) {
    _inherits(Inbox, _Component3);

    function Inbox() {
      _classCallCheck(this, Inbox);

      return _possibleConstructorReturn(this, _Component3.apply(this, arguments));
    }

    Inbox.prototype.render = function render() {
      return _react2.default.createElement(
        'div',
        null,
        'Inbox'
      );
    };

    return Inbox;
  }(_react.Component);

  var node = void 0,
      DashboardRoute = void 0,
      NewsFeedRoute = void 0,
      InboxRoute = void 0,
      RedirectToInboxRoute = void 0,
      MessageRoute = void 0,
      routes = void 0;
  beforeEach(function () {
    node = document.createElement('div');

    NewsFeedRoute = {
      path: 'news',
      component: NewsFeed,
      onEnter: function onEnter(nextState, replaceState) {
        (0, _expect2.default)(this).toBe(NewsFeedRoute);
        (0, _expect2.default)(nextState.routes).toContain(NewsFeedRoute);
        (0, _expect2.default)(replaceState).toBeA('function');
      },
      onLeave: function onLeave() {
        (0, _expect2.default)(this).toBe(NewsFeedRoute);
      }
    };

    InboxRoute = {
      path: 'inbox',
      component: Inbox,
      onEnter: function onEnter(nextState, replaceState) {
        (0, _expect2.default)(this).toBe(InboxRoute);
        (0, _expect2.default)(nextState.routes).toContain(InboxRoute);
        (0, _expect2.default)(replaceState).toBeA('function');
      },
      onLeave: function onLeave() {
        (0, _expect2.default)(this).toBe(InboxRoute);
      }
    };

    RedirectToInboxRoute = {
      path: 'redirect-to-inbox',
      onEnter: function onEnter(nextState, replaceState) {
        (0, _expect2.default)(this).toBe(RedirectToInboxRoute);
        (0, _expect2.default)(nextState.routes).toContain(RedirectToInboxRoute);
        (0, _expect2.default)(replaceState).toBeA('function');

        replaceState(null, '/inbox');
      },
      onLeave: function onLeave() {
        (0, _expect2.default)(this).toBe(RedirectToInboxRoute);
      }
    };

    MessageRoute = {
      path: 'messages/:messageID',
      onEnter: function onEnter(nextState, replaceState) {
        (0, _expect2.default)(this).toBe(MessageRoute);
        (0, _expect2.default)(nextState.routes).toContain(MessageRoute);
        (0, _expect2.default)(replaceState).toBeA('function');
      },
      onLeave: function onLeave() {
        (0, _expect2.default)(this).toBe(MessageRoute);
      }
    };

    DashboardRoute = {
      component: Dashboard,
      onEnter: function onEnter(nextState, replaceState) {
        (0, _expect2.default)(this).toBe(DashboardRoute);
        (0, _expect2.default)(nextState.routes).toContain(DashboardRoute);
        (0, _expect2.default)(replaceState).toBeA('function');
      },
      onLeave: function onLeave() {
        (0, _expect2.default)(this).toBe(DashboardRoute);
      },

      childRoutes: [NewsFeedRoute, InboxRoute, RedirectToInboxRoute, MessageRoute]
    };

    routes = [DashboardRoute];
  });

  afterEach(function () {
    (0, _reactDom.unmountComponentAtNode)(node);
  });

  beforeEach(function () {
    (0, _shouldWarn2.default)('deprecated');
  });

  it('calls the onEnter hooks of all routes in that branch', function (done) {
    var dashboardRouteEnterSpy = (0, _expect.spyOn)(DashboardRoute, 'onEnter').andCallThrough();
    var newsFeedRouteEnterSpy = (0, _expect.spyOn)(NewsFeedRoute, 'onEnter').andCallThrough();

    (0, _reactDom.render)(_react2.default.createElement(_Router2.default, { history: (0, _createMemoryHistory2.default)('/news'), routes: routes }), node, function () {
      (0, _expect2.default)(dashboardRouteEnterSpy).toHaveBeenCalled();
      (0, _expect2.default)(newsFeedRouteEnterSpy).toHaveBeenCalled();
      done();
    });
  });

  describe('and one of the transition hooks navigates to another route', function () {
    it('immediately transitions to the new route', function (done) {
      var redirectRouteEnterSpy = (0, _expect.spyOn)(RedirectToInboxRoute, 'onEnter').andCallThrough();
      var redirectRouteLeaveSpy = (0, _expect.spyOn)(RedirectToInboxRoute, 'onLeave').andCallThrough();
      var inboxEnterSpy = (0, _expect.spyOn)(InboxRoute, 'onEnter').andCallThrough();

      (0, _reactDom.render)(_react2.default.createElement(_Router2.default, { history: (0, _createMemoryHistory2.default)('/redirect-to-inbox'), routes: routes }), node, function () {
        (0, _expect2.default)(this.state.location.pathname).toEqual('/inbox');
        (0, _expect2.default)(redirectRouteEnterSpy).toHaveBeenCalled();
        (0, _expect2.default)(redirectRouteLeaveSpy.calls.length).toEqual(0);
        (0, _expect2.default)(inboxEnterSpy).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('and then navigates to another branch', function () {
    it('calls the onLeave hooks of all routes in the previous branch that are not in the next branch', function (done) {
      var dashboardRouteLeaveSpy = (0, _expect.spyOn)(DashboardRoute, 'onLeave').andCallThrough();
      var inboxRouteEnterSpy = (0, _expect.spyOn)(InboxRoute, 'onEnter').andCallThrough();
      var inboxRouteLeaveSpy = (0, _expect.spyOn)(InboxRoute, 'onLeave').andCallThrough();

      var steps = [function () {
        (0, _expect2.default)(inboxRouteEnterSpy).toHaveBeenCalled('InboxRoute.onEnter was not called');
        this.history.pushState(null, '/news');
      }, function () {
        (0, _expect2.default)(inboxRouteLeaveSpy).toHaveBeenCalled('InboxRoute.onLeave was not called');
        (0, _expect2.default)(dashboardRouteLeaveSpy.calls.length).toEqual(0, 'DashboardRoute.onLeave was called');
      }];

      var execNextStep = (0, _execSteps2.default)(steps, done);

      (0, _reactDom.render)(_react2.default.createElement(_Router2.default, { history: (0, _createMemoryHistory2.default)('/inbox'),
        routes: routes,
        onUpdate: execNextStep
      }), node, execNextStep);
    });
  });

  describe('and then navigates to the same branch, but with different params', function () {
    it('calls the onLeave and onEnter hooks of all routes whose params have changed', function (done) {
      var dashboardRouteLeaveSpy = (0, _expect.spyOn)(DashboardRoute, 'onLeave').andCallThrough();
      var dashboardRouteEnterSpy = (0, _expect.spyOn)(DashboardRoute, 'onEnter').andCallThrough();
      var messageRouteLeaveSpy = (0, _expect.spyOn)(MessageRoute, 'onLeave').andCallThrough();
      var messageRouteEnterSpy = (0, _expect.spyOn)(MessageRoute, 'onEnter').andCallThrough();

      var steps = [function () {
        (0, _expect2.default)(dashboardRouteEnterSpy).toHaveBeenCalled('DashboardRoute.onEnter was not called');
        (0, _expect2.default)(messageRouteEnterSpy).toHaveBeenCalled('InboxRoute.onEnter was not called');
        this.history.pushState(null, '/messages/456');
      }, function () {
        (0, _expect2.default)(messageRouteLeaveSpy).toHaveBeenCalled('MessageRoute.onLeave was not called');
        (0, _expect2.default)(messageRouteEnterSpy).toHaveBeenCalled('MessageRoute.onEnter was not called');
        (0, _expect2.default)(dashboardRouteLeaveSpy.calls.length).toEqual(0, 'DashboardRoute.onLeave was called');
      }];

      var execNextStep = (0, _execSteps2.default)(steps, done);

      (0, _reactDom.render)(_react2.default.createElement(_Router2.default, { history: (0, _createMemoryHistory2.default)('/messages/123'),
        routes: routes,
        onUpdate: execNextStep
      }), node, execNextStep);
    });
  });

  describe('and then the query changes', function () {
    it('calls the onEnter hooks of all routes in that branch', function (done) {
      var newsFeedRouteEnterSpy = (0, _expect.spyOn)(NewsFeedRoute, 'onEnter').andCallThrough();
      var history = (0, _createMemoryHistory2.default)('/inbox');

      (0, _reactDom.render)(_react2.default.createElement(_Router2.default, { history: history, routes: routes }), node, function () {
        history.pushState(null, '/news', { q: 1 });
        (0, _expect2.default)(newsFeedRouteEnterSpy.calls.length).toEqual(1);
        history.pushState(null, '/news', { q: 2 });
        (0, _expect2.default)(newsFeedRouteEnterSpy.calls.length).toEqual(1);
        done();
      });
    });
  });
});