const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const userService = require('../services/userService')
const { addAgent } = require('../controllers/admin')

const {
    signup,
    login,
    protect,
    adminLogin,
    adminSignup
} = require('../controllers/auth')

router.post('/user/signup', signup)
router.post('/user/login', login)
router.post('/admin/signup', adminSignup)
router.post('/admin/login', adminLogin)


router.route('/user/profile/:card_id').get( userController.getUser)
router.route('/admin/agent').post(addAgent).get(userController.AllAgents)
router.route('/user/deposit/:card_id/:deposit').post(userController.deposit)

router.get("/admin/users", userController.AllUser)

module.exports = router