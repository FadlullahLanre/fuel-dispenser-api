const Joi = require('joi')

module.exports = Joi.object({
    card_id: Joi.string().required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().min(11).required()
})