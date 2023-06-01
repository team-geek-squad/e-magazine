const multer = require("multer");

const uploader = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 150 * 1024 * 1024, // keep file size < 150 MB
    },
});

module.exports = {uploader}