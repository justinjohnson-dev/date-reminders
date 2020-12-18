const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateUserInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.phone_number = !isEmpty(data.phone_number) ? data.phone_number : "";

    // name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name is required";
    }
    // phone number checks
    if (Validator.isEmpty(data.phone_number)) {
        errors.phone_number = "Phone Number is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};