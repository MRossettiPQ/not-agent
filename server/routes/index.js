const Header = require("./Header")
const PublicRoutes = require("./PublicRoutes")
const PrivateRoutes = require("./PrivateRoutes")
const environment = require("../environment");
const {SpaResolver} = require("../src/core/utils/RequestUtil");

module.exports = (app) => {
    if(environment.development) {
        // TODO ping
        app.get('/ping', (req, res) => {
            res.json({
                message: '[SERVER] - Ping route'
            })
        })
    }

    // TODO redirect to page in spa or api
    if(!environment.just_api) {
        app.use(SpaResolver);
    }

    // TODO set header
    app.use(Header)

    // TODO public routes (no authentication)
    PublicRoutes(app)

    // TODO private routes (with authentication)
    PrivateRoutes(app)
}