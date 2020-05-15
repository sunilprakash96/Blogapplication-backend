//Registration module...
const express = require('express');
const router = express.Router();
const { createUser, getuser } = require("../controllers/userController");
const { verifyToken } = require('../controllers/jwtAuth');

router.get('/user', verifyToken, getuser);

router.post('/user', createUser);

module.exports = router