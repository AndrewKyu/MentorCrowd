const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateMessageInput(data) {
  let messageErrors = {};

  data.message = !isEmpty(data.message) ? data.message : "";

  if (Validator.isEmpty(data.message)) {
    messageErrors.message = "Please enter a message.";
  }


  return {
    messageErrors,
    isMessageValid: isEmpty(messageErrors)
  };
};
