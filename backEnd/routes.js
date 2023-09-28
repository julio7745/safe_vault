
const express = require('express')

const router = express.Router();

const usersController =  require('./src/controllers/usersController')
router.post('/login', usersController)

const openingsController =  require('./src/controllers/openingsController.js')
router.post('/openings', openingsController.page)
router.post('/clearOpenings', openingsController.clear)

module.exports = router;
