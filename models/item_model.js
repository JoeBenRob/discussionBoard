const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var itemSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

var item = mongoose.model(
    'item',
    itemSchema
);

module.exports = item;