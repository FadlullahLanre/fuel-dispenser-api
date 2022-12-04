const AppError = require('../utils/appError')
const { Account_statement } = require('../services/transactionService')

exports.Account_statement = async (req, res, next) => {
    try {
        const Transactions = await Account_statement(req.user[0].id)

        res.status(200).json({
            status: "success",
            account_statement: {
                Transactions
            }
        })
    } catch (error) {
        next(error)
    }

}
