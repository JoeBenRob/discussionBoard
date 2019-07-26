
const Validator = require("validator");
const isEmpty = require("./is-empty");

function validateUser(data) {
    let errors = {};

    //check if data is null / undefined, if true, make username = ""
    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    //username is invalid if it contains anything other than alpha numeric characters
    if (!Validator.isAlphanumeric(data.username)) {
        errors.username = "Username must contain only letters and numbers";
    }

    //if username is empty, error
    if (Validator.isEmpty(data.username)) {
        errors.username = "Username must not be left empty";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email must not be left empty";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password must not be left empty";
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password = "Password must not be left empty";
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password = "Passwords do not match"
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is not valid"
    }

    //return the errors and a true false value for 'isValid' is errors is empty
    return {
        errors,
        isValid: isEmpty(errors)
    };


};

module.exports = validateUser;