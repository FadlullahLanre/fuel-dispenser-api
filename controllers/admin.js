const db = require('../config/connect')
const jwt = require('jsonwebtoken')
const agentValidator = require('../validator/agent')
const AppError = require('../utils/appError')

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const createToken = async (agent, statusCode, res) => {
    const token = signToken(agent[0].id)
    agent[0].password = undefined
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            agent
        }
    })
}

const addAgent = async (req,res, next) => {
    try {
        const value = await agentValidator.validateAsync(req.body)

        await db('agents').insert({
            agent_name: value.agent_name,
            location: value.location,
            status: value.status,
            email: value.email,
            password: value.password,
            hotline : value.hotline
        })
        const newAgent = await db.select().from("agents").where({ email: value.email })
        createToken(newAgent, 201, res)
    } catch (error) {
        next(error)
    }

}


const GetAllAgents = async () => {
    const agents = await db.select('location', 'email', 'agent_name', 'hotline', 'status').from('agents')
    return agents
}


module.exports = {
    GetAllAgents,
    addAgent
}