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
  return formattedErrors;
};

var easyErrorFormatter = new ErrorFormatter({
  'Instance is not a required type': function(error) {
    var message = 'A';
    var details = error.details;
    var detailsLength = details.length;
    if(['a', 'e', 'i', 'o', 'u'].indexOf(details[0]) > -1) {
      message = 'An';
    }
    if(detailsLength == 1) {
      message += ' ' + details[0] + ' is required';
    }
    else {
      details.forEach(function(type, index) {
        if(index < detailsLength - 1 && index > 0) {
          message += ', ';
        } else {
          message += ' or ';
        }
        message += type;
      });
      message += ' is required.';
    }
    return message;
  }
});

module.exports = {
  ErrorFormatter: ErrorFormatter,
  easyErrorFormatter: easyErrorFormatter
}
