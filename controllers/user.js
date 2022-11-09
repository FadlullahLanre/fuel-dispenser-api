const AppError = require('../utils/appError')
const db = require('../config/connect')
const { deposit} = require('../services/userService')

exports.getUser = async (req, res, next) => {
    try {
        const user = req.user
        user.Password = undefined
        res.status(200).json({
            status: "successful",
            data: {
                user
            }
        })
    } catch (error) {
        next(error)
    }
}

exports.deposit = async (req, res, next) => {
    try {
        const user = await deposit(req.user, req.body.deposit)
        res.status(200).json({
            status: "successful",
            data: {
                user
            }
        })

    } catch (error) {
        next(error)
    }
}

