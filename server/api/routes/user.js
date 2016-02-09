var express = require('express');
var UserController = require('../controllers/user');
var passport = require('../config/passport'); 

var userController = new UserController();
var router = express.Router();

router.post('/', userController.signUp);
router.post('/login', passport.authenticate('local', {session: false}), userController.login);
router.post('/logout', passport.authenticate('bearer', {session: false}), userController.logout);
// router.post('/getImages', passport.authenticate('bearer', {session: false}), userController.getImages);

module.exports = router;
	