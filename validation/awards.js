const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateAwardInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Award title field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
