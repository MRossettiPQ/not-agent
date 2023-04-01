const { toNumber, intersection } = require('lodash')

const MergeOrder = (entity, orderBy) => {
    const allFieldsOfEntity = Object.keys(entity.getAttributes())
    // CASO REQUEST NÃO TENHA CAMPOS ESPECIFICOS, ORDENAR APENAS PELO ID
    if (!orderBy.length) {
        return [['id', 'ASC']]
    }
    // RETORNA CAMPOS DE ORDENAÇÃO VALIDOS
    const resultOrder = orderBy.filter((o) => allFieldsOfEntity.includes(o[0]))
    if (resultOrder.length) {
        return orderBy.map((o) => o)
    }
    // CASO REQUEST NÃO TENHA CAMPOS VALIDOS, ORDENAR APENAS PELO ID
    return [['id', 'ASC']]
}

const MergeFields = (entity, strFields) => {
    const allFieldsOfEntity = Object.keys(entity.getAttributes())
    // CASO REQUEST NÃO TENHA CAMPOS ESPECIFICOS, PEGAR TODOS CAMPOS DA ENTIDADE
    if (!strFields.length) {
        return allFieldsOfEntity
    }
    let fields = []
    // SPLITA CAMPOS REQUISITADOS NA REQUEST
    if (strFields.length) {
        fields = strFields?.split(',')
    }
    // RETORNA CAMPOS SOLICITADOS QUE ESTEJAM NA ENTIDADE
    const resultFields = intersection(allFieldsOfEntity, fields)
    if (resultFields.length) {
        return resultFields
    }
    // CASO NENHUM CAMPO SOLICITADO SEJA VALIDO RETORNAR TODOS
    return allFieldsOfEntity
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

function getMaxPages(count, rpp) {
    const maxPages = count / rpp
    if (maxPages <= 1) {
        return count / rpp
    }
    return Math.ceil(maxPages)
}

const PaginationUtil = async (
    entity,
    {
        rpp = 10,
        page = 0,
        field = '',
        order = [['id', 'ASC']],
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
    let count = result.count
    // POSIÇÃO DO RESULTADO CONSIDERANDO OFFSET
    let endPosition = getEndPosition(actualPage, actualRpp, result.rows.length)
    // RESULTADO DA PAGINAÇÃO
    return {
        resultList: result.rows,
        count,
        rpp,
        page,
        endPosition,
        more: result.count > endPosition,
        maxPages: getMaxPages(count, rpp, result.rows.length),
    }
}

function GetWhere(cond, where) {
    if (cond) {
        return {
            ...where,
        }
    }
    return {}
}

module.exports = {
    MergeFields,
    PaginationUtil,
    GetWhere,
}
