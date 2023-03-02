const { toNumber } = require('lodash')

const MergeFields = (entity, strFields) => {
    // CASO NÃO TENHA PEGAR TODOS DA ENTIDADE
    if (!strFields.length) {
        return Object.keys(entity.getAttributes())
    }
    let fields = []
    // FIELDS REQUISITADOS
    if (strFields.length) {
        fields = strFields?.split(',')
    }
    return fields.filter((f) => Object.keys(entity.getAttributes()).includes(f))
}

function getOffset(page, rpp) {
    return page * rpp
}

function getEndPosition(page, rpp, resultLength) {
    if (page > 0) {
        return page * rpp + resultLength
    }
    return resultLength
}

const PaginationUtil = async (
    entity,
    {
        rpp = 10,
        page = 0,
        field = '',
        order = [['id', 'DESC']],
        where = null,
        options,
    } = {}
) => {
    // TRANSFORMAR PARAMS EM NUMERO
    const actualPage = toNumber(page)
    const actualRpp = toNumber(rpp)
    // OFFSET DA QUERY NO BANCO
    const offset = getOffset(actualPage, actualRpp)
    // CAMPOS REQUISITADOS NA QUERY
    const fields = MergeFields(entity, field)
    // QUERY NO BANCO
    const result = await entity?.findAndCountAll({
        limit: actualRpp,
        where,
        order,
        attributes: fields,
        offset,
        ...options,
    })
    // POSIÇÃO DO RESULTADO CONSIDERANDO OFFSET
    let endPosition = getEndPosition(actualPage, actualRpp, result.rows.length)
    // RESULTADO DA PAGINAÇÃO
    return {
        resultList: result.rows,
        count: result.count,
        rpp,
        page,
        endPosition,
        hasMore: result.count > endPosition,
    }
}

module.exports = {
    MergeFields,
    PaginationUtil,
}
