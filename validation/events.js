const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEventInput(data) {
    let errors = {};
    
    data.event = !isEmpty(data.event) ? data.event : "";
    data.description = !isEmpty(data.description) ? data.description : "";
    data.from = !isEmpty(data.from) ? data.from : "";
    data.to = !isEmpty(data.to) ? data.to : "";

    if(Validator.isEmpty(data.event)){
      errors.event = "Event name is required";
    }

    if(Validator.isEmpty(data.description)){
      errors.description = "Description of the event is required";
    }

    if(Validator.isEmpty(data.from)){
        errors.from = "Please specify a start time";
    }

    if(Validator.isEmpty(data.to)){
        errors.to = "Please specify an end time";
    }

    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
