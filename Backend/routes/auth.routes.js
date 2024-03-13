const express = require('express');
const router =  express.Router();
const { Signup, Signin, update, getuser } = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares/usercheck');

router.post('/signup',Signup);
router.post('/signin',Signin);
router.post('/update',verifyToken,update);
router.get('/getuser/:id',getuser);

module.exports = router;