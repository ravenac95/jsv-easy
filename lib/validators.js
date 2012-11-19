var Validator = require('validator').Validator;
var moment = require('moment');

// Collect errors instead of throwing
Validator.prototype.error = function(msg) {
  this._errors.push(msg);
  return this;
};

function check(string) {
  var ezValidator = new Validator();
  return ezValidator.check(string);
}


function validEmail(string) {
  var response = check(string).isEmail();
  if(response._errors.length > 0) {
    return false;
  }
  return true;
}

function validDateTime(string) {
  return moment(string, [
    'YYYY-MM-DDThh:mm:ssZ', 
    'YYYY-MM-DDThh:mm:ss.SSSZ'
  ]).isValid();
}

var dateRegex = new RegExp(/\d{4}-\d{2}-\d{2}/);

function validDate(string) {
  var matches = string.match(dateRegex);
  if(!matches) {
    return false;
  }
  return moment(string, 'YYYY-MM-DD').isValid();
}

function validTime(string) {
  return moment(string, 'hh:mm:ss').isValid();
}

var uuidRegex = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5]{1}[0-9a-f]{3}-[89ab]{1}[0-9a-f]{3}-[0-9a-f]{12}$/i);

function validUUID(string) {
  var matches = string.match(uuidRegex);
  if(!matches) {
    return false;
  }
  return true;
}

var uuid4Regex = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab]{1}[0-9a-f]{3}-[0-9a-f]{12}$/i);

function validUUID4(string) {
  var matches = string.match(uuid4Regex);
  if(!matches) {
    return false;
  }
  return true;
}

module.exports = {
  validEmail: validEmail,
  validDateTime: validDateTime,
  validDate: validDate,
  validTime: validTime,
  validUUID: validUUID,
  validUUID4: validUUID4
}
