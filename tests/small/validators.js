var assert = require('chai').assert;
var validators = require('../../lib/validators');


/**
 * A common validator test generator
 */
function commonValidatorTests(options) {
  try {
    assert.isDefined(options.type);
    assert.isDefined(options.valid);
    assert.isDefined(options.invalid);
    assert.isDefined(options.validator);
  } catch(e) {
    throw new Error('commonValidatorTests missing options');
  }
  var type = options.type;
  var valid = options.valid;
  var invalid = options.invalid;
  var validator = options.validator;

  valid.forEach(function(test) {
    it('should validate ```' + test + '``` as a type of ' + type, function() {
      assert.isTrue(validator(test));
    });
  });
  invalid.forEach(function(test) {
    it('should not validate ```' + test + '``` as a type of ' + type, function() {
      assert.isFalse(validator(test));
    });
  });
}

describe('validEmail', function() {
  var validEmail = validators.validEmail;

  commonValidatorTests({
    type: 'email',
    validator: validEmail,
    valid: [
      'test@example.com',
      'another@example.com',
      '+++@gmail.com'
    ],
    invalid: [
      'testatexample.com',
      'asdfafafasdfa sdf asdf'
    ]
  });
});

describe('validDateTime', function() {
  var validDateTime = validators.validDateTime;

  commonValidatorTests({
    type: 'date-time',
    validator: validDateTime,
    valid: [
      '2012-01-01T00:00:00Z',
      '2012-01-01T00:00:00+00:00',
      '2012-01-01T00:00:00.123+00:00',
      '2400-01-12T00:00:00.123Z'
    ],
    invalid: [
      '2012-01-01T00:00:00',
      '2012-01-01T00:00:00+1',
      '2012-14-01T00:00:00+1',
      '5PM, January 1, 2014'
    ]
  });
});

describe('validDate', function() {
  var validDate = validators.validDate;

  commonValidatorTests({
    type: 'date',
    validator: validDate,
    valid: [
      '2012-01-01',
      '2012-10-31'
    ],
    invalid: [
      '10-12-2012',
      '2012-13-01',
      '2012-02-30'
    ]
  });
});

describe('validTime', function() {
  var validTime = validators.validTime;
  
  commonValidatorTests({
    type: 'time',
    validator: validTime,
    valid: [
      '00:00:00',
      '23:59:59'
    ],
    invalid: [
      '99:00:00',
      '24:00:00',
      '05:00 PM'
    ]
  });
});

describe('validUUID', function() {
  var validUUID = validators.validUUID;

  commonValidatorTests({
    type: 'uuid',
    validator: validUUID,
    valid: [
      '550e8400-e29b-41d4-a716-446655440000',
      '550E8400-E29b-11d4-A716-446655440000'
    ],
    invalid: [
      '11550E8400-E29b-41d4-A716-44665544000011',
      'rrrrrrrr-1111-1212-1222-000000000000',
      '550e8400e29b41d4a716446655440000'
    ]
  });
});

describe('validUUID4', function() {
  var validUUID4 = validators.validUUID4;

  commonValidatorTests({
    type: 'uuid4',
    validator: validUUID4,
    valid: [
      '550e8400-e29b-41d4-a716-446655440000'
    ],
    invalid: [
      '11550e8400-e29b-41d4-a716-44665544000022',
      '550e8400-e29b-41d4-1716-446655440000',
      '550e8400-e29b-31d4-a716-446655440000',
      '550e8400e29b41d4a716446655440000'
    ]
  });
});
