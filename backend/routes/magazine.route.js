const express = require("express");
const { submitMagazine, getLatest, getOldVersions } = require("../controllers/magazine.controller");
const router = express.Router();
const {uploader} = require("../config/multer.config");
const passport = require('passport');

const multer = require("multer");


router.get(
    'get-latest',
    getLatest
);

router.get(
    'get-old-versions',
    getOldVersions
);

// Define file upload route
router.post(
    '/upload',
    [uploader.single("file"),
    passport.authenticate("jwt", {session: false})], 
    submitMagazine
);


module.exports = router;
