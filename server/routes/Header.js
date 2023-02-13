const environment = require("../environment");
module.exports = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', environment.cors.origin)
    res.header('Access-Control-Allow-Methods', environment.cors.methods.join(','))
    res.header('Access-Control-Allow-Headers', environment.cors.allowedHeaders.join(','))
    next()
}