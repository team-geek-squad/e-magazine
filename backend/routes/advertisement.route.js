const express = require("express");
const router = express.Router();
const {uploader} = require("../config/multer.config");
const passport = require('passport');
const {getAdvertisement, 
    updateAdvertisement, 
    removeAdvertisement} = require('../controllers/advertisement.controller');

const multer = require("multer");


router.get(
    '/get',
    getAdvertisement
);

router.post(
    '/update',
    [uploader.single("file"),
    passport.authenticate("jwt", {session: false})],
    updateAdvertisement
);

router.post(
    '/remove',
    passport.authenticate("jwt", {session: false}),
    removeAdvertisement
);

module.exports = router;