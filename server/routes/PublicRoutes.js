const NotificationController = require("../src/app/Notification/Controllers/NotificationController");
module.exports = (app) => {
    // TODO Notification
    app.get('/api/notification/metadata', NotificationController.getMetadata)
}