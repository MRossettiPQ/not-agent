const {throwSuccess, throwError} = require("../../../core/utils/RequestUtil");
const {i18n} = require("../../../core/utils/i18nUtil");
const {Notification} = require('../../../core/database').models

exports.postNotification = async (req) => {
    const {id: idNotification} = req.body
    let notification = await Notification.findByPk(idNotification)

    if (notification) {
        // Update registered patient
        notification = await notification.update({
            ...req.body,
        })
    } else {
        notification = await Notification.create(req.body)
    }

    if(!!notification) {
        return  await throwError({
            local: 'SERVER:NOTIFICATION',
            message: i18n.__('notification.not_saved'),
            log: i18n.__('notification.not_saved'),
        })
    }

    return await throwSuccess({
        local: 'SERVER:NOTIFICATION',
        content: notification,
        message: i18n.__('notification.saved'),
        log: i18n.__('notification.saved'),
    })
}

exports.getNotification = async (req) => {
    const {id: idNotification} = req.params
    const notification = await Notification.findByPk(idNotification)

    if (!notification) {
        return await throwError({
            local: 'SERVER:NOTIFICATION',
            message: i18n.__('notification.not_founded'),
            log: i18n.__('notification.not_founded'),
        })
    }

    return await throwSuccess({
        local: 'SERVER:NOTIFICATION',
        content: notification,
        log: i18n.__('notification.founded'),
    })
}

exports.getNotificationList = async (req) => {
    const notifications = await Notification.findAll()

    return await throwSuccess({
        local: 'SERVER:NOTIFICATION',
        content: {
            resultList: notifications
        },
        log: i18n.__('notification.founded'),
    })
}

exports.getMetadata = async (req, res) => {
    return await throwSuccess({
        local: 'SERVER:NOTIFICATION',
        content: {
            notificationTypesOptions: Notification.getAttributes().type.values,
            notificationStatusOptions: Notification.getAttributes().status.values,
        },
    })
}