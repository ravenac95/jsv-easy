var assert = require('chai').assert;
var sinon = require('sinon');
var JSV = require('jsv').JSV;
var jsveasy = require('../../lib/jsv-easy');

describe('Main API', function() {
  describe('#validate', function() {
    var stubCreateEnv;
    var mockEnv;
    beforeEach(function() {
      mockEnv = sinon.mock({
        validate: function() {}
      });
      stubCreateEnv = sinon.stub(JSV, 'createEnvironment');
      stubCreateEnv.returns(mockEnv.object);
    });

    afterEach(function() {
      stubCreateEnv.restore();
    });

    it('should validate', function() {
      var input = {};
      var schema = { type: 'object' };
      mockEnv.expects('validate')
        .withArgs(input, schema)
        .returns({ 
          errors: []
        });
      var response = jsveasy.validate(input, schema);
      assert.isTrue(response.valid);
      mockEnv.verify();
    });

    it('should not validate', function() {
      var input = { a: 1 };
      var schema = {};
      mockEnv.expects('validate')
        .withArgs(input, schema)
        .returns({
          errors: [
            {
              message: 'Instance is not a required type',
              uri: 'urn:uuid:something#/a',
              schemaUri: 'urn:uuid:something#/a',
              attribute: 'type',
              details: ['string']
            }
          ]
        });
      var response = jsveasy.validate(input, schema);
      assert.isFalse(response.valid);
      assert.equal(response.errors[0].property, '#/a');
      assert.equal(response.errors[0].message, 'A string is required');
      mockEnv.verify();
    });
  });
});
