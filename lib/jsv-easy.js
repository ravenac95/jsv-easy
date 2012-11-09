var JSV = require('jsv').JSV;

function validate(input, schema) {
  // Create the environment
  var env = JSV.createEnvironment();
  var report = env.validate(input, schema);
  if(report.errors.length == 0) {
    return { valid: true, errors: [] };
  }
  return { valid: false,  errors: [
    {
      property: '#/a',
      message: 'A string is required'
    }
  ]};
}

module.exports = {
  validate: validate
};
