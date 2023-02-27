const {logColor} = require("../utils/LogUtil");
const ContextUtil = require("../utils/ContextUtil");
const {throwForbidden} = require("../utils/RequestUtil");
const {i18n} = require("../utils/i18nUtil");

const VerifyRoles = function (roles = []) {
    return async function (req, res, next) {
        logColor('SERVER:VERIFYROLES', i18n.__('authorizeroles.verify'))
        const userContext = await ContextUtil.getUserContext(req, res)

        // Implement the middleware function based on the options object
        if (!roles.includes(userContext?.getDataValue?.('role')) || !userContext) {
            return await throwForbidden({
                local: 'SERVER:ROLES',
                message: `${i18n.__('authorizeroles.requires')} ${roles.join(',')}`,
                log: i18n.__('authorizeroles.not_allowed'),
            })
        }
        next()
    }
}

module.exports = {
    VerifyRoles
}