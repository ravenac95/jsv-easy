/**
 * Tests for the ErrorFormatter
 */
var assert = require('chai').assert;
var sinon = require('sinon');
var ErrorFormatter = require('../../lib/report-formatter').ErrorFormatter;

// for mocking
var FUNC = function() {};

describe('ErrorFormatter', function() {
  describe('#constructor', function() {
    it('should construct', function() {
      var formatter = new ErrorFormatter({});
    });
  });

  describe('#format', function() {
    var formatter;
    var mockHandlers;
    beforeEach(function() {
      mockHandlers = sinon.mock({ a: FUNC, b: FUNC, c: FUNC });
      formatter = new ErrorFormatter(mockHandlers.object);
    });
    it('should call a handler', function() {
      var error1 = { message: 'a', uri: 'urn:test#/a' };
      var report = {
        errors: [
          error1
        ]
      };
      var retVal = 'new message';
      mockHandlers.expects('a').withArgs(error1).returns(retVal);
      var formatted = formatter.format(report);
      assert.deepEqual(formatted, { 
        valid: false, 
        errors: [{ message: retVal, property: '#/a' }]
      });
      mockHandlers.verify();
    });

    it('should call multiple handler', function() {
      var error1 = { message: 'a', uri: 'urn:test#/a' };
      var error2 = { message: 'b', uri: 'urn:test#/b' };
      var error3 = { message: 'c', uri: 'urn:test#/c' };

      var report = {
        errors: [
          error1,
          error2,
          error3
        ]
      };

      var retVal = 'new message';
      mockHandlers
        .expects('a').withArgs(error1)
      mockHandlers
        .expects('b').withArgs(error2)
      mockHandlers
        .expects('c').withArgs(error3);
      var formatted = formatter.format(report);
      assert.lengthOf(formatted.errors, 3);
      mockHandlers.verify();
    });
  });
});
