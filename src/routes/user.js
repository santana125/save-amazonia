
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const multerConfig = {
    dest: path.resolve(__dirname, '..', '..', 'public', 'profile_pic' ),
    storage: multer.diskStorage({
      destinatio: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '..', '..', 'public', 'profile_pic' ))
      },
      filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, hash) => {
          if(err) cb(err);
          const nowDate = new Date.now();
          const fileName = `${hash.toString('hex')}_${nowDate}`;
          cb(null, fileName);
        })
      }

    }),
    limits: {
      size: 4 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
      allowedMimes: {
        'image/png',
        'image/jpg',
        'image/jpeg',
      }
      allowedMimes.includes(file.mimeType) ?
        cb(null, true)
      :
        cb(new Error('Invalid File'))
    },

}
router.post('/user', userController.store);
router.post('/profile_pic/:user_id', multer(multerConfig).single('profile_pic'),
            userController.changeProfilePic);
module.exports = router;
