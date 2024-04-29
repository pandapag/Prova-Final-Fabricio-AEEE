const express = require('express');
const UserController = require('../controllers/userController'); 
const router = express.Router();
const userController = new UserController();

router.post('./users/register', (req, res) => userController.register(req, res));
router.post('/login', userController.createUser);


module.exports = router;
