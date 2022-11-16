const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const {addAgent} = require('../controllers/admin')

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


router.route('/user/profile').get(protect, userController.getUser)
router.route('/admin/agent').post(protect, addAgent).get(protect, userController.AllAgents)
router.route('/user/deposit').post(protect, userController.deposit)

router.get("/admin/users", userController.AllUser)

module.exports = router