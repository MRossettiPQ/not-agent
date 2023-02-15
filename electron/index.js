const {app, BrowserWindow, Notification, Tray, Menu, nativeImage, shell} = require('electron')
const {io} = require('socket.io-client')
const environment = require('./environment')
const {NotAgent} = require('../server/NotAgent')

class App {
    loaded = false
    tray
    socket

    server = new NotAgent()

    constructor() {
        this.init().then(() => console.log('[APP] Initialized'))
    }

    async createTrayMenu() {
        // Generate tray icon
        const icon = nativeImage.createFromPath('./assets/icon.png')
        this.tray = new Tray(icon)

        // Tray icon menu
        const contextMenu = Menu.buildFromTemplate([
            {
                label: 'Open',
                type: 'normal',
                icon: icon.resize({width: 32, height: 32}),
                click: async () => {
                    // Open Window in browser
                    await shell.openExternal("http://localhost:8000")
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Close',
                type: 'normal',
                click: async () => {
                    // Close app
                    app.quit()
                }
            },
        ])

        this.tray.setContextMenu(contextMenu)
        this.tray.setToolTip('This is my application')
        this.tray.setTitle('This is my title')
    }

    async createSocket() {
        this.socket = io(environment.host.url_socket)

        this.socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        this.socket.on('deadline', (obj) => {
            console.log('deadline: ', obj);
            this.notification({
                title: 'Deadline',
                body: 'Uma nova notificação disponivel'
            })
        });
    }

    async createServer() {
        await this.server.init()
    }

    async notification({title = 'title', body = 'body'} = {}) {
        const icon = nativeImage.createFromPath('./assets/icon.png')
        const notification = new Notification({
            title,
            body,
            icon: icon.resize({width: 32, height: 32})
        })

        notification.on('click', (event, arg) => {
            shell.openExternal("http://localhost:8000/notifications")
        })

        notification.show()
    }

    async init() {
        try {
            await app.whenReady()

            await this.createTrayMenu()

            await this.createServer()

            await this.createSocket()
        } catch (e) {
            console.log(e)
        } finally {
            this.loaded = true
        }
    }
}


const n = new App()