const { toNumber } = require('lodash')

exports.PaginationUtil = async (
    entity,
    {
        rpp = 10,
        page = 1,
        size = 0,
        field = '',
        order = [['id', 'DESC']],
        where = null,
    }
) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
        try {
            const offset = toNumber(page) * toNumber(size)
            let fields = []
            if (field.length) {
                fields = field?.split(',')
            }
            console.log(fields)
            const result = await entity?.findAndCountAll({
                ...where,
                order,
                attributes: fields,
            })
            resolve(result)
        } catch (e) {
            console.log(e)
            reject(e)
        }
    })
}