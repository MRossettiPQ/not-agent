const NotificationService = require("../src/app/Notification/Services/NotificationService")
const notifier = require('node-notifier');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('[Socket-IO] - Client conectado');
        io.emit('deadline', {
            message: 'Notificações',
            data: {}
        })
    });

    io.interval = setInterval(async () => {
        const notifications = await NotificationService.getNotificationInDeadline()
        if(notifications.length) {
            io.emit('deadline', {
                message: 'Notificações',
                data: notifications
            })

            /*
            notifier.notify({
                title: 'Você possui notificações',
                message: 'Hello, there!'
            });
            */
        }
    }, 10000)
}