var express = require('express');
var router = express.Router();
var processusControllers = require('../controllers/processus');
const middlewareAdmin = require('../middleware/admin');
const middlewareAuth = require('../middleware/auth');
const middlewareAdminRelais = require('../middleware/adminRelais');

router.get('/', middlewareAdmin, processusControllers.index);
router.get('/viewprocessus/:id', middlewareAdmin, processusControllers.viewprocessus)

router.get('/create/', middlewareAdminRelais, processusControllers.createPage);
router.post('/create/', middlewareAdminRelais, processusControllers.createForm);
router.get('/view/:id', middlewareAuth, processusControllers.view);
router.get('/update/:id', middlewareAdminRelais, processusControllers.updatePage);
router.post('/update/:id', middlewareAdminRelais, processusControllers.updateForm);
router.get('/delete/:id', middlewareAdminRelais, processusControllers.delete);


module.exports = router;
