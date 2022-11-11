const db = require('../config/connect')
const AppError = require('../utils/appError')
const bycrpt = require('bcrypt')

const deposit = async (user, deposit) => {
    if (!deposit) {
        throw new AppError('please fill the deposit form', 400)
    }

    if (deposit < 1) {
        throw new AppError("You cannot deposit a negative amount", 401)
    }
    user[0].balance += deposit

    await db('users').where({ id: user[0].id }).update({
        balance: user[0].balance
    })
    user[0].password = undefined
    

    await db('transactions').insert({
        user_id: user[0].id,
        card_id: user[0].card_id,
        amount: deposit,
        description: "Deposit",
        balance: user[0].balance
    })
    return user
}


const GetAllUser = async () => {
    const users = await db.select('card_id', 'email', 'balance', 'phoneNumber').from('users')
    return users
}

module.exports = {
    deposit,
    GetAllUser
}