const express = require('express');
const user = require('../controllers/userController');

const router = express.Router();


router.post('/signup', user.signUp);
router.post('/signin', user.signIn);

module.exports = router;


