const { Notification } = require('../../../core/DataBase')


let notificationInDeadlineLoading = false
exports.getNotificationInDeadline = async () => {
    let notifications = []

    try {
        notificationInDeadlineLoading = true
        notifications = await Notification.findAll({
            where: {
                status: 'ABERTO'
            }
        })
    } catch (e) {
        console.log(e)
    } finally {
        notificationInDeadlineLoading = false
    }

    return notifications
}