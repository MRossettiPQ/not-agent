const NotificationController = require("../src/app/Notification/Controllers/NotificationController");
const AuthenticationController = require("../src/app/User/Controllers/AuthenticationController");
const {AsyncHandler} = require("../src/core/utils/RequestUtil");

module.exports = (app) => {
    // TODO Notification
    app.get('/api/notification/metadata', AsyncHandler(NotificationController.getMetadata))

    // TODO Login
    app.post('/api/auth/login', AsyncHandler(AuthenticationController.login))
    app.post('/api/auth/register', AsyncHandler(AuthenticationController.register))
}