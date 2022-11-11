const express = require('express')
const authController = require('../controllers/auth')
const paymentController = require('../controllers/transaction')

const router = express.Router()

router.route('/transactions/account-statement').get(authController.protect, paymentController.Account_statement)

module.exports = router