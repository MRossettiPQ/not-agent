const express = require('express')
const http = require('http');
const {Server} = require("socket.io");
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const environment = require('./environment')
const {initDataBase} = require('./src/core/database')
const routes = require('./routes')
const socket = require('./socket')
const {i18n} = require('./src/core/Utils/i18nUtil')
const yargs = require('yargs')
    .alias('l', 'locale').argv

class NotAgent {
    inialized = false

    app

    constructor() {}

    init() {
        return new Promise(async (resolve, reject) => {
            try {
                let locale = 'pt-br'
                if (yargs.locale) {
                    // Set locale
                    locale = yargs.locale
                }
                i18n.setLocale(locale)

                // Instance express
                this.app = express()
                const server = http.createServer(this.app);
                const io = new Server(server, {
                    cors: environment.cors
                });

                // Internationalization
                this.app.use(i18n.init)

                // Database initialization
                await initDataBase()

                // Cors rules
                this.app.use(cors())

                // Folder containing the SPA project after the build is performed
                this.app.use(express.static(__dirname + '/public'))

                // Parse requests of content-type - application/json
                this.app.use(bodyParser.json({limit: '50mb'}))

                // Parse requests of content-type - application/x-www-form-urlencoded
                this.app.use(bodyParser.urlencoded({extended: true}))

                // Morgan logging
                this.app.use(morgan('combined'))

                // Socket Manager
                socket(io)

                // Routes
                routes(this.app)

                // Set port, listen for requests
                server.listen(environment.host.port, () => {
                        console.log(
                            `[SERVER] - ${i18n.__('main.initialized')} ${environment.host.port}`
                        )
                        this.inialized = true
                        resolve(true)
                    }
                )
            } catch (e) {
                console.log(`[SERVER] - ${i18n.__('main.error')}  `)
                console.log(e)
                reject()
            }
        })
    }

    get statusInicialization() {
        return this.inialized
    }
}

module.exports = {
    NotAgent: NotAgent
}