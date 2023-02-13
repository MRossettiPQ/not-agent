const NotificationController = require("../src/app/Notification/Controllers/NotificationController")

module.exports = (app) => {
    // TODO Notification
    app.post('/api/notification', NotificationController.postNotification)
    app.get('/api/notification', NotificationController.getNotificationList)
    app.get('/api/notification/:id', NotificationController.getNotification)
}