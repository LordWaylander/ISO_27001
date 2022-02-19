// NON UTILISE POUR LE MOMENT
var express = require('express');
var router = express.Router();
var clientsControllers = require('../controllers/clients');
const middlewareAdmin = require('../middleware/admin');

router.get('/', middlewareAdmin, clientsControllers.index);
router.get('/view/:id', middlewareAdmin, clientsControllers.view);
router.get('/update/:id', middlewareAdmin, clientsControllers.updatePage);
router.post('/update/:id', middlewareAdmin, clientsControllers.updateForm);
router.get('/create/', middlewareAdmin, clientsControllers.createPage);
router.post('/create/', middlewareAdmin, clientsControllers.createForm);
router.get('/delete/:id',middlewareAdmin, clientsControllers.delete);


module.exports = router;
