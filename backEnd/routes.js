
const express = require('express')

const router = express.Router();

const findUser = require('./src/middlewares/findUser.js')

const usersController =  require('./src/controllers/usersController.js')
router.post('/login', usersController.login)

const openingsController =  require('./src/controllers/openingsController.js')
router.post('/openings', findUser, openingsController.openings)
router.post('/clearOpenings', findUser, openingsController.clear)
router.post('/deleteOpening', findUser, openingsController.delete)

module.exports = router;
