'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _history = require('history');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _deprecateObjectProperties = require('../deprecateObjectProperties');

var _IndexRoute = require('../IndexRoute');

var _IndexRoute2 = _interopRequireDefault(_IndexRoute);

var _matchRoutes = require('../matchRoutes');

var _matchRoutes2 = _interopRequireDefault(_matchRoutes);

var _Route = require('../Route');

var _Route2 = _interopRequireDefault(_Route);

var _RouteUtils = require('../RouteUtils');

var _shouldWarn = require('./shouldWarn');

var _shouldWarn2 = _interopRequireDefault(_shouldWarn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('matchRoutes', function () {
  var routes = void 0;
  var RootRoute = void 0,
      UsersRoute = void 0,
      UsersIndexRoute = void 0,
      UserRoute = void 0,
      PostRoute = void 0,
      FilesRoute = void 0,
      AboutRoute = void 0,
      TeamRoute = void 0,
      ProfileRoute = void 0,
      GreedyRoute = void 0,
      OptionalRoute = void 0,
      OptionalRouteChild = void 0,
      CatchAllRoute = void 0;
  var createLocation = (0, _history.createMemoryHistory)().createLocation;

  beforeEach(function () {
    /*
    <Route>
      <Route path="users">
        <IndexRoute />
        <Route path=":userID">
          <Route path="/profile" />
        </Route>
        <Route path="/team" />
      </Route>
    </Route>
    <Route path="/about" />
    <Route path="/(optional)">
      <Route path="child" />
    </Route>
    <Route path="*" />
    */
    routes = [RootRoute = {
      childRoutes: [UsersRoute = {
        path: 'users',
        indexRoute: UsersIndexRoute = {},
        childRoutes: [UserRoute = {
          path: ':userID',
          childRoutes: [ProfileRoute = {
            path: '/profile'
          }, PostRoute = {
            path: ':postID'
          }]
        }, TeamRoute = {
          path: '/team'
        }]
      }]
    }, FilesRoute = {
      path: '/files/*/*.jpg'
    }, AboutRoute = {
      path: '/about'
    }, GreedyRoute = {
      path: '/**/f'
    }, OptionalRoute = {
      path: '/(optional)',
      childRoutes: [OptionalRouteChild = {
        path: 'child'
      }]
    }, CatchAllRoute = {
      path: '*'
    }];
  });

  function describeRoutes() {
    describe('when the location matches an index route', function () {
      it('matches the correct routes', function (done) {
        (0, _matchRoutes2.default)(routes, createLocation('/users'), function (error, match) {
          (0, _expect2.default)(match).toExist();
          (0, _expect2.default)(match.routes).toEqual([RootRoute, UsersRoute, UsersIndexRoute]);
          done();
        });
      });
    });

    describe('when the location matches a nested route with params', function () {
      it('matches the correct routes and params', function (done) {
        (0, _matchRoutes2.default)(routes, createLocation('/users/5'), function (error, match) {
          (0, _expect2.default)(match).toExist();
          (0, _expect2.default)(match.routes).toEqual([RootRoute, UsersRoute, UserRoute]);
          (0, _expect2.default)(match.params).toEqual({ userID: '5' });
          done();
        });
      });
    });

    describe('when the location matches a deeply nested route with params', function () {
      it('matches the correct routes and params', function (done) {
        (0, _matchRoutes2.default)(routes, createLocation('/users/5/abc'), function (error, match) {
          (0, _expect2.default)(match).toExist();
          (0, _expect2.default)(match.routes).toEqual([RootRoute, UsersRoute, UserRoute, PostRoute]);
          (0, _expect2.default)(match.params).toEqual({ userID: '5', postID: 'abc' });
          done();
        });
      });
    });

    describe('when the location matches a nested route with multiple splat params', function () {
      it('matches the correct routes and params', function (done) {
        (0, _matchRoutes2.default)(routes, createLocation('/files/a/b/c.jpg'), function (error, match) {
          (0, _expect2.default)(match).toExist();
          (0, _expect2.default)(match.routes).toEqual([FilesRoute]);
          (0, _expect2.default)(match.params).toEqual({ splat: ['a', 'b/c'] });
          done();
        });
      });
    });

    describe('when the location matches a nested route with a greedy splat param', function () {
      it('matches the correct routes and params', function (done) {
        (0, _matchRoutes2.default)(routes, createLocation('/foo/bar/f'), function (error, match) {
          (0, _expect2.default)(match).toExist();
          (0, _expect2.default)(match.routes).toEqual([GreedyRoute]);
          (0, _expect2.default)(match.params).toEqual({ splat: 'foo/bar' });
          done();
        });
      });
    });

    describe('when the location matches a route with hash', function () {
      it('matches the correct routes', function (done) {
        (0, _matchRoutes2.default)(routes, createLocation('/users#about'), function (error, match) {
          (0, _expect2.default)(match).toExist();
          (0, _expect2.default)(match.routes).toEqual([RootRoute, UsersRoute, UsersIndexRoute]);
          done();
        });
      });
    });

    describe('when the location matches a deeply nested route with params and hash', function () {
      it('matches the correct routes and params', function (done) {
        (0, _matchRoutes2.default)(routes, createLocation('/users/5/abc#about'), function (error, match) {
          (0, _expect2.default)(match).toExist();
          (0, _expect2.default)(match.routes).toEqual([RootRoute, UsersRoute, UserRoute, PostRoute]);
          (0, _expect2.default)(match.params).toEqual({ userID: '5', postID: 'abc' });
          done();
        });
      });
    });

    describe('when the location matches an absolute route', function () {
      it('matches the correct routes', function (done) {
        (0, _matchRoutes2.default)(routes, createLocation('/about'), function (error, match) {
          (0, _expect2.default)(match).toExist();
          (0, _expect2.default)(match.routes).toEqual([AboutRoute]);
          done();
        });
      });
    });

    describe('when the location matches an optional route', function () {
      it('matches when the optional pattern is missing', function (done) {
        (0, _matchRoutes2.default)(routes, createLocation('/'), function (error, match) {
          (0, _expect2.default)(match).toExist();
          (0, _expect2.default)(match.routes).toEqual([OptionalRoute]);
          done();
        });
      });

      it('matches when the optional pattern is present', function (done) {
        (0, _matchRoutes2.default)(routes, createLocation('/optional'), function (error, match) {
          (0, _expect2.default)(match).toExist();
          (0, _expect2.default)(match.routes).toEqual([OptionalRoute]);
          done();
        });
      });
    });

    describe('when the location matches the child of an optional route', function () {
      it('matches when the optional pattern is missing', function (done) {
        (0, _matchRoutes2.default)(routes, createLocation('/child'), function (error, match) {
          (0, _expect2.default)(match).toExist();
          (0, _expect2.default)(match.routes).toEqual([OptionalRoute, OptionalRouteChild]);
          done();
        });
      });

      it('matches when the optional pattern is present', function (done) {
        (0, _matchRoutes2.default)(routes, createLocation('/optional/child'), function (error, match) {
          (0, _expect2.default)(match).toExist();
          (0, _expect2.default)(match.routes).toEqual([OptionalRoute, OptionalRouteChild]);
          done();
        });
      });
    });

    describe('when the location does not match any routes', function () {
      it('matches the "catch-all" route', function (done) {
        (0, _matchRoutes2.default)(routes, createLocation('/not-found'), function (error, match) {
          (0, _expect2.default)(match).toExist();
          (0, _expect2.default)(match.routes).toEqual([CatchAllRoute]);
          done();
        });
      });

      it('matches the "catch-all" route on a deep miss', function (done) {
        (0, _matchRoutes2.default)(routes, createLocation('/not-found/foo'), function (error, match) {
          (0, _expect2.default)(match).toExist();
          (0, _expect2.default)(match.routes).toEqual([CatchAllRoute]);
          done();
        });
      });

      it('matches the "catch-all" route on missing path separators', function (done) {
        (0, _matchRoutes2.default)(routes, createLocation('/optionalchild'), function (error, match) {
          (0, _expect2.default)(match).toExist();
          (0, _expect2.default)(match.routes).toEqual([CatchAllRoute]);
          done();
        });
      });
    });
  }

  describe('a synchronous route config', function () {
    describeRoutes();

    describe('when the location matches a nested absolute route', function () {
      it('matches the correct routes', function (done) {
        (0, _matchRoutes2.default)(routes, createLocation('/team'), function (error, match) {
          (0, _expect2.default)(match).toExist();
          (0, _expect2.default)(match.routes).toEqual([RootRoute, UsersRoute, TeamRoute]);
          done();
        });
      });
    });

    describe('when the location matches an absolute route nested under a route with params', function () {
      it('matches the correct routes and params', function (done) {
        (0, _matchRoutes2.default)(routes, createLocation('/profile'), function (error, match) {
          (0, _expect2.default)(match).toExist();
          (0, _expect2.default)(match.routes).toEqual([RootRoute, UsersRoute, UserRoute, ProfileRoute]);
          (0, _expect2.default)(match.params).toEqual({}); // no userID param
          done();
        });
      });
    });
  });

  describe('an asynchronous route config', function () {
    function makeAsyncRouteConfig(routes) {
      routes.forEach(function (route) {
        var childRoutes = route.childRoutes;
        var indexRoute = route.indexRoute;


        if (childRoutes) {
          delete route.childRoutes;

          route.getChildRoutes = function (partialNextState, callback) {
            setTimeout(function () {
              callback(null, childRoutes);
            });
          };

          makeAsyncRouteConfig(childRoutes);
        }

        if (indexRoute) {
          delete route.indexRoute;

          route.getIndexRoute = function (location, callback) {
            setTimeout(function () {
              callback(null, indexRoute);
            });
          };
        }
      });
    }

    beforeEach(function () {
      makeAsyncRouteConfig(routes);
    });

    describeRoutes();
  });

  describe('an asynchronous JSX route config', function () {
    var getChildRoutes = void 0,
        getIndexRoute = void 0,
        jsxRoutes = void 0;

    beforeEach(function () {
      getChildRoutes = _expect2.default.createSpy().andCall(function (partialNextState, callback) {
        setTimeout(function () {
          callback(null, _react2.default.createElement(_Route2.default, { path: ':userId' }));
        });
      });

      getIndexRoute = _expect2.default.createSpy().andCall(function (location, callback) {
        setTimeout(function () {
          callback(null, _react2.default.createElement(_Route2.default, { name: 'jsx' }));
        });
      });

      jsxRoutes = (0, _RouteUtils.createRoutes)([_react2.default.createElement(_Route2.default, {
        name: 'users',
        path: ':groupId/users',
        getChildRoutes: getChildRoutes,
        getIndexRoute: getIndexRoute
      })]);
    });

    it('when getChildRoutes callback returns reactElements', function (done) {
      (0, _matchRoutes2.default)(jsxRoutes, createLocation('/foo/users/5'), function (error, match) {
        (0, _expect2.default)(match).toExist();
        (0, _expect2.default)(match.routes.map(function (r) {
          return r.path;
        })).toEqual([':groupId/users', ':userId']);
        (0, _expect2.default)(match.params).toEqual({ groupId: 'foo', userId: '5' });

        var partialNextState = getChildRoutes.calls[0].arguments[0];
        (0, _expect2.default)(partialNextState.params).toEqual({ groupId: 'foo' });
        (0, _expect2.default)(partialNextState.location.pathname).toEqual('/foo/users/5');

        // Only the calls below this point should emit deprecation warnings.
        if (_deprecateObjectProperties.canUseMembrane) {
          (0, _shouldWarn2.default)('deprecated');
        }

        (0, _expect2.default)(partialNextState.pathname).toEqual('/foo/users/5');

        done();
      });
    });

    it('when getIndexRoute callback returns reactElements', function (done) {
      (0, _matchRoutes2.default)(jsxRoutes, createLocation('/bar/users'), function (error, match) {
        (0, _expect2.default)(match).toExist();
        (0, _expect2.default)(match.routes.map(function (r) {
          return r.name;
        })).toEqual(['users', 'jsx']);

        var partialNextState = getIndexRoute.calls[0].arguments[0];
        (0, _expect2.default)(partialNextState.params).toEqual({ groupId: 'bar' });
        (0, _expect2.default)(partialNextState.location.pathname).toEqual('/bar/users');

        // Only the calls below this point should emit deprecation warnings.
        if (_deprecateObjectProperties.canUseMembrane) {
          (0, _shouldWarn2.default)('deprecated');
        }

        (0, _expect2.default)(partialNextState.pathname).toEqual('/bar/users');

        done();
      });
    });
  });

  it('complains about invalid index route with path', function (done) {
    (0, _shouldWarn2.default)('path');

    var invalidRoutes = (0, _RouteUtils.createRoutes)(_react2.default.createElement(
      _Route2.default,
      { path: '/' },
      _react2.default.createElement(_IndexRoute2.default, { path: 'foo' })
    ));

    (0, _matchRoutes2.default)(invalidRoutes, createLocation('/'), function (error, match) {
      (0, _expect2.default)(match).toExist();
      done();
    });
  });

  it('supports splat under pathless route at root', function (done) {
    var routes = (0, _RouteUtils.createRoutes)(_react2.default.createElement(
      _Route2.default,
      null,
      _react2.default.createElement(_Route2.default, { path: '*' })
    ));

    (0, _matchRoutes2.default)(routes, createLocation('/'), function (error, match) {
      (0, _expect2.default)(match).toExist();
      done();
    });
  });
});