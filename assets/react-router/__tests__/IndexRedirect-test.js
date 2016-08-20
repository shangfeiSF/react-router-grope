'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _createMemoryHistory = require('../createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _IndexRedirect = require('../IndexRedirect');

var _IndexRedirect2 = _interopRequireDefault(_IndexRedirect);

var _Router = require('../Router');

var _Router2 = _interopRequireDefault(_Router);

var _Route = require('../Route');

var _Route2 = _interopRequireDefault(_Route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('An <IndexRedirect>', function () {

  var node = void 0;
  beforeEach(function () {
    node = document.createElement('div');
  });

  afterEach(function () {
    (0, _reactDom.unmountComponentAtNode)(node);
  });

  it('works', function (done) {
    (0, _reactDom.render)(_react2.default.createElement(
      _Router2.default,
      { history: (0, _createMemoryHistory2.default)('/') },
      _react2.default.createElement(
        _Route2.default,
        { path: '/' },
        _react2.default.createElement(_IndexRedirect2.default, { to: '/messages' }),
        _react2.default.createElement(_Route2.default, { path: 'messages' })
      )
    ), node, function () {
      (0, _expect2.default)(this.state.location.pathname).toEqual('/messages');
      done();
    });
  });
});