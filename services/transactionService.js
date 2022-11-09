const AppError = require('../utils/appError');
const db = require('../config/connect');


const Account_statement = async (value) => {
    const Account = await db.select().from('transactions').where({
        user_id: value
    })

    if (!Account) {
        throw new AppError('This user has no transaction history', 401)
    }
    return Account
}

module.exports = {
    Account_statement
}