const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

const {
    signup,
    login,
    protect
} = require('../controllers/auth')

router.post('/user/signup', signup)
router.post('/user/login', login)

router.route('/user/profile').get(protect, userController.getUser)
router.route('/wallet/deposit').post(protect, userController.deposit)

router.get("/user/All", userController.AllUser)

module.exports = router