var express = require('express');
var router = express.Router();

var inventoryController = require('../controllers/inventory');
var firebaseAuthController = require('../controllers/firebaseAuth');

router.get('/', inventoryController.list);
router.post('/', 
    firebaseAuthController.logtoken, 
    firebaseAuthController.requireSignin, 
    inventoryController.create);

router.get('/:id', inventoryController.inventoryByID);
router.put('/:id', 
    firebaseAuthController.logtoken, 
    firebaseAuthController.requireSignin, 
    inventoryController.hasAuthorization, 
    inventoryController.update);
router.delete('/:id', 
    firebaseAuthController.logtoken, 
    firebaseAuthController.requireSignin, 
    inventoryController.hasAuthorization, 
    inventoryController.delete);

module.exports = router;