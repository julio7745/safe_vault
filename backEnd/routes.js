
const express = require('express')

const router = express.Router();

const findUser = require('./src/middlewares/findUser.js')

const usersController =  require('./src/controllers/usersController.js')
router.post('/login', usersController.login)
router.post('/getUsers', findUser, usersController.get)
router.get('/getProfileImage/:idOfUser', usersController.getProfileImage)

const openingsController =  require('./src/controllers/openingsController.js')
router.post('/getOpenings', findUser, openingsController.get)
router.post('/clearOpenings', findUser, openingsController.clear)
router.post('/deleteOpening', findUser, openingsController.delete)
router.post('/createOpening', findUser, openingsController.create)

router.get('/oi', (req, res) => res.send("hello"))

module.exports = router;
