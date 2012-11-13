var validators = require('./validators');
var JSV = require('jsv').JSV;

// Create a custom environment
var customEnvironment = JSV.createEnvironment();

var draft3Base = customEnvironment.findSchema(
                    'http://json-schema.org/draft-03/schema#');

var customSchema = JSV.inherits(draft3Base, {
  "$schema": "http://json-schema.org/draft-03/schema#",
  id: "urn:jsv-easy/draft-03/schema#",
  properties: {
    format: {
      formatValidators: {
        date: function(instance, report) {
          var value = instance.getValue();
          return validators.validDate(value);
        },
        'date-time': function(instance, report) {
          var value = instance.getValue();
          return validators.validDateTime(value);
        },
        email: function(instance, report) {
          var value = instance.getValue();
          return validators.validEmail(value);
        },
        time: function(instance, report) {
          var value = instance.getValue();
          return validators.validTime(value);
        },
        uuid: function(instance, report) {
          var value = instance.getValue();
          return validators.validUUID(value);
        },
        uuid4: function(instance, report) {
          var value = instance.getValue();
          return validators.validUUID4(value);
        }
      }
    }
  }
});

// Add the schema to the environment
customEnvironment.createSchema(customSchema);

// Set it as the latest JSON Schema, Schema
customEnvironment.setOption('latestJSONSchemaSchemaURI', 
                            'urn:jsv-easy/draft-03/schema#');
// Set it as the default
customEnvironment.setOption('defaultSchemaURI', 
                            'urn:jsv-easy/draft-03/schema#');

// Register the custom environment to JSV
JSV.registerEnvironment('jsv-easy-draft-03', customEnvironment);

module.exports = {
  JSV: JSV
}
