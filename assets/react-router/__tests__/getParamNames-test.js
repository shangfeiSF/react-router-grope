'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _PatternUtils = require('../PatternUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getParamNames', function () {
  describe('when a pattern contains no dynamic segments', function () {
    it('returns an empty array', function () {
      (0, _expect2.default)((0, _PatternUtils.getParamNames)('a/b/c')).toEqual([]);
    });
  });

  describe('when a pattern contains :a and :b dynamic segments', function () {
    it('returns the correct names', function () {
      (0, _expect2.default)((0, _PatternUtils.getParamNames)('/comments/:a/:b/edit')).toEqual(['a', 'b']);
    });
  });

  describe('when a pattern has a *', function () {
    it('uses the name "splat"', function () {
      (0, _expect2.default)((0, _PatternUtils.getParamNames)('/files/*.jpg')).toEqual(['splat']);
    });
  });

  describe('when a pattern has the same name as a built-in method', function () {
    it('should work', function () {
      (0, _expect2.default)((0, _PatternUtils.getParamNames)('toString')).toEqual([]);
    });
  });
});