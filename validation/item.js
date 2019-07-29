
const Validator = require("validator");
const isEmpty = require("./is-empty");

function validateItem(data) {
    let errors = {};

    // data.name = !isEmpty(data.name) ? data.name : "";
    data.content = !isEmpty(data.content) ? data.content : "";
    data.username = !isEmpty(data.username) ? data.username : "";
    //data.inputPassword = !isEmpty(data.inputPassword) ? data.inputPassword : "";


    // if (!Validator.isAlphanumeric(data.name)) {
    //     errors.name = "name must contain only letters and numbers";
    // }

    // if (Validator.isEmpty(data.name)) {
    //     errors.name = "name must not be left empty";
    // }

    if (Validator.isEmpty(data.content)) {
        errors.content = "content must not be left empty";
    }

    if (Validator.isEmpty(data.username)) {
        errors.username = "username must not be left empty";
    }

    // if (Validator.isEmpty(data.inputPassword)) {
    //     errors.inputPassword = "inputPassword must not be left empty";
    // }

    return {
        errors,
        isValid: isEmpty(errors)
    };


};

module.exports = validateItem;  