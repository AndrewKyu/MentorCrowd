const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateConversationInput(data) {
  let conversationErrors = {};

  if (Validator.isEmpty(data)) {
    errors.recipient = "Recipient field is required";
  }

  return {
    conversationErrors,
    isConversationValid: isEmpty(conversationErrors)
  };
};
