// NON UTILISE POUR LE MOMENT
var express = require('express');
var router = express.Router();
var entreprisesControllers = require('../controllers/entreprises');
const middlewareAdmin = require('../middleware/admin');

router.get('/', middlewareAdmin, entreprisesControllers.index);
router.get('/view/:id', middlewareAdmin, entreprisesControllers.view);
router.get('/update/:id', middlewareAdmin, entreprisesControllers.updatePage);
router.post('/update/:id', middlewareAdmin, entreprisesControllers.updateForm);
router.get('/create/', middlewareAdmin, entreprisesControllers.createPage);
router.post('/create/', middlewareAdmin, entreprisesControllers.createForm);
router.get('/delete/:id',middlewareAdmin, entreprisesControllers.delete);

module.exports = router;
