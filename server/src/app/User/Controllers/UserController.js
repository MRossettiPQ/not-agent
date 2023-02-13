const {
    throwSuccess,
    throwErrorIf,
} = require('../../../core/Utils/RequestUtil')
const ContextUtil = require('../../../core/Utils/ContextUtil')

exports.postSaveUser = async (req, res) => {
    console.log('[POST] - /api/user')
    try {
        const userContext = await ContextUtil.getUserContext(req, res)

        await throwErrorIf({
            cond: userContext === null,
            log: '[POST] - /api/user - User not found',
            res,
        })

        await userContext.update(req.body)

        await throwSuccess({
            content: userContext,
            message: 'User saved',
            log: 'User saved',
            res,
        })
    } catch (e) {
        console.error(`\x1b[31m${e}\x1b[0m`)
    }
}
