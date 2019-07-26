
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const item = require('../models/item_model')
const user = require('../models/user_model')
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

//*@route   GET item/item
//*@desc    Get all items from one name
//*@access  Public
router.get("/item", (req, res) => {

    let errors = {};

    item.find({ items: req.body.items })
        .then(item => {
            if (!item) {
                errors.noItem = "There are no item";
                res.status(404).json(errors);
            }
            res.json(item);
        })
        .catch(err => res.status(404).json({ noItem: "There are no item" }));
});

//*@route   POST item/create
//*@desc    Create an new item
//*@access  Public
router.post("/create", (req, res) => {


    user.findOne({ username: req.body.username }).then(foundUser => {

        const hashedValue = foundUser.password;
        const value = req.body.inputPassword;

        bcrypt.compare(value, hashedValue).then(isMatch => {

            if (!isMatch) {
                return res.status(400).json("incorrect password");
            } else {
                const { errors, isValid } = validateItem(req.body);
                if (!isValid) {
                    return res.status(400).json(err);
                }
                else {
                    const newItem = new item({
                        name: req.body.name,
                        content: req.body.content,
                    });
                    newItem.save().then(res.send('complete'))
                        .catch(err => console.log(err));
                }
            };
        });
    })
});

// @route   PUT item/update
// @desc    Update first item
// @access  Public
router.put("/update", (req, res) => {

    let errors = {};

    const newItem = new item({
        name: req.body.name,
        content: req.body.content,
    });

    user.findOne({ username: req.body.username }).then(foundUser => {

        const hashedValue = foundUser.password;
        const value = req.body.inputPassword;

        bcrypt.compare(value, hashedValue).then(isMatch => {

            if (!isMatch) {
                return res.status(400).json("incorrect password");
            } else {

                item.findOne({ name: req.body.name })
                    .then(item => {
                        if (!item) {
                            errors.noItem = "There are no items with this name";
                            res.status(404).json(errors);
                        }
                        item.remove().then(() => {
                            res.json({ success: true });
                        })
                            .catch(err =>
                                res.status(404).json({ itemNotFound: "No item found" })
                            )
                            .then(() => {
                                newItem.save().then(res.send('complete'))
                            })
                            .catch(err => console.log(err));
                    })
                    .catch(err => res.status(404).json({ noItem: "There is no item with this name" }));
            };
        });
    });
});

//*@route   DELETE item/delete
//*@desc    delete an item by name
//*@access  Public
router.delete("/delete", (req, res) => {

    let errors = {};

    user.findOne({ username: req.body.username }).then(foundUser => {

        const hashedValue = foundUser.password;
        const value = req.body.inputPassword;

        bcrypt.compare(value, hashedValue).then(isMatch => {

            if (!isMatch) {
                return res.status(400).json("incorrect password");
            } else {
                item.findOneAndDelete({ 'name': req.body.name })
                    .then(() => {
                        res.send('complete')
                    })
                    .catch(err => res.status(404).json({ noItem: "There is no item with this name" }));
            };
        });
    })
});

//*@route   DELETE item/deleteAll
//*@desc    delete all item of a name
//*@access  Public
router.delete("/deleteAll", (req, res) => {

    let errors = {};

    user.findOne({ username: req.body.username }).then(foundUser => {

        const hashedValue = foundUser.password;
        const value = req.body.inputPassword;

        bcrypt.compare(value, hashedValue).then(isMatch => {

            if (!isMatch) {
                return res.status(400).json("incorrect password");
            } else {
                item.deleteMany({ 'name': req.body.name })
                    .then(() =>
                        res.send('complete'));
            }
        }
        )
    })
});

module.exports = router;