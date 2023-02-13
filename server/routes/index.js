const Header = require("./Header")
const PublicRoutes = require("./PublicRoutes")
const PrivateRoutes = require("./PrivateRoutes")

module.exports = (app) => {
    // TODO ping
    app.get('/ping', (req, res) => {
        res.json({
            message: '[SERVER] - Ping route'
        })
    })

    // TODO set header
    app.use(Header)

    // TODO public routes (no authentication)
    PublicRoutes(app)

    // TODO private routes (with authentication)
    PrivateRoutes(app)
}