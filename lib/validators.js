var Validator = require('validator');
var moment = require('moment');

function validEmail(string) {
  return Validator.isEmail(string);
}

function validDateTime(string) {
  return moment(string, moment.ISO_8601, true).isValid();
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
  return moment(string, 'HH:mm:ss', true).isValid();
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
};
