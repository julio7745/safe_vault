
const express = require('express')

const router = express.Router();

const usersController =  require('./src/controllers/usersController')
router.post('/login', usersController)

module.exports = router;
