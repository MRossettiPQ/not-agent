const jwt = require('jsonwebtoken')
const environment = require('../../../environment')
const {throwForbidden} = require("../utils/RequestUtil");
const {logColor} = require("../utils/LogUtil");
const {i18n} = require("../utils/i18nUtil");
// Context
// const context = {
//     token: '',
//     user: {}
// }
const CreateToken = async (payload) => {
    logColor('SERVER:CREATETOKEN', i18n.__('authorizejwt.create_token'))
    return await jwt.sign(
        {
            ...payload
        },
        environment.secret,
        {
            expiresIn: 3 * 86400, // TODO validade do token
        }
    )
}

const ResolveToken = async (token) => {
    return await jwt.verify(token, environment.secret);
}

const VerifyToken = async (req, res, next) => {
    logColor('SERVER:VERIFYTOKEN', i18n.__('authorizejwt.check_token'))
    // Get header token
    const token = req.headers['x-access-token']
    if (!token) {
        return await throwForbidden({
            local: 'SERVER:VERIFYTOKEN',
            message: i18n.__('authorizejwt.no_token'),
            log: i18n.__('authorizejwt.no_token'),
        })
    }

    // Check token
    const resultToken = await ResolveToken(token)
    if (!resultToken) {
        return await throwForbidden({
            local: 'SERVER:VERIFYTOKEN',
            message: i18n.__('authorizejwt.invalid_token'),
            log: i18n.__('authorizejwt.invalid_token'),
        })
    }

    // Add contenxt object in req
    req.context = {
        ...req.context,
        token
    }

    next()
}


module.exports = {
    ResolveToken,
    CreateToken,
    VerifyToken
}