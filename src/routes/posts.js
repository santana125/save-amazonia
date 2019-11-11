const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/auth');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const multerConfig = {
    dest: path.resolve(__dirname, '..', '..', 'public', 'posts' ),
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        console.log(req)
        cb(null, path.resolve(__dirname, '..', '..', 'public', 'posts' ));
      },
      filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, hash) => {
          if(err) cb(err);
          const nowDate = Date.now();
          const fileName = `${hash.toString('hex')}_${nowDate}${path.extname(file.originalname)}`;
          file.url = `http://192.168.2.125:5000/posts/${fileName}`
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
router.post('/posts',
            authMiddleware,
            multer(multerConfig).single('photo'),
            postController.store);
router.get('/posts', authMiddleware, postController.index);

module.exports = router;

