var express = require('express');
var router = express.Router();

var contactController = require('../controllers/contacts');

router.get('/', contactController.list);
router.post('/', contactController.create);
router.get('/:id', contactController.contactByID);
router.put('/:id', contactController.update);
router.delete('/:id', contactController.delete);

module.exports = router;