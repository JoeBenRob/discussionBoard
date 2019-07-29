
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const item = require('../models/item_model')
const validateItem = require("../validation/item");

//*@route    GET item/all
//*@desc     Get all items
//*@access   Public
router.get("/all", (req, res) => {

    let errors = {};

    item.find()
        .then(items => {
            if (!items) {
                errors.noItem = "There are no items";
                res.status(404).json(errors);
            }
            res.json(items);
        })
        .catch(err => res.status(404).json({ noItem: "There are no items" }));
});

//*@route   POST item/create
//*@desc    Create an new item
//*@access  Public
router.post("/create", (req, res) => {

    const errors = {};
    const frank = new item({
        username: req.body.username,
        content: req.body.content
    });

    const response = validateItem(frank);
    if (response.isValid) {
        frank.save();
        res.status(200).json({ message: "item added" });
    } else {
        res.status(404).json(response.errors);
    }
});

//*@route   DELETE item/delete
//*@desc    delete an item by name
//*@access  Public
router.delete("/delete", (req, res) => {

    item.findOneAndDelete({ '_id': req.body._id })
        .then(() => {
            res.send('complete')
        })
        .catch(err => res.status(404).json(err));
});

module.exports = router;