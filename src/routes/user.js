
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const path = require('path');


const multerConfig = {
    dest: path.resolve(__dirname, '..', '..', 'public', 'profile_pic' );
    storage: multer.diskStorage({

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
router.post('/user',multer().single('profile_pic'), userController.store);

module.exports = router;
