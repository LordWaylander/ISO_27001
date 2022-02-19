var express = require('express');
var router = express.Router();
var userControllers = require('../controllers/user');
const middlewareUser = require('../middleware/user');
const middlewareAdmin = require('../middleware/admin');

router.get('/:idUser', middlewareUser, userControllers.index);
router.get('/:idUser/processus', middlewareUser, userControllers.processus);
router.get('/:idUser/plansAction', middlewareUser, userControllers.plansAction);

module.exports = router;
