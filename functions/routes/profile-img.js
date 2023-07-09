const express = require("express");
const multer = require("multer");
const { uploadController } = require("../controllers/profileImg");

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 600 * 1024, // 600KB
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG and PNG images are allowed.'));
    }
  }
});

const multerMiddleware = (req, res, next) => {
  upload.single("name")(req, res, (err) => {
    if (err) 
      return res.status(400).send({ message: err.message });
    next();
  });
};

router.post("/", multerMiddleware, uploadController);

module.exports = {
  routes: router,
};
