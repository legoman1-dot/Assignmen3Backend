var express = require('express');
var router = express.Router();

var userController = require('../controllers/users');
var authController = require('../controllers/firebaseAuth');

router.get('/', userController.list);
router.post('/', userController.create);

router.param('id', userController.userByID);
router.get('/:id', 
    authController.requireSignin, 
    userController.hasAuthorization, 
    userController.read);
router.put('/:id', 
    authController.requireSignin, 
    userController.hasAuthorization, 
    userController.update);
router.delete('/:id', 
    authController.requireSignin, 
    userController.hasAuthorization, 
    userController.delete);

router.put('/setadmin/:userID', 
    authController.logtoken,
    authController.requireSignin, 
    userController.setAdmin);

module.exports = router;