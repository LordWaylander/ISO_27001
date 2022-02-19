var express = require('express');
var router = express.Router();
var authControllers = require('../controllers/auth');
const middlewareAuth = require('../middleware/auth');
const middlewareAdmin = require('../middleware/admin');

router.get('/', authControllers.loginPage);
router.post('/', authControllers.loginForm);
router.get('/forgotPwd', authControllers.forgotPwd);
router.post('/forgotPwd', authControllers.forgotPwdSend);
router.get('/reset/:token', authControllers.resetPwd);
router.post('/reset/:token', authControllers.resetPwdSend);
router.get('/logout', middlewareAuth, authControllers.logout);
router.get('/signup', middlewareAdmin, authControllers.signupPage);
router.post('/signup', middlewareAdmin, authControllers.signupForm);

module.exports = router;
