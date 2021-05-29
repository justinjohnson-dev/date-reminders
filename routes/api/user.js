const express = require("express");
const router = express.Router();
const formidable = require('formidable');
// Load input validation
// const validateUserInput = require("../../validation/user")
// Load User model
const User = require("../../models/user");
const Admin = require("../../models/admin");


router.post("/userBirthdays", (req, res) => {
    let userInfoObject = new User(req.body);
    let phone_number = userInfoObject.phone_number;
    console.log(userInfoObject);


    // find and save updated post
    User.findOne({ phone_number: phone_number }, function (err, foundOject) {
        if (err) {
            console.log(err)
            res.status(500).send()
        } else {
            if (!foundOject) {
                // insert new
                userInfoObject.save((err, success) => {
                    if (err) {
                        return res.status(400).json({
                            error: errorHandler(err)
                        });
                    }
                    res.json(success);
                });
            } else {
                foundOject.birthdays = userInfoObject.birthdays;

                foundOject.save(function (err, userInfoObject) {
                    if (err) {
                        console.log(err);
                        res.status(500).send();
                    } else {
                        res.send(userInfoObject);
                    }
                })
            }
        }
    });
});


router.post("/admin", (req, res) => {
    let userInfoObject = new Admin(req.body);
    // let phone_number = userInfoObject.phone_number;
    console.log(userInfoObject);

    userInfoObject.save()
        .then(item => {
            res.send("item saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
    // find and save updated post
    // User.findOne({ phone_number: phone_number }, function (err, foundOject) {
    //     if (err) {
    //         console.log(err)
    //         res.status(500).send()
    //     } else {
    //         if (!foundOject) {
    //             // insert new
    //             userInfoObject.save((err, success) => {
    //                 if (err) {
    //                     return res.status(400).json({
    //                         error: errorHandler(err)
    //                     });
    //                 }
    //                 res.json(success);
    //             });
    //         } else {
    //             foundOject.birthdays = userInfoObject.birthdays;

    //             foundOject.save(function (err, userInfoObject) {
    //                 if (err) {
    //                     console.log(err);
    //                     res.status(500).send();
    //                 } else {
    //                     res.send(userInfoObject);
    //                 }
    //             })
    //         }
    //     }
    // });
});




router.get("/birthdays/:id", (req, res) => {
    console.log(req.params.id);
    let phone_number = req.params.id;

    User.findOne({ phone_number }).then(user => {
        console.log(user);
        res.send(user);
    });

    // find and save updated post
    // User.findOne({ phone_number: phone_number }, function (err, foundOject) {
    //     if (err) {
    //         console.log(err)
    //         res.status(500).send()
    //     } else {
    //         if (!foundOject) {
    //             // insert new
    //             userInfoObject.save((err, success) => {
    //                 if (err) {
    //                     return res.status(400).json({
    //                         error: errorHandler(err)
    //                     });
    //                 }
    //                 res.json(success);
    //             });
    //         } else {
    //             foundOject.birthdays = userInfoObject.birthdays;

    //             foundOject.save(function (err, userInfoObject) {
    //                 if (err) {
    //                     console.log(err);
    //                     res.status(500).send();
    //                 } else {
    //                     res.send(userInfoObject);
    //                 }
    //             })
    //         }
    //     }
    // });
});

// router.post("/user", (req, res) => {
//     // using the formidable package to handle
//     let form = new formidable.IncomingForm()
//     form.keepExtensions = true
//     form.parse(req, (err, fields) => {
//         // Form validation
//         const { errors, isValid } = validateUserInput(fields);

//         // Check validation
//         if (!isValid) {
//             return res.status(400).json(errors);
//         }

//         // Check to make sure all fields are filled out
//         const { name, phone_number } = fields
//         if (!name || !phone_number) {
//             return res.status(400).json({
//                 error: "All fields are required"
//             });
//         }

//         User.findOne({ phone_number }).then(user => {
//             if (user) {
//                 return res.status(400).json({ email: "Phone Number Already Exists!" });
//             } else {
//                 const user = new User(fields);
//                 // Save the new post
//                 user.save((err, success) => {
//                     if (err) {
//                         return res.status(400).json({
//                             error: errorHandler(err)
//                         });
//                     }
//                     res.json(success);
//                 });
//             }
//         });
//     });
// });


module.exports = router;