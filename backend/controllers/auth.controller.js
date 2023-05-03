require('dotenv').config()
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require('passport');
const User = require('../models/user.model');

// getting port from .env file
const SECRET_KEY = process.env.SECRET_KEY;


// login method
exports.login = async (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).send(info.message);
        }

        const token = jwt.sign({ email: user.email }, SECRET_KEY);
        const resObject = {
            token: token,
            userData: {
                name: user.name,
                email: user.email,
                userID: user._id
            }
        }
        return res.send(resObject);
    })(req, res, next);
}

exports.authCheck = (req, res) => {
    res.send(passport.authenticate("jwt", {session: false}));
}


// register method
exports.register = async (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then((hashedPassword) => {
            // creating user object
            const user = new User({
                name: req.body.name,
                // username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
            });

            // saving user data to database
            user.save().then((result) => {
                res.status(201).send({
                    message: "User Created Successfully",
                    result,
                });
            })
                .catch((error) => {
                    res.status(500).send({
                        message: "Error creating user",
                        error,
                    });
                });
        })
        .catch((e) => {
            res.status(500).send({
                message: "Password was not hashed successfully",
                e,
            });
        });
}