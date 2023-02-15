/* eslint-disable import/no-dynamic-require */
// eslint-disable-next-line global-require
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
const resolveEnvironment = () => {
    const conf = require(`./env.${env}.json`)
    return {
        development: true,
        host: {
            url: "http://localhost:8000",
            url_socket: "http://localhost:8000",
            port: 8000,
            port_socket: 8001
        },
        ...conf
    }
}

module.exports = resolveEnvironment()