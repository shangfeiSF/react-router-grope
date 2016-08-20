'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _History = require('../History');

var _History2 = _interopRequireDefault(_History);

var _Router = require('../Router');

var _Router2 = _interopRequireDefault(_Router);

var _Route = require('../Route');

var _Route2 = _interopRequireDefault(_Route);

var _createMemoryHistory = require('history/lib/createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _shouldWarn = require('./shouldWarn');

var _shouldWarn2 = _interopRequireDefault(_shouldWarn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('v1 History Mixin', function () {

  var node = void 0;
  beforeEach(function () {
    node = document.createElement('div');
  });

  afterEach(function () {
    (0, _reactDom.unmountComponentAtNode)(node);
  });

  beforeEach(function () {
    (0, _shouldWarn2.default)('deprecated');
  });

  it('assigns the history to the component instance', function (done) {

    var history = (0, _createMemoryHistory2.default)('/');

    var Component = _react2.default.createClass({
      displayName: 'Component',

      mixins: [_History2.default],
      componentWillMount: function componentWillMount() {
        (0, _expect2.default)(this.history).toExist();
      },
      render: function render() {
        return null;
      }
    });

    (0, _reactDom.render)(_react2.default.createElement(
      _Router2.default,
      { history: history },
      _react2.default.createElement(_Route2.default, { path: '/', component: Component })
    ), node, done);
  });
});