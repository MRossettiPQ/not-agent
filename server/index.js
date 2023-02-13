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
    .alias('l', 'locale')
    .alias('f', 'filename')
    .alias('c', 'content')
    .demandOption('locale').argv

module.exports = (async () => {
    try {
        // Set locale
        i18n.setLocale(yargs.locale)

        // Instance express
        const app = express()
        const server = http.createServer(app);
        const io = new Server(server, {
            cors: environment.cors
        });

        // Internationalization
        app.use(i18n.init)

        // Database initialization
        await initDataBase()

        // Cors rules
        app.use(cors())

        // Folder containing the SPA project after the build is performed
        app.use(express.static('public'))

        // Parse requests of content-type - application/json
        app.use(bodyParser.json({limit: '50mb'}))

        // Parse requests of content-type - application/x-www-form-urlencoded
        app.use(bodyParser.urlencoded({extended: true}))

        // Morgan logging
        app.use(morgan('combined'))

        // Socket Manager
        socket(io)

        // Routes
        routes(app)

        // Set port, listen for requests
        server.listen(environment.host.port, () =>
            console.log(
                `[SERVER] - ${i18n.__('main.initialized')} ${environment.host.port}`
            )
        )
    } catch (e) {
        console.log(`[SERVER] - ${i18n.__('main.error')}  `)
        console.log(e)
    }
})()