// Error 500 -
exports.throwErrorIf = ({
                            cond = true,
                            message = 'Error!!',
                            log = null,
                            res,
                        }) => {
    return new Promise((resolve, reject) => {
        if (cond) {
            res.status(500).send({
                message: message,
            })
            reject(log)
        } else {
            resolve(true)
        }
    })
}

exports.throwError = ({ message = 'Error!!', log = null, res }) => {
    return new Promise((resolve, reject) => {
        if (log !== null) {
            console.log(log)
        }
        res.status(500).send({
            message: message,
        })
        reject(log)
    })
}

exports.resError = ({ message = 'Error!!', log = null, res }) => {
    if (log !== null) {
        console.log(log)
    }
    res.status(500).send({
        message,
    })
    return {
        error: true
    }
}

// Error 200 -
exports.throwSuccess = ({
                            content = null,
                            message = null,
                            log = null,
                            res,
                        }) => {
    return new Promise((resolve, reject) => {
        if (log !== null) {
            console.log(log)
        }
        res.status(200).send({
            content: content,
            message: message,
        })
        resolve(true)
    })
}

// Error 403 -
exports.throwForbidden = ({ message = null, log = null, res }) => {
    return new Promise((resolve, reject) => {
        res.status(403).send({
            message: message,
        })
        reject(log)
    })
}

exports.throwForbiddenIf = ({
                                cond = true,
                                message = null,
                                log = null,
                                res,
                            }) => {
    return new Promise((resolve, reject) => {
        if (cond) {
            res.status(403).send({
                message: message,
            })
            reject(log)
        } else {
            resolve(true)
        }
    })
}

// Error 404 -
exports.throwNotFoundIf = ({
                               cond = true,
                               message = null,
                               log = null,
                               res,
                           }) => {
    return new Promise((resolve, reject) => {
        if (cond) {
            res.status(404).send({
                message: message,
            })
            reject(log)
        } else {
            resolve(true)
        }
    })
}

exports.throwNotFound = ({ message = null, log = null, res }) => {
    return new Promise((resolve, reject) => {
        res.status(404).send({
            message: message,
        })
        reject(log)
    })
}

// Error 401 -
exports.throwUnauthorized = ({ message = null, log = null, res }) => {
    return new Promise((resolve, reject) => {
        res.status(401).send({
            message: message,
        })
        reject(log)
    })
}

exports.throwUnauthorizedIf = ({ cond, message = null, log = null, res }) => {
    return new Promise((resolve, reject) => {
        if (cond) {
            res.status(401).send({
                message: message,
            })
            reject(log)
        } else {
            resolve(true)
        }
    })
}
