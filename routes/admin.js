var express = require('express');
var router = express.Router();
var adminControllers = require('../controllers/admin');
const middlewareAdmin = require('../middleware/admin');
const middlewareAdminRelais = require('../middleware/adminRelais');

router.get('/', middlewareAdmin, adminControllers.index);
router.get('/listingUsers', middlewareAdminRelais, adminControllers.listingUsers);

module.exports = router;
