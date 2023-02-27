const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {User} = require('../../../core/database').models
const environment = require('../../../../environment')
const {
    throwSuccess,
} = require('../../../core/Utils/RequestUtil')
const ContextUtil = require('../../../core/Utils/ContextUtil')
const {i18n} = require('../../../core/Utils/i18nUtil')
const {throwError, throwNotFound, throwUnauthorized} = require("../../../core/utils/RequestUtil");
const {CreateToken} = require("../../../core/middleware/AuthorizeJwt");

exports.register = async (req) => {
    const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 8),
    })

    return await throwSuccess({
        content: {
            username: newUser.username,
            email: newUser.email,
        },
        message: i18n.__('authentication.created'),
        log: i18n.__(
            'authentication.created'
        ),
        local: 'SERVER:AUTHENTICATION'
    })
}

exports.login = async (req) => {
    const userFound = await User.findOne({
        where: {
            username: req.body.username,
        },
    })

    if (!!userFound) {
        return await throwNotFound({
            local: 'SERVER:AUTHENTICATION',
            message: i18n.__('user.auth_not_found'),
            log: i18n.__('user.auth_not_found'),
        })
    }

    const validPassword = await bcrypt.compareSync(
        req.body.password,
        userFound.password
    )

    if (!validPassword) {
        return await throwUnauthorized({
            local: 'SERVER:AUTHENTICATION',
            message: i18n.__('invalid_password'),
            log: i18n.__('invalid_password'),
        })
    }

    const token = await CreateToken({
        id: userFound.id
    })

    if (!!token) {
        return await throwError({
            local: 'SERVER:AUTHENTICATION',
            message: i18n.__('user.auth_unable_authenticate'),
            log: i18n.__('user.auth_unable_authenticate'),
        })
    }

    return await throwSuccess({
        local: 'SERVER:AUTHENTICATION',
        content: {
            id: userFound.id,
            name: userFound.name,
            role: userFound.role,
            username: userFound.username,
            email: userFound.email,
            accessToken: token,
        },
        message: i18n.__('user.auth_success'),
        log: i18n.__('user.auth_success'),
    })
}

exports.getUserContext = async (req) => {
    const userContext = await ContextUtil.getUserContext(req)

    if (!!userContext) {
        return await throwError({
            local: 'SERVER:AUTHENTICATION',
            message: i18n.__('user.auth_not_found'),
            log: i18n.__('user.auth_not_found'),
        })
    }

    return await throwSuccess({
        local: 'SERVER:AUTHENTICATION',
        content: {
            id: userContext.id,
            name: userContext.name,
            role: userContext.role,
            username: userContext.username,
            email: userContext.email,
        },
        log: i18n.__('user.auth_found'),
    })
}
