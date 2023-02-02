const express = require('express');
const router = express.Router();


const {
     createUser,
     login,
     logout
} = require('../controllers/authController');


router
.route('/signup')
.post(createUser);


router
.route('/login')
.post(login);



router
.route('/logout')
.post(logout);



module.exports = router;