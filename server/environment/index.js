/* eslint-disable import/no-dynamic-require */
// eslint-disable-next-line global-require
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
const resolveEnvironment = () => require(`./env.${env}.json`)

module.exports = resolveEnvironment()