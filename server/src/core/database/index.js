const {Sequelize} = require('sequelize')
const fs = require('fs')
const path = require('path')
const mysql = require('mysql2')
const environment = require('../../../environment')
const {i18n} = require('../utils/i18nUtil')
const {logColor} = require("../utils/LogUtil");

module.exports = new class Database {
    // TODO Database connection using Sequelize - configure in environment
    sequelize = new Sequelize(
        environment.database.name,
        environment.database.user,
        environment.database.password,
        {
            host: environment.database.host,
            port: environment.database.port,
            dialect: environment.database.dialect,
            logging: environment.database.logging,
            pool: {
                max: environment.database.pool.max,
                min: environment.database.pool.min,
                acquire: environment.database.pool.acquire,
                idle: environment.database.pool.idle,
            },
        }
    )

    models = {}

    get allModels() {
        return this.models
    }

    constructor() {
    }

    initDataBase() {
        return new Promise(async (resolve, reject) => {
            try {
                // Before init sequelize
                await this.createDatabaseIfNotExists()

                // Init and sync sequelize
                // TODO - { force : false } option to drop the data from the database -> if true it will delete the entire database at each startup
                await this.sequelize.sync({force: environment.database.wipe_on_start})
                logColor('SERVER:DATABASE', i18n.__('database.rsync'))
                resolve()
            } catch (e) {
                logColor('SERVER:DATABASE', i18n.__('database.rsync_error'), 'fg.red')
                reject(e)
            }
        })
    }

    loadModels() {
        const appPath = path.resolve(__dirname, '..\\..\\app')
        logColor('SERVER:SEQUELIZE', i18n.__('sequelize.load_models'))
        fs.readdirSync(appPath, {withFileTypes: true})
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => {
                const modelsPath = appPath + '\\' + dirent.name + '\\Models'
                const exist = fs.existsSync(modelsPath)
                if (exist) {
                    fs.readdirSync(modelsPath)
                        .filter((file) => {
                            return (
                                file.indexOf('.') !== 0 &&
                                file !== appPath &&
                                file.slice(-3) === '.js'
                            )
                        })
                        .map((file) => {
                            const model = require(path.join(modelsPath, file))
                            const modelName = file.substring(0, file.indexOf('.js'))
                            this.models[modelName] = model(this.sequelize, Sequelize)
                            logColor('SERVER:SEQUELIZE:MODELS', modelName)
                        })
                }
            })
        // Find all associations, Model by Model
        Object.keys(this.models).forEach((modelName) => {
            if (this.models[modelName].associate) {
                this.models[modelName].associate(this.models)
            }
        })
    }

    createDatabase = async (pool) => {
        const sql = `CREATE DATABASE IF NOT EXISTS ${environment.database.name};`
        return await this.asyncQuerySql({
            pool,
            sql
        })
    }
    checkDatabaseIfExists = async (pool) => {
        const sql = `SHOW DATABASES LIKE "${environment.database.name}"`
        return await this.asyncQuerySql({
            pool,
            sql
        })
    }
    createDatabaseIfNotExists = async () => {
        const pool = mysql.createPool({
            host: environment.database.host,
            port: environment.database.port,
            user: environment.database.user,
            password: environment.database.password,
        })
        await this.checkDatabaseIfExists(pool)
        await this.createDatabase(pool)
        pool.end()
    }
    asyncQuerySql = ({pool, sql}) => {
        logColor('SERVER:DATABASE:SQL', sql)
        return new Promise((resolve, reject) => {
            pool.query(sql, (err, result) => {
                if (err != null) {
                    logColor('SERVER:DATABASE:SQL:ERROR', err?.toString(), 'fg.red')
                    return reject(err)
                }
                if (result) {
                    //console.log('[DATABASE:SQL:RESULT] - ', result)
                    return resolve(result)
                }
            })
        })
    }
}