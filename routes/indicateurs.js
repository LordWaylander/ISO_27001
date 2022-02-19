var express = require('express');
var router = express.Router();
var indicateurControllers = require('../controllers/indicateurs');
const middlewareAdmin = require('../middleware/admin');
const middlewareAdminRelais = require('../middleware/adminRelais');

router.get('/create', middlewareAdminRelais, indicateurControllers.createPage);
router.post('/create', middlewareAdminRelais, indicateurControllers.createForm);
router.get('/update/:id', middlewareAdminRelais, indicateurControllers.updatePage);
router.post('/update/:id', middlewareAdminRelais, indicateurControllers.updateForm);

module.exports = router;
