const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var itemSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true, index: true
    },
    content: {
        type: String,
        required: true,
    }
});

var item = mongoose.model(
    'item',
    itemSchema
);

module.exports = item;