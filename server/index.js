const { NotAgent } = require('./NotAgent')

module.exports = (async () => {
    const server = new NotAgent()
    await server.init()
})()
