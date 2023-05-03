const express = require('express');
const { login, register } = require('../controllers/auth.controller');
const router = express.Router();
const passport = require('passport');

router.post('/login', login);
router.post(
    '/register',
    passport.authenticate("jwt", {session: false}), 
    register
);

module.exports = router;