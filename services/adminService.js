const db = require('../config/connect')
const AppError = require('../utils/appError')

const addAgent = async (agent) => {
    if (!agent) {
        throw new AppError('please fill the agents', 400)
    }
    await db('agents').insert({
        agent_name: agent[0].agent_name,
        email: agent[0].email,
        hotline: agent[0].hotline,
        location: agent[0].location,
        status: agent[0].status
    })
    return agent
}


const GetAllAgents = async () => {
    const agents = await db.select('location', 'email', 'agent_name', 'hotline').from('agents    ')
    return agents
}

module.exports = {
    addAgent,
    GetAllAgents
}