const db = require('../config/connect')
const AppError = require('../utils/appError')
const bycrpt = require('bcrypt')

const deposit = async (value, deposit) => {
    const singleUser = await db.select('card_id', 'balance').from('users').where({card_id: value})
 
    if (!deposit) {
        throw new AppError('please fill the deposit form', 400)
    }

    if (deposit < 1) {
        throw new AppError("You cannot deposit a negative amount", 401)
    }
    singleUser[0].balance += deposit

    await db('users').where({ card_id: value}).update({
        balance: singleUser[0].balance
    })
    singleUser[0].password = undefined
    

    await db('transactions').insert({
        user_id: singleUser[0].id,
        card_id: singleUser[0].card_id,
        amount: deposit.to,
        description: "Deposit",
        balance: singleUser[0].balance
    })
    return singleUser
}


const GetAllUser = async () => {
    const users = await db.select('card_id', 'email', 'balance', 'phoneNumber').from('users')
    return users
}

const getUser = async (value, res) => {
    const singleUser = await db.select('card_id', 'balance').from('users').where({card_id: value})
    if (!singleUser) {
        return res.status(404).send("user doesn't exist")
    }
    return singleUser
}
module.exports = {
    deposit,
    GetAllUser,
    getUser
}