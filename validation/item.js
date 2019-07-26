
const Validator = require("validator");
const isEmpty = require("./is-empty");

function validateItem(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.content = !isEmpty(data.content) ? data.content : "";

    if (!Validator.isAlphanumeric(data.name)) {
        errors.name = "name must contain only letters and numbers";
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = "name must not be left empty";
    }

    if (Validator.isEmpty(data.content)) {
        errors.content = "content must not be left empty";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };


};

module.exports = validateItem;  