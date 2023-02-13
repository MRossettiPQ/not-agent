const {throwErrorIf, throwSuccess, resError} = require("../../../core/utils/RequestUtil");
const { Notification } = require('../../../core/DataBase')

exports.postNotification = async (req, res) => {
    try {
        console.log('[POST] - /api/notification')
        const { id: idNotification } = req.body
        let notification = await Notification.findByPk(idNotification)

        if (notification) {
            // Update registered patient
            notification = await notification.update({
                ...req.body,
            })
        } else {
            notification = await Notification.create(req.body)
        }

        await throwErrorIf({
            cond: notification === null,
            message: 'Notification not save',
            log: '[POST] - /api/notification - not save',
            res,
        })

        await throwSuccess({
            content: notification,
            message: 'Notification save successful',
            log: '\x1b[32m[POST] - /api/notification - success save\x1b[0m',
            res,
        })
    } catch (e) {
        resError({
            message: 'Um erro ocorreu, corrija e tente novamente',
            log: `\x1b[31m${e}\x1b[0m`,
            res
        })
    }
}

exports.getNotification = async (req, res) => {
    try {
        // console.log('[GET] - /api/notification/:id')
        const { id: idNotification } = req.params
        const notification = await Notification.findByPk(idNotification)

        await throwErrorIf({
            cond: notification === null,
            message: 'Notification not found',
            log: '[GET] - /api/notification/:id - not found',
            res,
        })

        await throwSuccess({
            content: notification,
            log: '\x1b[32m[GET] - /api/notification/:id - Notification founded\x1b[0m',
            res,
        })
    } catch (e) {
        console.error(`\x1b[31m${e}\x1b[0m`)
    }
}

exports.getNotificationList = async (req, res) => {
    console.log('[GET] - /api/notification/')
    try {
        const notification = await Notification.findAll()

        await throwSuccess({
            content: { resultList: notification },
            log: '\x1b[32m[GET] - /api/notification - Notification founded\x1b[0m',
            res,
        })
    } catch (e) {
        console.error(`\x1b[31m${e}\x1b[0m`)
    }
}

exports.getMetadata = async (req, res) => {
    try {
        // console.log('[GET] - /api/notification/metadata')
        await throwSuccess({
            content: {
                notificationTypesOptions: Notification.getAttributes().type.values,
                notificationStatusOptions: Notification.getAttributes().status.values,
            },
            log: '\x1b[32m[GET] - /api/notification/metadata\x1b[0m',
            res,
        })
    } catch (e) {
        console.error(`\x1b[31m${e}\x1b[0m`)
    }
}