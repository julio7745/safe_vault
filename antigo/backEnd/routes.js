
const express = require('express')

const router = express.Router();

const LoginController = require('./src/controllers/LoginController.js')
router.post('/login', LoginController.login)

const OpeningController = require('./src/controllers/OpeningController.js')

router.post('/opening/getAll', OpeningController.getAll)
router.post('/opening/clear', OpeningController.clear)
router.post('/opening/delete/:_id', OpeningController.delete)
router.post('/opening/create', OpeningController.create);

const UserController = require('./src/controllers/UserController.js')
router.post('/user/getAll', UserController.getAll);

const ProfileImageController = require('./src/controllers/ProfileImageController.js')
router.post('/profileImage/get/:_id', ProfileImageController.get)
router.post('/profileImage/update/:_id', ProfileImageController.update)

const PasswordController = require('./src/controllers/PasswordController.js')
router.post('/password/update/:_id', PasswordController.update)

module.exports = router;
