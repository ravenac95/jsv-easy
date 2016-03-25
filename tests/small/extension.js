/**
 * Test the customEnvironment
 */
var assert = require('chai').assert;
var sinon = require('sinon');
var JSV = require('../../lib/extension').JSV;
var _ = require('lodash');

describe('jsv-easy Custom JSV Environment', function() {
  describe('Creating a jsv easy environment', function() {
    it('should create a new jsv-easy environment', function() {
      var env = JSV.createEnvironment('jsv-easy-draft-03');
      assert.isUndefined(env.findSchema('jsv-easy-draft-03'));
    });
  });

  describe('#validate', function() {
    var env;
    beforeEach(function() {
      env = JSV.createEnvironment('jsv-easy-draft-03');
    });

    it('should validate an empty object', function() {
      var input = {};
      var schema = {
        type: "object"
      };
      var report = env.validate(input, schema);
      assert.lengthOf(report.errors, 0);
    });

    it('should not validate', function() {
      var input = [];
      var schema = {
        type: "object"
      };
      var report = env.validate(input, schema);
      assert.lengthOf(report.errors, 1);
    });

    var normalPropertiesTests = {
      array: [
        [],
        [0],
        [1,2,3]
      ],
      string: [
        '',
        'hello'
      ],
      integer: [
        0,
        1,
        2
      ],
      number: [
        1.3,
        2.0,
        -10
      ],
      'boolean': [
        true,
        false
      ],
      object: [
        {},
        { test: 'hello' }
      ],
      'null': [
        null
      ],
      any: [
        {},
        'hello',
        12.40,
        10000
      ]
    };

    _.each(normalPropertiesTests, function(tests, name) {
      it('should validate ' + name + 's', function() {
        var testSchema = {
          type: 'object',
          properties: {
            test: {
              type: name
            }
          }
        };
        tests.forEach(function(test) {
          var testObj = {
            test: test
          };
          var report = env.validate(testObj, testSchema);
          assert.lengthOf(report.errors, 0);
        });
      });
    });

    var stringFormats = {
      date: {
        good: [
          '2012-12-01',
          '2012-01-31',
          '2300-11-30'
        ],
        bad: [
          '2500-60-60',
          0
        ]
      },
      'date-time': {
        good: [
          '2012-12-20T00:00:00Z'
        ],
        bad: [
          'January 12th, 2012 00:00:00',
          0
        ]
      },
      email: {
        good: [
          'test@example.com',
          'tester@gmail.com'
        ],
        bad: [
          'test[at]example.com',
          1
        ]
      },
      time: {
        good: [
          '00:00:00',
          '12:12:12'
        ],
        bad: [
          '99:99:99',
          1
        ]
      },
      uuid: {
        good: [
          '00000000-0000-1000-8000-000000000000'
        ],
        bad: [
          'hello',
          1
        ]
      },
      uuid4: {
        good: [
          '550e8400-e29b-41d4-a716-446655440000'
        ],
        bad: [
          '550e8400-e29b-41d4-1716-446655440000',
          'hello',
          1
        ]
      }
    };

    _.each(stringFormats, function(tests, format) {
      var testSchema = {
        type: 'object',
        properties: {
          test: {
            type: 'string',
            format: format
          }
        }
      };
      it('should validate ' + format + ' format', function() {
        tests.good.forEach(function(test) {
          var testObj = {
            test: test
          };
          var report = env.validate(testObj, testSchema);
          if (format === 'email') {
            debugger;
          }
          assert.lengthOf(report.errors, 0);
        });
      });

      it('should not validate ' + format + ' format', function() {
        tests.bad.forEach(function(test) {
          var testObj = {
            test: test
          };
          var report = env.validate(testObj, testSchema);
          assert.isTrue(report.errors.length > 0);
        });
      });
    });
  });
});
