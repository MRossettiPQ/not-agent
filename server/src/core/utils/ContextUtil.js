const {User} = require('../database').models
const {
    throwError, throwForbidden
} = require('./RequestUtil')
const {logColor} = require("./LogUtil");
const {ResolveToken} = require("../middleware/AuthorizeJwt");

exports.getUserContextId = async (req) => {
    logColor('SERVER:CONTEXT', `getUserContextId`)
    // Get header token
    const token = req.headers['x-access-token']
    if (!token) {
        return await throwForbidden({
            local: 'SERVER:USERCONTEXT',
            message: `No token provided`,
            log: `No token provided`,
        })
    }

    req.context = {
        ...req.context,
        token
    }

    // Check token
    const resultToken = await ResolveToken(token)
    if (!resultToken) {
        return await throwForbidden({
            local: 'SERVER:CONTEXT',
            message: `Invalid token`,
            log: `Invalid token`,
        })
    }
    return resultToken.id
}

exports.getUserContext = async (req) => {
    logColor('SERVER:CONTEXT', `getUserContext`)
    if (req?.context?.user) {
        return req?.context?.user
    }

    const idUserContext = await this.getUserContextId(req)

    const user = await User.findByPk(idUserContext)
    if (!user) {
        return await throwError({
            local: 'SERVER:CONTEXT',
            message: `Need to be logged in`,
            log: `Need to be logged in`,
        })
    }

    req.context = {
        ...req.context,
        user
    }

    return user
}

exports.getContext = async (req) => {
    logColor('SERVER:CONTEXT', `[${req.method}] - ${req.originalUrl} - getContext`)
    if (req?.context) {
        return req?.context
    }

    return await throwError({
        local: 'SERVER:CONTEXT',
        message: `No context`,
        log: `No context`,
    })
}