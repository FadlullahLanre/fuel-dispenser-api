const AppError = require('../utils/appError')
const db = require('../config/connect')
const { deposit, GetAllUser, getUser } = require('../services/userService')
const { GetAllAgents } = require('../services/adminService')

exports.getUser = async (req, res, next) => {
    try {
        const user = await getUser(req.params.card_id)
        res.status(200).send(user)
    } catch (error) {
        next(error)
    }
}

exports.deposit = async (req, res, next) => {
    try {
        const user = await deposit(req.params.card_id, +req.params.deposit)
        res.status(200).json({ user  
        })
    } catch (error) {
        next(error)
    }
}

exports.AllUser = async (req, res, next) => {
    try {
        const users = await GetAllUser()
        res.status(200).json({
            status: "successful",
            data: {
                users
            }
        })
    } catch (error) {
        next(error)
    }
}

exports.AllAgents = async (req, res, next) => {
    try {
        const agents = await GetAllAgents()
        res.status(200).json({
            status: "successful",
            data: {
                agents
            }
        })
    } catch (error) {
        next(error)
    }
}