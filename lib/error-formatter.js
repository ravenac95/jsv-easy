var url = require('url');

function ErrorFormatter(handlers) {
  this._handlers = handlers;
}

ErrorFormatter.prototype.format = function(report) {
  var handlers = this._handlers;
  // Format the errors
  var errors = report.errors;
  var formattedErrors = [];
  errors.forEach(function(error) {
    var handler = handlers[error.message];
    var newMessage = error.message;
    if(handler) {
      newMessage = handler(error);
    }
    var property = url.parse(error.uri).hash
    formattedErrors.push({ message: newMessage, property: property })

  }, this);
  return { valid: errors.length == 0, errors: formattedErrors };
};

module.exports = {
  ErrorFormatter: ErrorFormatter
}
