const jwt = require('jsonwebtoken')
const environment = require('../../../environment')
const { User } = require('../DataBase')
const {
    throwErrorIf,
    throwForbiddenIf,
    throwUnauthorizedIf,
} = require('./RequestUtil')

exports.getUserContextId = async (req, res) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
        try {
            let token = req.headers['x-access-token']
            await throwForbiddenIf({
                cond: !token,
                message: `No token provided`,
                log: `[CONTEXT] - No token provided`,
                res,
            })

            return await jwt.verify(
                token,
                environment.secret,
                async (err, decoded) => {
                    try {
                        await throwUnauthorizedIf({
                            cond: err,
                            message: 'No token provided!',
                            log: `[CONTEXT] - No token provided`,
                            res,
                        })
                        req.contextUser = {
                            idUSerContext: decoded.id,
                        }
                        return resolve(decoded.id)
                    } catch (e) {
                        return e
                    }
                },
                null
            )
        } catch (e) {
            return reject(e)
        }
    })
}

exports.getUserContext = async (req, res) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
        try {
            const idUserContext = await this.getUserContextId(req, res)
            const contextUser = await User.findByPk(idUserContext)

            await throwErrorIf({
                cond: contextUser === null,
                message: `Need to be logged in`,
                log: `[CONTEXT] - Need to be logged in`,
                res,
            })

            req.contextUser = contextUser

            return resolve(contextUser)
        } catch (e) {
            return reject(e)
        }
    })
}