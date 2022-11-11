const Joi = require('joi')

module.exports = Joi.object({
    status: Joi.string().required(),
    location: Joi.string().required(),
    email: Joi.string().email().required(),
    hotline: Joi.string().min(11).required(),
    agent_name: Joi.string().required()
})