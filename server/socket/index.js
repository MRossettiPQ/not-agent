const NotificationService = require("../src/app/Notification/Services/NotificationService")
const {i18n} = require("../src/core/utils/i18nUtil");
const {logColor} = require("../src/core/utils/LogUtil");

module.exports = (io) => {
    logColor('SERVER:SOCKETIO', i18n.__('socket.init'), 'fg.yellow')
    io.on('connection', (socket) => {
        logColor('SERVER:SOCKETIO', i18n.__('socket.connection'), 'fg.yellow')
        io.emit('deadline', {
            message: 'Notificações',
            data: {}
        })

        socket.on('disconnect', (socket) => {
            logColor('SERVER:SOCKETIO', i18n.__('socket.disconnect'), 'fg.yellow')
        })
    })
    /*
    io.interval = setInterval(async () => {
        const nClients = io.sockets.sockets.size
        logColor('SERVER:SOCKETIO', `${i18n.__('socket.check_notifications')} - Clients(${nClients})`,)
        if (nClients > 0) {
            const notifications = await NotificationService.getNotificationInDeadline()
            if (notifications.length) {
                io.emit('deadline', {
                    message: 'Notificações',
                    data: notifications
                })
            }
        }
    }, 10000)

     */
}