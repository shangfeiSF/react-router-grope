'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Router = require('../Router');

var _Router2 = _interopRequireDefault(_Router);

var _Route = require('../Route');

var _Route2 = _interopRequireDefault(_Route);

var _createMemoryHistory = require('../createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _applyRouterMiddleware = require('../applyRouterMiddleware');

var _applyRouterMiddleware2 = _interopRequireDefault(_applyRouterMiddleware);

var _shouldWarn = require('./shouldWarn');

var _shouldWarn2 = _interopRequireDefault(_shouldWarn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FOO_ROOT_CONTAINER_TEXT = 'FOO ROOT CONTAINER';
var BAR_ROOT_CONTAINER_TEXT = 'BAR ROOT CONTAINER';
var BAZ_CONTAINER_TEXT = 'BAZ INJECTED';

var FooRootContainer = _react2.default.createClass({
  displayName: 'FooRootContainer',

  propTypes: { children: _react2.default.PropTypes.node.isRequired },
  childContextTypes: { foo: _react2.default.PropTypes.string },
  getChildContext: function getChildContext() {
    return { foo: FOO_ROOT_CONTAINER_TEXT };
  },
  render: function render() {
    return this.props.children;
  }
});

var FooContainer = _react2.default.createClass({
  displayName: 'FooContainer',

  propTypes: { children: _react2.default.PropTypes.node.isRequired },
  contextTypes: { foo: _react2.default.PropTypes.string.isRequired },
  render: function render() {
    var _props = this.props;
    var children = _props.children;

    var props = _objectWithoutProperties(_props, ['children']);

    var fooFromContext = this.context.foo;
    return (0, _react.cloneElement)(children, _extends({}, props, { fooFromContext: fooFromContext }));
  }
});

var useFoo = function useFoo() {
  return {
    renderRouterContext: function renderRouterContext(child) {
      return _react2.default.createElement(
        FooRootContainer,
        null,
        child
      );
    },
    renderRouteComponent: function renderRouteComponent(child) {
      return _react2.default.createElement(
        FooContainer,
        null,
        child
      );
    }
  };
};

var BarRootContainer = _react2.default.createClass({
  displayName: 'BarRootContainer',

  propTypes: { children: _react2.default.PropTypes.node.isRequired },
  childContextTypes: { bar: _react2.default.PropTypes.string },
  getChildContext: function getChildContext() {
    return { bar: BAR_ROOT_CONTAINER_TEXT };
  },
  render: function render() {
    return this.props.children;
  }
});

var BarContainer = _react2.default.createClass({
  displayName: 'BarContainer',

  propTypes: { children: _react2.default.PropTypes.node.isRequired },
  contextTypes: { bar: _react2.default.PropTypes.string.isRequired },
  render: function render() {
    var _props2 = this.props;
    var children = _props2.children;

    var props = _objectWithoutProperties(_props2, ['children']);

    var barFromContext = this.context.bar;
    return (0, _react.cloneElement)(children, _extends({}, props, { barFromContext: barFromContext }));
  }
});

var useBar = function useBar() {
  return {
    renderRouterContext: function renderRouterContext(child) {
      return _react2.default.createElement(
        BarRootContainer,
        null,
        child
      );
    },
    renderRouteComponent: function renderRouteComponent(child) {
      return _react2.default.createElement(
        BarContainer,
        null,
        child
      );
    }
  };
};

var useBaz = function useBaz(bazInjected) {
  return {
    renderRouteComponent: function renderRouteComponent(child) {
      return (0, _react.cloneElement)(child, { bazInjected: bazInjected });
    }
  };
};

var run = function run(_ref, assertion) {
  var renderWithMiddleware = _ref.renderWithMiddleware;
  var Component = _ref.Component;

  var div = document.createElement('div');
  var routes = _react2.default.createElement(_Route2.default, { path: '/', component: Component });
  (0, _reactDom.render)(_react2.default.createElement(_Router2.default, {
    render: renderWithMiddleware,
    routes: routes,
    history: (0, _createMemoryHistory2.default)('/')
  }), div, function () {
    return assertion(div.innerHTML);
  });
};

describe('applyMiddleware', function () {

  it('applies one middleware', function (done) {
    run({
      renderWithMiddleware: (0, _applyRouterMiddleware2.default)(useFoo()),
      Component: function Component(props) {
        return _react2.default.createElement(
          'div',
          null,
          props.fooFromContext
        );
      }
    }, function (html) {
      (0, _expect2.default)(html).toContain(FOO_ROOT_CONTAINER_TEXT);
      done();
    });
  });

  it('applies more than one middleware', function (done) {
    run({
      renderWithMiddleware: (0, _applyRouterMiddleware2.default)(useBar(), useFoo()),
      Component: function Component(props) {
        return _react2.default.createElement(
          'div',
          null,
          props.fooFromContext,
          ' ',
          props.barFromContext
        );
      }
    }, function (html) {
      (0, _expect2.default)(html).toContain(FOO_ROOT_CONTAINER_TEXT);
      (0, _expect2.default)(html).toContain(BAR_ROOT_CONTAINER_TEXT);
      done();
    });
  });

  it('applies more middleware with only `getContainer`', function (done) {
    run({
      renderWithMiddleware: (0, _applyRouterMiddleware2.default)(useBar(), useFoo(), useBaz(BAZ_CONTAINER_TEXT)),
      Component: function Component(props) {
        return _react2.default.createElement(
          'div',
          null,
          props.fooFromContext,
          props.barFromContext,
          props.bazInjected
        );
      }
    }, function (html) {
      (0, _expect2.default)(html).toContain(FOO_ROOT_CONTAINER_TEXT);
      (0, _expect2.default)(html).toContain(BAR_ROOT_CONTAINER_TEXT);
      (0, _expect2.default)(html).toContain(BAZ_CONTAINER_TEXT);
      done();
    });
  });

  it('applies middleware that only has `getContainer`', function (done) {
    run({
      renderWithMiddleware: (0, _applyRouterMiddleware2.default)(useBaz(BAZ_CONTAINER_TEXT)),
      Component: function Component(props) {
        return _react2.default.createElement(
          'div',
          null,
          props.bazInjected
        );
      }
    }, function (html) {
      (0, _expect2.default)(html).toContain(BAZ_CONTAINER_TEXT);
      done();
    });
  });

  it('should warn on invalid middleware', function () {
    (0, _shouldWarn2.default)('at index 0 does not appear to be a valid');
    (0, _shouldWarn2.default)('at index 2 does not appear to be a valid');

    (0, _applyRouterMiddleware2.default)({}, { renderRouterContext: function renderRouterContext() {} }, {});
  });
});