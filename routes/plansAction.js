var express = require('express');
var router = express.Router();
var plansActionsControllers = require('../controllers/plansActions');
const middlewareAdmin = require('../middleware/admin');
const middlewareAuth = require('../middleware/auth');
const middlewareAdminRelais = require('../middleware/adminRelais');

router.get('/', middlewareAdmin, plansActionsControllers.listing);
router.get('/index/:id', middlewareAdmin, plansActionsControllers.index);

router.get('/view/:id', middlewareAuth, plansActionsControllers.view);
router.get('/update/:id', middlewareAdminRelais, plansActionsControllers.updatePage);
router.post('/update/:id', middlewareAdminRelais, plansActionsControllers.updateForm);
router.get('/create/', middlewareAdminRelais, plansActionsControllers.createPage);
router.post('/create/', middlewareAdminRelais, plansActionsControllers.createForm);
router.get('/delete/:id', middlewareAdminRelais, plansActionsControllers.delete);


module.exports = router;
