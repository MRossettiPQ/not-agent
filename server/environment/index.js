/* eslint-disable import/no-dynamic-require */
// eslint-disable-next-line global-require
const resolveEnvironment = () => require(`./env.${process.env.NODE_ENV}.json`)

module.exports = resolveEnvironment()