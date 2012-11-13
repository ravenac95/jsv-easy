var assert = require('chai').assert;
var sinon = require('sinon');
var JSV = require('jsv').JSV;
var jsveasy = require('../../lib/jsv-easy');
var easyErrorFormatter = require('../../lib/error-formatter').easyErrorFormatter;

describe('Main API', function() {
  describe('#validate', function() {
    var stubCreateEnv;
    var stubErrorFormat;
    var mockEnv;
    beforeEach(function() {
      mockEnv = sinon.mock({
        validate: function() {}
      });
      //var anErrorFormatter = new errorFormatterModule.ErrorFormatter();
      stubErrorFormat = sinon.stub(easyErrorFormatter, 'format');
      stubCreateEnv = sinon.stub(JSV, 'createEnvironment');
      stubCreateEnv.returns(mockEnv.object);
    });

    afterEach(function() {
      stubErrorFormat.restore();
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
      var errors = [{}];
      mockEnv.expects('validate')
        .withArgs(input, schema)
        .returns({
          errors: errors
        });
      stubErrorFormat.returns([{ property: '#/a', message: 'A string is required'}])
      var response = jsveasy.validate(input, schema);
      assert.isFalse(response.valid);
      assert.equal(response.errors[0].property, '#/a');
      assert.equal(response.errors[0].message, 'A string is required');
      mockEnv.verify();
    });
  });
});
