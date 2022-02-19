var express = require('express');
var router = express.Router();
var relaisControllers = require('../controllers/relais');
const middlewareRelais = require('../middleware/relais');

router.get('/:idUser', middlewareRelais, relaisControllers.index);
router.get('/:idUser/processus', middlewareRelais, relaisControllers.processus);
router.get('/:idUser/processus/viewprocessus/:idProcessus', middlewareRelais, relaisControllers.processusView);
router.get('/:idUser/plansAction', middlewareRelais, relaisControllers.plansAction);
router.get('/:idUser/plansAction/index/:idProcessus', middlewareRelais, relaisControllers.plansActionView);

module.exports = router;
