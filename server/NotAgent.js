const express = require('express')
const http = require('http');
const {Server} = require("socket.io");
const bodyParser = require('body-parser')
const {logColor} = require("./src/core/utils/LogUtil");
const morgan = require('morgan')
const cors = require('cors')
const environment = require('./environment')
const {i18n} = require('./src/core/Utils/i18nUtil')
const Database = require('./src/core/database')

// const yargs = require('yargs').alias('l', 'locale').argv

class NotAgent {
    app

    constructor() {
    }

    async init() {
        try {
            logColor('SERVER', i18n.__('main.init'), 'fg.blue')
            await Database.loadModels()

            // Only after models are loaded
            logColor('SERVER', i18n.__('main.load_routes'))
            const routes = require('./routes')
            logColor('SERVER', i18n.__('main.load_socket'))
            const socket = require('./socket')

            // Instance express
            this.app = express()
            const server = http.createServer(this.app);
            // Set socket.io server
            const io = new Server(server, {
                cors: environment.cors
            });

            // Internationalization
            this.app.use(i18n.init)

            // Database initialization
            await Database.initDataBase()

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

            // Listen server in port
            await server.listen(environment.host.port)
            logColor('SERVER', `${i18n.__('main.initialized')} ${environment.host.port}`, 'fg.blue')
        } catch (e) {
            logColor('SERVER', i18n.__('main.error'), 'fg.red')
            console.log(e)
        }
    }
}

module.exports = {
    NotAgent: NotAgent
}