'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _createMemoryHistory = require('../createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _IndexRoute = require('../IndexRoute');

var _IndexRoute2 = _interopRequireDefault(_IndexRoute);

var _Router = require('../Router');

var _Router2 = _interopRequireDefault(_Router);

var _Route = require('../Route');

var _Route2 = _interopRequireDefault(_Route);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('isActive', function () {

  var node = void 0;
  beforeEach(function () {
    node = document.createElement('div');
  });

  afterEach(function () {
    (0, _reactDom.unmountComponentAtNode)(node);
  });

  describe('a pathname that matches the URL', function () {
    describe('with no query', function () {
      it('is active', function (done) {
        var history = (0, _createMemoryHistory2.default)('/home');
        (0, _reactDom.render)(_react2.default.createElement(
          _Router2.default,
          { history: history },
          _react2.default.createElement(_Route2.default, { path: '/home' })
        ), node, function () {
          (0, _expect2.default)(this.router.isActive('/home')).toBe(true);
          done();
        });
      });
    });

    describe('with a query that also matches', function () {
      it('is active', function (done) {
        (0, _reactDom.render)(_react2.default.createElement(
          _Router2.default,
          { history: (0, _createMemoryHistory2.default)('/home?the=query') },
          _react2.default.createElement(_Route2.default, { path: '/home' })
        ), node, function () {
          (0, _expect2.default)(this.router.isActive({
            pathname: '/home',
            query: { the: 'query' }
          })).toBe(true);
          done();
        });
      });
    });

    describe('with a query that also matches by value, but not by type', function () {
      it('is active', function (done) {
        (0, _reactDom.render)(_react2.default.createElement(
          _Router2.default,
          { history: (0, _createMemoryHistory2.default)('/home?the=query&n=2&show=false') },
          _react2.default.createElement(_Route2.default, { path: '/home' })
        ), node, function () {
          (0, _expect2.default)(this.router.isActive({
            pathname: '/home',
            query: { the: 'query', n: 2, show: false }
          })).toBe(true);
          done();
        });
      });
    });

    describe('with a query that does not match', function () {
      it('is not active', function (done) {
        (0, _reactDom.render)(_react2.default.createElement(
          _Router2.default,
          { history: (0, _createMemoryHistory2.default)('/home?the=query') },
          _react2.default.createElement(_Route2.default, { path: '/home' })
        ), node, function () {
          (0, _expect2.default)(this.router.isActive({
            pathname: '/home',
            query: { something: 'else' }
          })).toBe(false);
          done();
        });
      });
    });

    describe('with params', function () {
      it('is active when its params match', function (done) {
        (0, _reactDom.render)(_react2.default.createElement(
          _Router2.default,
          { history: (0, _createMemoryHistory2.default)('/hello/ryan') },
          _react2.default.createElement(_Route2.default, { path: '/hello/:name' })
        ), node, function () {
          (0, _expect2.default)(this.router.isActive('/hello/ryan')).toBe(true);
          (0, _expect2.default)(this.router.isActive('/hello/michael')).toBe(false);
          done();
        });
      });
    });
  });

  describe('nested routes', function () {
    describe('on the child', function () {
      it('is active for the child and the parent', function (done) {
        (0, _reactDom.render)(_react2.default.createElement(
          _Router2.default,
          { history: (0, _createMemoryHistory2.default)('/parent/child') },
          _react2.default.createElement(
            _Route2.default,
            { path: '/parent' },
            _react2.default.createElement(_Route2.default, { path: 'child' })
          )
        ), node, function () {
          (0, _expect2.default)(this.router.isActive('/parent/child')).toBe(true);
          (0, _expect2.default)(this.router.isActive('/parent/child', true)).toBe(true);
          (0, _expect2.default)(this.router.isActive('/parent')).toBe(true);
          (0, _expect2.default)(this.router.isActive('/parent', true)).toBe(false);
          done();
        });
      });

      // This test case is a bit odd. A route with path /parent/child/ won't
      // match /parent/child because of the trailing slash mismatch. However,
      // this doesn't matter in practice, since it only comes up if your
      // isActive pattern has a trailing slash but your route pattern doesn't,
      // which would be an utterly bizarre thing to do.

      it('is active with trailing slash on pattern', function (done) {
        (0, _reactDom.render)(_react2.default.createElement(
          _Router2.default,
          { history: (0, _createMemoryHistory2.default)('/parent/child') },
          _react2.default.createElement(
            _Route2.default,
            { path: '/parent' },
            _react2.default.createElement(_Route2.default, { path: 'child' })
          )
        ), node, function () {
          (0, _expect2.default)(this.router.isActive('/parent/child/')).toBe(true);
          done();
        });
      });

      it('is active with trailing slash on location', function (done) {
        (0, _reactDom.render)(_react2.default.createElement(
          _Router2.default,
          { history: (0, _createMemoryHistory2.default)('/parent/child/') },
          _react2.default.createElement(
            _Route2.default,
            { path: '/parent' },
            _react2.default.createElement(_Route2.default, { path: 'child' })
          )
        ), node, function () {
          (0, _expect2.default)(this.router.isActive('/parent/child')).toBe(true);
          (0, _expect2.default)(this.router.isActive('/parent/child/')).toBe(true);
          done();
        });
      });

      it('is not active with extraneous slashes', function (done) {
        (0, _reactDom.render)(_react2.default.createElement(
          _Router2.default,
          { history: (0, _createMemoryHistory2.default)('/parent/child') },
          _react2.default.createElement(
            _Route2.default,
            { path: '/parent' },
            _react2.default.createElement(_Route2.default, { path: 'child' })
          )
        ), node, function () {
          (0, _expect2.default)(this.router.isActive('/parent//child')).toBe(false);
          (0, _expect2.default)(this.router.isActive('/parent/child//')).toBe(false);
          done();
        });
      });

      it('is not active with missing slashes', function (done) {
        (0, _reactDom.render)(_react2.default.createElement(
          _Router2.default,
          { history: (0, _createMemoryHistory2.default)('/parent/child') },
          _react2.default.createElement(
            _Route2.default,
            { path: '/parent' },
            _react2.default.createElement(_Route2.default, { path: 'child' })
          )
        ), node, function () {
          (0, _expect2.default)(this.router.isActive('/parentchild')).toBe(false);
          done();
        });
      });
    });

    describe('on the parent', function () {
      it('is active for the parent', function (done) {
        (0, _reactDom.render)(_react2.default.createElement(
          _Router2.default,
          { history: (0, _createMemoryHistory2.default)('/parent') },
          _react2.default.createElement(
            _Route2.default,
            { path: '/parent' },
            _react2.default.createElement(_Route2.default, { path: 'child' })
          )
        ), node, function () {
          (0, _expect2.default)(this.router.isActive('/parent/child')).toBe(false);
          (0, _expect2.default)(this.router.isActive('/parent/child', true)).toBe(false);
          (0, _expect2.default)(this.router.isActive('/parent')).toBe(true);
          (0, _expect2.default)(this.router.isActive('/parent', true)).toBe(true);
          done();
        });
      });
    });
  });

  describe('a pathname that matches a parent route, but not the URL directly', function () {
    describe('with no query', function () {
      it('is active', function (done) {
        (0, _reactDom.render)(_react2.default.createElement(
          _Router2.default,
          { history: (0, _createMemoryHistory2.default)('/absolute') },
          _react2.default.createElement(
            _Route2.default,
            { path: '/home' },
            _react2.default.createElement(_Route2.default, { path: '/absolute' })
          )
        ), node, function () {
          (0, _expect2.default)(this.router.isActive('/home')).toBe(true);
          (0, _expect2.default)(this.router.isActive('/home', true)).toBe(false);
          done();
        });
      });
    });

    describe('with a query that also matches', function () {
      it('is active', function (done) {
        (0, _reactDom.render)(_react2.default.createElement(
          _Router2.default,
          { history: (0, _createMemoryHistory2.default)('/absolute?the=query') },
          _react2.default.createElement(
            _Route2.default,
            { path: '/home' },
            _react2.default.createElement(_Route2.default, { path: '/absolute' })
          )
        ), node, function () {
          (0, _expect2.default)(this.router.isActive({
            pathname: '/home',
            query: { the: 'query' }
          })).toBe(true);
          (0, _expect2.default)(this.router.isActive({
            pathname: '/home',
            query: { the: 'query' }
          }, true)).toBe(false);
          done();
        });
      });
    });

    describe('with a query that does not match', function () {
      it('is active', function (done) {
        (0, _reactDom.render)(_react2.default.createElement(
          _Router2.default,
          { history: (0, _createMemoryHistory2.default)('/absolute?the=query') },
          _react2.default.createElement(
            _Route2.default,
            { path: '/home' },
            _react2.default.createElement(_Route2.default, { path: '/absolute' })
          )
        ), node, function () {
          (0, _expect2.default)(this.router.isActive({
            pathname: '/home',
            query: { something: 'else' }
          })).toBe(false);
          (0, _expect2.default)(this.router.isActive({
            pathname: '/home',
            query: { something: 'else' }
          }, true)).toBe(false);
          done();
        });
      });
    });
  });

  describe('a pathname that matches a nested absolute path', function () {
    describe('with no query', function () {
      it('is active', function (done) {
        (0, _reactDom.render)(_react2.default.createElement(
          _Router2.default,
          { history: (0, _createMemoryHistory2.default)('/absolute') },
          _react2.default.createElement(
            _Route2.default,
            { path: '/home' },
            _react2.default.createElement(_Route2.default, { path: '/absolute' })
          )
        ), node, function () {
          (0, _expect2.default)(this.router.isActive('/absolute')).toBe(true);
          (0, _expect2.default)(this.router.isActive('/absolute', true)).toBe(true);
          done();
        });
      });
    });
  });

  describe('a pathname that matches an index URL', function () {
    describe('with no query', function () {
      it('is active', function (done) {
        (0, _reactDom.render)(_react2.default.createElement(
          _Router2.default,
          { history: (0, _createMemoryHistory2.default)('/home') },
          _react2.default.createElement(
            _Route2.default,
            { path: '/home' },
            _react2.default.createElement(_IndexRoute2.default, null)
          )
        ), node, function () {
          (0, _expect2.default)(this.router.isActive('/home')).toBe(true);
          (0, _expect2.default)(this.router.isActive('/home', true)).toBe(true);
          done();
        });
      });
    });

    describe('with a query that also matches', function () {
      it('is active', function (done) {
        (0, _reactDom.render)(_react2.default.createElement(
          _Router2.default,
          { history: (0, _createMemoryHistory2.default)('/home?the=query') },
          _react2.default.createElement(
            _Route2.default,
            { path: '/home' },
            _react2.default.createElement(_IndexRoute2.default, null)
          )
        ), node, function () {
          (0, _expect2.default)(this.router.isActive({
            pathname: '/home',
            query: { the: 'query' }
          })).toBe(true);
          (0, _expect2.default)(this.router.isActive({
            pathname: '/home',
            query: { the: 'query' }
          }, true)).toBe(true);
          done();
        });
      });
    });

    describe('with a query that does not match', function () {
      it('is not active', function (done) {
        (0, _reactDom.render)(_react2.default.createElement(
          _Router2.default,
          { history: (0, _createMemoryHistory2.default)('/home?the=query') },
          _react2.default.createElement(
            _Route2.default,
            { path: '/home' },
            _react2.default.createElement(_IndexRoute2.default, null)
          )
        ), node, function () {
          (0, _expect2.default)(this.router.isActive({
            pathname: '/home',
            query: { something: 'else' }
          })).toBe(false);
          (0, _expect2.default)(this.router.isActive({
            pathname: '/home',
            query: { something: 'else' }
          }, true)).toBe(false);
          done();
        });
      });
    });

    describe('with the index route nested under a pathless route', function () {
      it('is active', function (done) {
        (0, _reactDom.render)(_react2.default.createElement(
          _Router2.default,
          { history: (0, _createMemoryHistory2.default)('/home') },
          _react2.default.createElement(
            _Route2.default,
            { path: '/home' },
            _react2.default.createElement(
              _Route2.default,
              null,
              _react2.default.createElement(_IndexRoute2.default, null)
            )
          )
        ), node, function () {
          (0, _expect2.default)(this.router.isActive('/home')).toBe(true);
          (0, _expect2.default)(this.router.isActive('/home', true)).toBe(true);
          done();
        });
      });
    });

    describe('with a nested index route', function () {
      it('is active', function (done) {
        (0, _reactDom.render)(_react2.default.createElement(
          _Router2.default,
          { history: (0, _createMemoryHistory2.default)('/parent/child') },
          _react2.default.createElement(
            _Route2.default,
            { path: '/parent' },
            _react2.default.createElement(
              _Route2.default,
              { path: 'child' },
              _react2.default.createElement(_IndexRoute2.default, null)
            )
          )
        ), node, function () {
          (0, _expect2.default)(this.router.isActive('/parent/child')).toBe(true);
          (0, _expect2.default)(this.router.isActive('/parent/child', true)).toBe(true);
          done();
        });
      });

      it('is active with trailing slash on pattern', function (done) {
        (0, _reactDom.render)(_react2.default.createElement(
          _Router2.default,
          { history: (0, _createMemoryHistory2.default)('/parent/child') },
          _react2.default.createElement(
            _Route2.default,
            { path: '/parent' },
            _react2.default.createElement(
              _Route2.default,
              { path: 'child' },
              _react2.default.createElement(_IndexRoute2.default, null)
            )
          )
        ), node, function () {
          (0, _expect2.default)(this.router.isActive('/parent/child/')).toBe(true);
          (0, _expect2.default)(this.router.isActive('/parent/child/', true)).toBe(true);
          done();
        });
      });

      it('is active with trailing slash on location', function (done) {
        (0, _reactDom.render)(_react2.default.createElement(
          _Router2.default,
          { history: (0, _createMemoryHistory2.default)('/parent/child/') },
          _react2.default.createElement(
            _Route2.default,
            { path: '/parent' },
            _react2.default.createElement(
              _Route2.default,
              { path: 'child' },
              _react2.default.createElement(_IndexRoute2.default, null)
            )
          )
        ), node, function () {
          (0, _expect2.default)(this.router.isActive('/parent/child')).toBe(true);
          (0, _expect2.default)(this.router.isActive('/parent/child', true)).toBe(true);
          (0, _expect2.default)(this.router.isActive('/parent/child/')).toBe(true);
          (0, _expect2.default)(this.router.isActive('/parent/child/', true)).toBe(true);
          done();
        });
      });

      it('is not active with extraneous slashes', function (done) {
        (0, _reactDom.render)(_react2.default.createElement(
          _Router2.default,
          { history: (0, _createMemoryHistory2.default)('/parent/child') },
          _react2.default.createElement(
            _Route2.default,
            { path: '/parent' },
            _react2.default.createElement(
              _Route2.default,
              { path: 'child' },
              _react2.default.createElement(_IndexRoute2.default, null)
            )
          )
        ), node, function () {
          (0, _expect2.default)(this.router.isActive('/parent//child')).toBe(false);
          (0, _expect2.default)(this.router.isActive('/parent/child//')).toBe(false);
          (0, _expect2.default)(this.router.isActive('/parent//child', true)).toBe(false);
          (0, _expect2.default)(this.router.isActive('/parent/child//', true)).toBe(false);
          done();
        });
      });
    });

    describe('with a nested index route under a pathless route', function () {
      it('is active', function (done) {
        (0, _reactDom.render)(_react2.default.createElement(
          _Router2.default,
          { history: (0, _createMemoryHistory2.default)('/parent/child') },
          _react2.default.createElement(
            _Route2.default,
            { path: '/parent' },
            _react2.default.createElement(
              _Route2.default,
              { path: 'child' },
              _react2.default.createElement(
                _Route2.default,
                null,
                _react2.default.createElement(_IndexRoute2.default, null)
              )
            )
          )
        ), node, function () {
          (0, _expect2.default)(this.router.isActive('/parent/child')).toBe(true);
          (0, _expect2.default)(this.router.isActive('/parent/child', true)).toBe(true);
          done();
        });
      });

      it('is active with trailing slash on pattern', function (done) {
        (0, _reactDom.render)(_react2.default.createElement(
          _Router2.default,
          { history: (0, _createMemoryHistory2.default)('/parent/child') },
          _react2.default.createElement(
            _Route2.default,
            { path: '/parent' },
            _react2.default.createElement(
              _Route2.default,
              { path: 'child' },
              _react2.default.createElement(
                _Route2.default,
                null,
                _react2.default.createElement(_IndexRoute2.default, null)
              )
            )
          )
        ), node, function () {
          (0, _expect2.default)(this.router.isActive('/parent/child/')).toBe(true);
          (0, _expect2.default)(this.router.isActive('/parent/child/', true)).toBe(true);
          done();
        });
      });

      it('is active with trailing slash on location', function (done) {
        (0, _reactDom.render)(_react2.default.createElement(
          _Router2.default,
          { history: (0, _createMemoryHistory2.default)('/parent/child/') },
          _react2.default.createElement(
            _Route2.default,
            { path: '/parent' },
            _react2.default.createElement(
              _Route2.default,
              { path: 'child' },
              _react2.default.createElement(
                _Route2.default,
                null,
                _react2.default.createElement(_IndexRoute2.default, null)
              )
            )
          )
        ), node, function () {
          (0, _expect2.default)(this.router.isActive('/parent/child')).toBe(true);
          (0, _expect2.default)(this.router.isActive('/parent/child', true)).toBe(true);
          (0, _expect2.default)(this.router.isActive('/parent/child/')).toBe(true);
          (0, _expect2.default)(this.router.isActive('/parent/child/', true)).toBe(true);
          done();
        });
      });

      it('is not active with extraneous slashes', function (done) {
        (0, _reactDom.render)(_react2.default.createElement(
          _Router2.default,
          { history: (0, _createMemoryHistory2.default)('/parent/child') },
          _react2.default.createElement(
            _Route2.default,
            { path: '/parent' },
            _react2.default.createElement(
              _Route2.default,
              { path: 'child' },
              _react2.default.createElement(
                _Route2.default,
                null,
                _react2.default.createElement(_IndexRoute2.default, null)
              )
            )
          )
        ), node, function () {
          (0, _expect2.default)(this.router.isActive('/parent//child')).toBe(false);
          (0, _expect2.default)(this.router.isActive('/parent/child//')).toBe(false);
          (0, _expect2.default)(this.router.isActive('/parent//child', true)).toBe(false);
          (0, _expect2.default)(this.router.isActive('/parent/child//', true)).toBe(false);
          done();
        });
      });
    });
  });

  describe('a pathname that matches only the beginning of the URL', function () {
    it('is not active', function (done) {
      (0, _reactDom.render)(_react2.default.createElement(
        _Router2.default,
        { history: (0, _createMemoryHistory2.default)('/home') },
        _react2.default.createElement(_Route2.default, { path: '/home' })
      ), node, function () {
        (0, _expect2.default)(this.router.isActive('/h')).toBe(false);
        done();
      });
    });
  });

  describe('a pathname that matches the root URL only if it is a parent route', function () {
    it('is active', function (done) {
      (0, _reactDom.render)(_react2.default.createElement(
        _Router2.default,
        { history: (0, _createMemoryHistory2.default)('/home') },
        _react2.default.createElement(
          _Route2.default,
          { path: '/' },
          _react2.default.createElement(_Route2.default, { path: '/home' })
        )
      ), node, function () {
        (0, _expect2.default)(this.router.isActive('/')).toBe(true);
        done();
      });
    });
  });

  describe('a pathname that does not match the root URL if it is not a parent route', function () {
    it('is not active', function (done) {
      (0, _reactDom.render)(_react2.default.createElement(
        _Router2.default,
        { history: (0, _createMemoryHistory2.default)('/home') },
        _react2.default.createElement(_Route2.default, { path: '/' }),
        _react2.default.createElement(_Route2.default, { path: '/home' })
      ), node, function () {
        (0, _expect2.default)(this.router.isActive('/')).toBe(false);
        done();
      });
    });
  });

  describe('a pathname that matches URL', function () {
    describe('with query that does match', function () {
      it('is active', function (done) {
        (0, _reactDom.render)(_react2.default.createElement(
          _Router2.default,
          { history: (0, _createMemoryHistory2.default)('/home?foo=bar&foo=bar1&foo=bar2') },
          _react2.default.createElement(_Route2.default, { path: '/' }),
          _react2.default.createElement(_Route2.default, { path: '/home' })
        ), node, function () {
          (0, _expect2.default)(this.router.isActive({
            pathname: '/home',
            query: { foo: ['bar', 'bar1', 'bar2'] }
          })).toBe(true);
          done();
        });
      });
    });

    describe('with a custom parse function and a query that does not match', function () {
      it('is not active', function (done) {
        var history = (0, _createMemoryHistory2.default)({
          entries: ['/home?foo[1]=bar'],
          stringifyQuery: function stringifyQuery(params) {
            return _qs2.default.stringify(params, { arrayFormat: 'indices' });
          },
          parseQueryString: function parseQueryString(query) {
            return _qs2.default.parse(query, { parseArrays: false });
          }
        });

        (0, _reactDom.render)(_react2.default.createElement(
          _Router2.default,
          { history: history },
          _react2.default.createElement(_Route2.default, { path: '/' }),
          _react2.default.createElement(_Route2.default, { path: '/home' })
        ), node, function () {
          (0, _expect2.default)(this.router.isActive({
            pathname: '/home',
            query: { foo: { 4: 'bar' } }
          })).toBe(false);
          done();
        });
      });
    });

    describe('with a query with explicit undefined values', function () {
      it('matches missing query keys', function (done) {
        (0, _reactDom.render)(_react2.default.createElement(
          _Router2.default,
          { history: (0, _createMemoryHistory2.default)('/home?foo=1') },
          _react2.default.createElement(_Route2.default, { path: '/' }),
          _react2.default.createElement(_Route2.default, { path: '/home' })
        ), node, function () {
          (0, _expect2.default)(this.router.isActive({
            pathname: '/home',
            query: { foo: 1, bar: undefined }
          })).toBe(true);
          done();
        });
      });

      it('does not match a present query key', function (done) {
        (0, _reactDom.render)(_react2.default.createElement(
          _Router2.default,
          { history: (0, _createMemoryHistory2.default)('/home?foo=1&bar=') },
          _react2.default.createElement(_Route2.default, { path: '/' }),
          _react2.default.createElement(_Route2.default, { path: '/home' })
        ), node, function () {
          (0, _expect2.default)(this.router.isActive({
            pathname: '/home',
            query: { foo: 1, bar: undefined }
          })).toBe(false);
          done();
        });
      });
    });
  });

  describe('dynamic routes', function () {
    var routes = {
      path: '/',
      childRoutes: [{ path: 'foo' }],
      getIndexRoute: function getIndexRoute(partialNextState, callback) {
        setTimeout(function () {
          return callback(null, {});
        });
      }
    };

    describe('when not on index route', function () {
      it('does not show index as active', function (done) {
        (0, _reactDom.render)(_react2.default.createElement(_Router2.default, { history: (0, _createMemoryHistory2.default)('/foo'), routes: routes }), node, function () {
          (0, _expect2.default)(this.router.isActive('/')).toBe(true);
          (0, _expect2.default)(this.router.isActive('/', true)).toBe(false);
          (0, _expect2.default)(this.router.isActive('/foo')).toBe(true);
          done();
        });
      });
    });

    describe('when on index route', function () {
      it('shows index as active', function (done) {
        (0, _reactDom.render)(_react2.default.createElement(_Router2.default, { history: (0, _createMemoryHistory2.default)('/'), routes: routes }), node, function () {
          var _this = this;

          // Need to wait for async match to complete.
          setTimeout(function () {
            (0, _expect2.default)(_this.router.isActive('/')).toBe(true);
            (0, _expect2.default)(_this.router.isActive('/', true)).toBe(true);
            (0, _expect2.default)(_this.router.isActive('/foo')).toBe(false);
            done();
          });
        });
      });
    });
  });
});