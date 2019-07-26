const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true,
    },
});

var user = mongoose.model(
    'user',
    userSchema
);

module.exports = user;