const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');
const authMiddleware = require('../middlewares/auth');

router.post('/like',
            authMiddleware,
            likeController.store);

module.exports = router;

