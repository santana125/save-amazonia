
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const multerConfig = {
    dest: path.resolve(__dirname, '..', '..', 'public', 'profile_pic' ),
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '..', '..', 'public', 'profile_pic' ));
      },
      filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, hash) => {
          if(err) cb(err);
          const nowDate = Date.now();
          const fileName = `${hash.toString('hex')}_${nowDate}${path.extname(file.originalname)}`;
          file.url = `http://192.168.2.125:5000/profile_pic/${fileName}`
          cb(null, fileName);
        })
      },
    }),
    limits: {
      size: 4 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
      const allowedMimes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
      ];

      if (allowedMimes.includes(file.mimetype)){
        cb(null, true);
      } else {
        cb(new Error('Invalid File'));
      }
    },

}
router.post('/user', userController.store);
router.post('/profile_pic/', multer(multerConfig).single('profile_pic'),
            authMiddleware,
            userController.changeProfilePic);
module.exports = router;
