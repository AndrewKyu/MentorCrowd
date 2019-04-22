const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEventInput(data) {
    let errors = {};
    
    data.event = !isEmpty(data.event) ? data.event : "";
    data.description = !isEmpty(data.description) ? data.description : "";
    data.from = !isEmpty(data.from) ? data.from : "";
    data.to = !isEmpty(data.to) ? data.to : "";
    data.eventdate = !isEmpty(data.eventdate) ? data.eventdate : "";

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

    if(Validator.isEmpty(data.eventdate)){
      errors.eventdate = "Date is required";
  }

  if(Validator.isEmpty(data.location)){
    errors.location = "Please specificy a location."
  }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
