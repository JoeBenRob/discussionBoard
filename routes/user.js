
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const user = require('../models/user_model')
const validateUser = require("../validation/User");

//*@route    GET user/all
//*@desc     Get all users
//*@access   Public
router.get("/all", (req, res) => {

    let errors = {};

    user.find()
        .then(users => {
            if (!users) {
                errors.noUser = "There are no users";
                res.status(404).json(errors);
            }
            res.json(users);
        })
        .catch(err => res.status(404).json({ noUser: "There are no users" }));
});

//*@route   GET user/getUser
//*@desc    Get all users from one username
//*@access  Public
router.get("/username", (req, res) => {

    user.find({ username: req.body.username })
        .then(user => {
            if (!user) {
                errors.noUser = "There are no user";
                res.status(404).json(errors);
            }
            res.json(user);
        })
        .catch(err => res.status(404).json({ noUser: "There are no user" }));
});

//*@route   POST user/create
//*@desc    Create an new user
//*@access  Public
router.post("/create", (req, res) => {

    const { errors, isValid } = validateUser(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const newUser = new user({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(res.send('complete'))
                .catch(err => console.log(err));
        });
    });
});

// @route   PUT user/updateUser
// @desc    Update first user
// @access  Public
router.put("/update", (req, res) => {

    const { errors, isValid } = validateUser(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const newUser = new user({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            user.findOne({ username: req.body.username })
                .then(user => {
                    if (!user) {
                        errors.noUser = "There are no users with this name";
                        res.status(404).json(errors);
                    }
                    user.remove().then(() => {
                        res.json({ success: true });
                    })
                        .catch(err =>
                            res.status(404).json({ userNotFound: "No user found" })
                        );

                    newUser.save().then(res.send('complete'))
                        .catch(err => console.log(err));

                })
                .catch(err => res.status(404).json({ noUser: "There are is no user with this name" }));
        });
    });
});

//*@route   DELETE user/delete
//*@desc    delete an user by username
//*@access  Public
router.delete("/delete", (req, res) => {

    let errors = {};

    user.findOneAndDelete({ 'username': req.body.username })
        .then(() =>
            res.send('complete'));
});

//*@route   DELETE user/deleteAll
//*@desc    delete all user of a username
//*@access  Public
router.delete("/deleteAll", (req, res) => {

    let errors = {};

    user.deleteMany({ 'username': req.body.username })
        .then(() =>
            res.send('complete'));
});

module.exports = router;