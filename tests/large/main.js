/**
 * Main API tests with no mocks
 */
var assert = require('chai').assert;
var jsveasy = require('../../lib/jsv-easy');

describe('Main API (without mocks)', function() {
  describe('#validate', function() {
    it('should validate', function() {
      var response = jsveasy.validate({ a: 'hello' }, { 
        type: 'object', 
        properties: { 
          a: { type: 'string' } 
        }
      });
      assert.deepEqual(response, { valid: true, errors: [] });
    });

    it('should not validate', function() {
      var response = jsveasy.validate({ a: 1 }, { 
        type: 'object', 
        properties: { 
          a: { type: 'string' } 
        }
      });
      assert.deepEqual(response, { 
        valid: false, 
        errors: [
          {
            message: 'A string is required',
            property: '#/a'
          }
        ] 
      });
    });
  });
});
