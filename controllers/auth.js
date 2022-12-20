const db = require('../config/connect')
const jwt = require('jsonwebtoken')
const sigupValidator = require('../validator/signUp')
const AppError = require('../utils/appError')
const loginValidator = require('../validator/login')
const adminValidator = require('../validator/admin')
const { promisify } = require('util')
const bycrpt = require('bcrypt')

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const createToken = async (user, statusCode, res) => {
    const token = signToken(user[0].id)
    user[0].password = undefined
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
}

const signup = async (req, res, next) => {
    try {
        const value = await sigupValidator.validateAsync(req.body)
        value.password = await bycrpt.hash(value.password, 12)

        const newDate = Date.now()
        const newDate2 = new Date(newDate)

        await db('users').insert({
            card_id: value.card_id,
            email: value.email,
            password: value.password,
            created_at: newDate2,
            updated_at: newDate2,
            phoneNumber : value.phoneNumber
        })
        const newUser = await db.select().from("users").where({ email: value.email })
        createToken(newUser, 201, res)
    } catch (error) {
        next(error)
    }

}

const adminSignup = async (req, res, next) => {
    try {
        const value = await adminValidator.validateAsync(req.body)
        value.password = await bycrpt.hash(value.password, 12)

        await db('admin').insert({
            email: value.email,
            password: value.password,
            phoneNumber : value.phoneNumber,
            role: value.role
        })
        const newAdmin = await db.select().from("admin").where({ email: value.email })
        createToken(newAdmin, 201, res)
    } catch (error) {
        next(error)
    }

}

const login = async (req, res, next) => {
    try {
        const value = await loginValidator.validateAsync(req.body)
        if (!value.password || !value.email) {
            throw new AppError("Please provide an email and password", 400)
        }

        const user = await db.select().from('users').where({ email: value.email })

        if (!user || !await bycrpt.compare(value.password, user[0].password)) {
            throw new AppError('incorrect password or email', 401)
        }
        createToken(user, 200, res)
    } catch (error) {
        next(error)
    }

}

const adminLogin = async (req, res, next) => {
    try {
        const value = await loginValidator.validateAsync(req.body)
        if (!value.password || !value.email) {
            throw new AppError("Please provide an email and password", 400)
        }
        
        const admin = await db.select().from('admin').where({ email: value.email })
        if (!admin || !await bycrpt.compare(value.password, admin[0].password)) {
            throw new AppError('incorrect password or email', 401)
        }
        createToken(admin, 200, res)
    } catch (error) {
        next(error)
    }

}


const protect = async (req, res, next) => {
    try {
        let token
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }
        if (!token) {
            return next(new AppError('You are not logged in, Please login to get access', 401))
        }
        let decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

        const currentUser = await db.select().from('users').where({ id: decoded.id })

        if (!currentUser) {
            return next(new AppError('The user belonging to this token, no longer exist', 401))
        }
        req.user = currentUser
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    signup,
    protect,
    login,
    adminLogin,
    adminSignup
}