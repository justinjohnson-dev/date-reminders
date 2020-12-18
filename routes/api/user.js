const express = require("express");
const router = express.Router();
const formidable = require('formidable');
// Load input validation
const validateUserInput = require("../../validation/user")
// Load User model
const User = require("../../models/user");


router.post("/user", (req, res) => {
    // using the formidable package to handle
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields) => {
        // Form validation
        const { errors, isValid } = validateUserInput(fields);

        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        // Check to make sure all fields are filled out
        const { name, phone_number } = fields
        if (!name || !phone_number) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        User.findOne({ phone_number }).then(user => {
            if (user) {
                return res.status(400).json({ email: "Phone Number Already Exists!" });
            } else {
                const user = new User(fields);
                // Save the new post
                user.save((err, success) => {
                    if (err) {
                        return res.status(400).json({
                            error: errorHandler(err)
                        });
                    }
                    res.json(success);
                });
            }
        });
    });
});


module.exports = router;