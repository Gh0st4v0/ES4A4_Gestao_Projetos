const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getAllUsers); //retorna todos os usuários do sistema
router.get('/users/:userID', userController.getUserByID) // retorna um usuario pelo userID

router.post('/login', userController.login);

router.put('/users/edit/:userID', userController.updateUserInformation)

router.delete('/users/delete/:userID', userController.deleteUser)


module.exports = router;
