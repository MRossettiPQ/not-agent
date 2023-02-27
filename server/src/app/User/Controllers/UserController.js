const {
    throwSuccess,
    throwError,
} = require('../../../core/Utils/RequestUtil')
const ContextUtil = require('../../../core/Utils/ContextUtil')
const {i18n} = require("../../../core/utils/i18nUtil");

exports.postSaveUser = async (req, res) => {
    const userContext = await ContextUtil.getUserContext(req, res)

    if (!!userContext) {
        await throwError({
            local: 'SERVER:USER',
            message: i18n.__('user.post_not_found'),
            log: i18n.__('user.post_not_found'),
        })
    }

    await userContext.update(req.body)

    return await throwSuccess({
        local: 'SERVER:USER',
        message: i18n.__('user.post_saved'),
        log: i18n.__('user.post_saved'),
        content: userContext,
    })
}
