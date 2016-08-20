'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _createMemoryHistory = require('../createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _PropTypes = require('../PropTypes');

var _execSteps = require('./execSteps');

var _execSteps2 = _interopRequireDefault(_execSteps);

var _Router = require('../Router');

var _Router2 = _interopRequireDefault(_Router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

describe('When a router enters a branch', function () {
  var node = void 0,
      newsLeaveHookSpy = void 0,
      removeNewsLeaveHook = void 0,
      userLeaveHookSpy = void 0,
      DashboardRoute = void 0,
      NewsFeedRoute = void 0,
      InboxRoute = void 0,
      RedirectToInboxRoute = void 0,
      MessageRoute = void 0,
      UserRoute = void 0,
      AssignmentRoute = void 0,
      routes = void 0;

  beforeEach(function () {
    node = document.createElement('div');
    newsLeaveHookSpy = _expect2.default.createSpy();
    userLeaveHookSpy = _expect2.default.createSpy();

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

      NewsFeed.prototype.componentWillMount = function componentWillMount() {
        removeNewsLeaveHook = this.context.router.setRouteLeaveHook(this.props.route, function () {
          return newsLeaveHookSpy();
        } // Break reference equality.
        );
      };

      NewsFeed.prototype.render = function render() {
        return _react2.default.createElement(
          'div',
          null,
          'News'
        );
      };

      return NewsFeed;
    }(_react.Component);

    NewsFeed.contextTypes = {
      router: _PropTypes.routerShape.isRequired
    };

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

    var UserAssignment = function (_Component4) {
      _inherits(UserAssignment, _Component4);

      function UserAssignment() {
        _classCallCheck(this, UserAssignment);

        return _possibleConstructorReturn(this, _Component4.apply(this, arguments));
      }

      UserAssignment.prototype.render = function render() {
        return _react2.default.createElement(
          'div',
          null,
          'assignment ',
          this.props.params.assignmentId
        );
      };

      return UserAssignment;
    }(_react.Component);

    var User = function (_Component5) {
      _inherits(User, _Component5);

      function User() {
        _classCallCheck(this, User);

        return _possibleConstructorReturn(this, _Component5.apply(this, arguments));
      }

      User.prototype.componentWillMount = function componentWillMount() {
        this.context.router.setRouteLeaveHook(this.props.route, userLeaveHookSpy);
      };

      User.prototype.render = function render() {
        return _react2.default.createElement(
          'div',
          null,
          'User ',
          this.props.params.userId,
          ' ',
          this.props.children
        );
      };

      return User;
    }(_react.Component);

    User.contextTypes = {
      router: _PropTypes.routerShape.isRequired
    };

    NewsFeedRoute = {
      path: 'news',
      component: NewsFeed,
      onEnter: function onEnter(nextState, replace) {
        (0, _expect2.default)(this).toBe(NewsFeedRoute);
        (0, _expect2.default)(nextState.routes).toContain(NewsFeedRoute);
        (0, _expect2.default)(replace).toBeA('function');
      },
      onChange: function onChange(prevState, nextState, replace) {
        (0, _expect2.default)(this).toBe(NewsFeedRoute);
        (0, _expect2.default)(prevState).toNotEqual(nextState);
        (0, _expect2.default)(prevState.routes).toContain(NewsFeedRoute);
        (0, _expect2.default)(nextState.routes).toContain(NewsFeedRoute);
        (0, _expect2.default)(replace).toBeA('function');
      },
      onLeave: function onLeave(prevState) {
        (0, _expect2.default)(this).toBe(NewsFeedRoute);
        (0, _expect2.default)(prevState.routes).toContain(NewsFeedRoute);
      }
    };

    InboxRoute = {
      path: 'inbox',
      component: Inbox,
      onEnter: function onEnter(nextState, replace) {
        (0, _expect2.default)(this).toBe(InboxRoute);
        (0, _expect2.default)(nextState.routes).toContain(InboxRoute);
        (0, _expect2.default)(replace).toBeA('function');
      },
      onLeave: function onLeave(prevState) {
        (0, _expect2.default)(this).toBe(InboxRoute);
        (0, _expect2.default)(prevState.routes).toContain(InboxRoute);
      }
    };

    RedirectToInboxRoute = {
      path: 'redirect-to-inbox',
      onEnter: function onEnter(nextState, replace) {
        (0, _expect2.default)(this).toBe(RedirectToInboxRoute);
        (0, _expect2.default)(nextState.routes).toContain(RedirectToInboxRoute);
        (0, _expect2.default)(replace).toBeA('function');

        replace('/inbox');
      },
      onLeave: function onLeave(prevState) {
        (0, _expect2.default)(this).toBe(RedirectToInboxRoute);
        (0, _expect2.default)(prevState.routes).toContain(RedirectToInboxRoute);
      }
    };

    MessageRoute = {
      path: 'messages/:messageID',
      onEnter: function onEnter(nextState, replace) {
        (0, _expect2.default)(this).toBe(MessageRoute);
        (0, _expect2.default)(nextState.routes).toContain(MessageRoute);
        (0, _expect2.default)(replace).toBeA('function');
      },
      onChange: function onChange(prevState, nextState, replace) {
        (0, _expect2.default)(this).toBe(MessageRoute);
        (0, _expect2.default)(prevState.routes).toContain(MessageRoute);
        (0, _expect2.default)(nextState.routes).toContain(MessageRoute);
        (0, _expect2.default)(replace).toBeA('function');
      },
      onLeave: function onLeave(prevState) {
        (0, _expect2.default)(this).toBe(MessageRoute);
        (0, _expect2.default)(prevState.routes).toContain(MessageRoute);
      }
    };

    AssignmentRoute = {
      path: 'assignments/:assignmentId',
      component: UserAssignment,
      onEnter: function onEnter() {
        (0, _expect2.default)(this).toBe(AssignmentRoute);
      },
      onLeave: function onLeave() {
        (0, _expect2.default)(this).toBe(AssignmentRoute);
      }
    };

    UserRoute = {
      path: 'users/:userId',
      component: User,
      childRoutes: [AssignmentRoute],
      onEnter: function onEnter() {
        (0, _expect2.default)(this).toBe(UserRoute);
      },
      onLeave: function onLeave() {
        (0, _expect2.default)(this).toBe(UserRoute);
      }
    };

    DashboardRoute = {
      path: '/',
      component: Dashboard,
      onEnter: function onEnter(nextState, replace) {
        (0, _expect2.default)(this).toBe(DashboardRoute);
        (0, _expect2.default)(nextState.routes).toContain(DashboardRoute);
        (0, _expect2.default)(replace).toBeA('function');
      },
      onChange: function onChange(prevState, nextState, replace) {
        (0, _expect2.default)(this).toBe(DashboardRoute);
        (0, _expect2.default)(prevState).toNotEqual(nextState);
        (0, _expect2.default)(prevState.routes).toContain(DashboardRoute);
        (0, _expect2.default)(nextState.routes).toContain(DashboardRoute);
        (0, _expect2.default)(replace).toBeA('function');
      },
      onLeave: function onLeave(prevState) {
        (0, _expect2.default)(this).toBe(DashboardRoute);
        (0, _expect2.default)(prevState.routes).toContain(DashboardRoute);
      },

      childRoutes: [NewsFeedRoute, InboxRoute, RedirectToInboxRoute, MessageRoute, UserRoute]
    };

    routes = [DashboardRoute];
  });

  afterEach(function () {
    (0, _reactDom.unmountComponentAtNode)(node);
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

  it('calls the route leave hooks when leaving the route', function (done) {
    var history = (0, _createMemoryHistory2.default)('/news');

    (0, _reactDom.render)(_react2.default.createElement(_Router2.default, { history: history, routes: routes }), node, function () {
      (0, _expect2.default)(newsLeaveHookSpy.calls.length).toEqual(0);
      history.push('/inbox');
      (0, _expect2.default)(newsLeaveHookSpy.calls.length).toEqual(1);
      history.push('/news');
      (0, _expect2.default)(newsLeaveHookSpy.calls.length).toEqual(1);
      history.push('/inbox');
      (0, _expect2.default)(newsLeaveHookSpy.calls.length).toEqual(2);
      done();
    });
  });

  it('does not call removed route leave hooks', function (done) {
    var history = (0, _createMemoryHistory2.default)('/news');

    (0, _reactDom.render)(_react2.default.createElement(_Router2.default, { history: history, routes: routes }), node, function () {
      removeNewsLeaveHook();
      history.push('/inbox');
      (0, _expect2.default)(newsLeaveHookSpy).toNotHaveBeenCalled();
      done();
    });
  });

  it('does not remove route leave hooks when changing params', function (done) {
    var history = (0, _createMemoryHistory2.default)('/users/foo');

    // Stub this function to exercise the code path.
    history.listenBeforeUnload = function () {
      return function () {};
    };

    (0, _reactDom.render)(_react2.default.createElement(_Router2.default, { history: history, routes: routes }), node, function () {
      (0, _expect2.default)(userLeaveHookSpy.calls.length).toEqual(0);
      history.push('/users/bar');
      (0, _expect2.default)(userLeaveHookSpy.calls.length).toEqual(1);
      history.push('/users/baz');
      (0, _expect2.default)(userLeaveHookSpy.calls.length).toEqual(2);
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
      var history = (0, _createMemoryHistory2.default)('/inbox');

      var steps = [function () {
        (0, _expect2.default)(inboxRouteEnterSpy).toHaveBeenCalled('InboxRoute.onEnter was not called');
        history.push('/news');
      }, function () {
        (0, _expect2.default)(inboxRouteLeaveSpy).toHaveBeenCalled('InboxRoute.onLeave was not called');
        (0, _expect2.default)(dashboardRouteLeaveSpy.calls.length).toEqual(0, 'DashboardRoute.onLeave was called');
      }];

      var execNextStep = (0, _execSteps2.default)(steps, done);

      (0, _reactDom.render)(_react2.default.createElement(_Router2.default, { history: history,
        routes: routes,
        onUpdate: execNextStep
      }), node, execNextStep);
    });
  });

  describe('and then navigates to the same branch, but with different params', function () {
    it('calls the onLeave and onEnter hooks of all routes whose params have changed', function (done) {
      var dashboardRouteLeaveSpy = (0, _expect.spyOn)(DashboardRoute, 'onLeave').andCallThrough();
      var dashboardRouteChangeSpy = (0, _expect.spyOn)(DashboardRoute, 'onChange').andCallThrough();
      var dashboardRouteEnterSpy = (0, _expect.spyOn)(DashboardRoute, 'onEnter').andCallThrough();

      var messageRouteLeaveSpy = (0, _expect.spyOn)(MessageRoute, 'onLeave').andCallThrough();
      var messageRouteChangeSpy = (0, _expect.spyOn)(MessageRoute, 'onChange').andCallThrough();
      var messageRouteEnterSpy = (0, _expect.spyOn)(MessageRoute, 'onEnter').andCallThrough();
      var history = (0, _createMemoryHistory2.default)('/messages/123');

      var steps = [function () {
        (0, _expect2.default)(dashboardRouteEnterSpy).toHaveBeenCalled('DashboardRoute.onEnter was not called');
        (0, _expect2.default)(messageRouteEnterSpy).toHaveBeenCalled('InboxRoute.onEnter was not called');
        history.push('/messages/456');
      }, function () {
        (0, _expect2.default)(messageRouteLeaveSpy).toHaveBeenCalled('MessageRoute.onLeave was not called');
        (0, _expect2.default)(messageRouteEnterSpy).toHaveBeenCalled('MessageRoute.onEnter was not called');
        (0, _expect2.default)(messageRouteChangeSpy.calls.length).toEqual(0, 'DashboardRoute.onChange was called');

        (0, _expect2.default)(dashboardRouteChangeSpy).toHaveBeenCalled('DashboardRoute.onChange was not called');
        (0, _expect2.default)(dashboardRouteLeaveSpy.calls.length).toEqual(0, 'DashboardRoute.onLeave was called');
      }];

      var execNextStep = (0, _execSteps2.default)(steps, done);

      (0, _reactDom.render)(_react2.default.createElement(_Router2.default, { history: history,
        routes: routes,
        onUpdate: execNextStep
      }), node, execNextStep);
    });
  });

  describe('and then navigates to the same branch, but with different parent params', function () {
    it('calls the onLeave and onEnter hooks of the parent and children', function (done) {
      var parentLeaveSpy = (0, _expect.spyOn)(UserRoute, 'onLeave').andCallThrough();
      var parentEnterSpy = (0, _expect.spyOn)(UserRoute, 'onEnter').andCallThrough();
      var childLeaveSpy = (0, _expect.spyOn)(AssignmentRoute, 'onLeave').andCallThrough();
      var childEnterSpy = (0, _expect.spyOn)(AssignmentRoute, 'onEnter').andCallThrough();
      var history = (0, _createMemoryHistory2.default)('/users/123/assignments/456');

      var steps = [function () {
        (0, _expect2.default)(parentEnterSpy).toHaveBeenCalled();
        (0, _expect2.default)(childEnterSpy).toHaveBeenCalled();
        history.push('/users/789/assignments/456');
      }, function () {
        (0, _expect2.default)(parentLeaveSpy).toHaveBeenCalled();
        (0, _expect2.default)(childLeaveSpy).toHaveBeenCalled();
        (0, _expect2.default)(parentEnterSpy).toHaveBeenCalled();
        (0, _expect2.default)(childEnterSpy).toHaveBeenCalled();
      }];

      var execNextStep = (0, _execSteps2.default)(steps, done);

      (0, _reactDom.render)(_react2.default.createElement(_Router2.default, { history: history,
        routes: routes,
        onUpdate: execNextStep
      }), node, execNextStep);
    });
  });

  describe('and then the query changes', function () {
    it('calls the onEnter hooks of all routes in that branch', function (done) {
      var newsFeedRouteEnterSpy = (0, _expect.spyOn)(NewsFeedRoute, 'onEnter').andCallThrough();
      var newsFeedRouteChangeSpy = (0, _expect.spyOn)(NewsFeedRoute, 'onChange').andCallThrough();
      var history = (0, _createMemoryHistory2.default)('/inbox');

      (0, _reactDom.render)(_react2.default.createElement(_Router2.default, { history: history, routes: routes }), node, function () {
        history.push({ pathname: '/news', query: { q: 1 } });
        (0, _expect2.default)(newsFeedRouteChangeSpy.calls.length).toEqual(0, 'NewsFeedRoute.onChange was called');
        (0, _expect2.default)(newsFeedRouteEnterSpy.calls.length).toEqual(1);

        history.push({ pathname: '/news', query: { q: 2 } });
        (0, _expect2.default)(newsFeedRouteChangeSpy).toHaveBeenCalled('NewsFeedRoute.onChange was not called');
        (0, _expect2.default)(newsFeedRouteEnterSpy.calls.length).toEqual(1);
        done();
      });
    });
  });
});