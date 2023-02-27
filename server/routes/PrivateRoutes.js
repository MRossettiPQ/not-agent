const NotificationController = require("../src/app/Notification/Controllers/NotificationController")
const UserController = require("../src/app/User/Controllers/UserController")
const {VerifyToken} = require("../src/core/middleware/AuthorizeJwt");
const {VerifyRoles} = require("../src/core/middleware/AuthorizeRoles");
const {AsyncHandler, AsyncHandlers} = require("../src/core/utils/RequestUtil");

module.exports = (app) => {
    // TODO Notification
    app.post('/api/notification', AsyncHandlers([VerifyToken, VerifyRoles(['ADMINISTRATOR'])], true), AsyncHandler(NotificationController.postNotification))
    app.get('/api/notification', AsyncHandlers([VerifyToken, VerifyRoles(['ADMINISTRATOR'])], true), AsyncHandler(NotificationController.getNotificationList))
    app.get('/api/notification/:id', AsyncHandlers([VerifyToken, VerifyRoles(['ADMINISTRATOR'])], true), AsyncHandler(NotificationController.getNotification))

    // TODO User
    app.post('/api/user', AsyncHandlers([VerifyToken], true), AsyncHandler(UserController.postSaveUser))

}