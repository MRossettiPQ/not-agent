const {logColor} = require("./LogUtil");

// Setups
const ServerResponses = {
    Success: {
        code: 200,
        message: 'Success',
        color: 'fg.green'
    },
    Unauthorized: {
        code: 401,
        message: 'Unauthorized!',
        color: 'fg.red'
    },
    Forbidden: {
        code: 403,
        message: 'Forbidden!',
        color: 'fg.red'
    },
    NotFound: {
        code: 404,
        message: 'Error 404 Not Found!',
        color: 'fg.blue'
    },
    InternalError: {
        code: 500,
        message: 'Internal error!',
        color: 'fg.red'
    },
    ValidationErrorItem: {
        code: 500,
        message: 'Internal error!',
        color: 'fg.red'
    },
    ValidationError: {
        code: 500,
        message: 'Internal error!',
        color: 'fg.red'
    },
}

// Resolver para caso seja servido arquivos estaticos no servidor
const SpaResolver = (req, res, next) => {
    const toApi = req.originalUrl.includes('/api')
    if(toApi) {
        return next()
    }
    return res.redirect(`/#${req.originalUrl}`)
}

// Gerenciador em cadeia de controllers
const AsyncHandlers = (handlers = [], middleware = false) => {
    return handlers.map((callback, index) => AsyncHandler(callback, middleware, index))
}

// Gerenciador de conexão
const AsyncHandler = (callback, middleware = false, index = 0) => {
    return function (req, res, next) {
        let result = null
        function setResult(v) {
            result = v
        }

        if(!middleware) {
            logColor('SERVER:REQUEST', `[${req.method}] - ${req.originalUrl}`, 'fg.magenta')
        }

        callback(req, res, next)
            .then(setResult)
            .catch(setResult)
            .finally(() => {
                // Em caso de não ser um middleware e não possuir type, considerar como erro
                if (!result?.type && !middleware) {
                    result = {
                        type: 'InternalError',
                        message: result?.toString(),
                        local: 'SERVER:ERROR',
                        color: 'fg.red',
                    }
                }

                // Em caso de ser um middleware e não possuir type, considerar como sucesso
                if (!result?.type && middleware) {
                    result = {
                        type: 'Success',
                    }
                }
                // Em caso de não ser um middleware responser em qualquer caso
                // Em caso de ser um middleware só responder a request se não for um sucesso
                if(!middleware || (middleware && !['Success'].includes(result.type) )) {
                    logColor(result?.local, `[${req.method}] - ${req.originalUrl}`, ServerResponses[result?.type]?.color || 'reset')
                    res
                        .status(ServerResponses[result.type].code)
                        .send({
                            message: result?.message,
                            content: result?.content
                        })
                        .end()
                }
            })
    }
}

// Error 500
function throwError({
                        message = ServerResponses.InternalError.message,
                        local = '',
                        log = ''
                    }) {
    return new Promise((resolve, reject) => {
        return reject({
            type: 'InternalError',
            local,
            log,
            message
        })
    })
}

// Success 200
function throwSuccess({
                          content = null,
                          message = '',
                          log = '',
                          local = ''
                      }) {
    return new Promise((resolve) => {
        return resolve({
            type: 'Success',
            local,
            log,
            message,
            content
        })
    })
}


// Error 403
function throwForbidden({message = null, local = 'SERVER:FORBIDDEN', log = ''}) {
    return new Promise((resolve, reject) => {
        return reject({
            type: 'Forbidden',
            local,
            log,
            message,
        })
    })
}

// Error 404
function throwNotFound({message = null, local = 'SERVER:NOTFOUND', log = ''}) {
    return new Promise((resolve, reject) => {
        return reject({
            type: 'NotFound',
            local,
            log,
            message,
        })
    })
}

// Error 401
function throwUnauthorized({message = null, local = 'SERVER:UNAUTHORIZED', log = ''}) {
    return new Promise((resolve, reject) => {
        return reject({
            type: 'Unauthorized',
            local,
            log,
            message,
        })
    })
}

module.exports = {
    SpaResolver,
    AsyncHandlers,
    AsyncHandler,
    throwError,
    throwSuccess,
    throwForbidden,
    throwNotFound,
    throwUnauthorized
}