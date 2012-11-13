var JSV = require('jsv').JSV;
var easyErrorFormatter = require('./error-formatter').easyErrorFormatter;

function validate(input, schema) {
  // Create the environment
  var env = JSV.createEnvironment();
  var report = env.validate(input, schema);
  if(report.errors.length == 0) {
    return { valid: true, errors: [] };
  }

  var formattedErrors = easyErrorFormatter.format(report);

  return { valid: false, errors: formattedErrors };
}

module.exports = {
  validate: validate
};
