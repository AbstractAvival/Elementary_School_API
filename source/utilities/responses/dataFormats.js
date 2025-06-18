const { paginationConstants } = require( '/app/source/utilities/constants/paginationConstants' )

function paginationFormat( data, paginationParameters, totalCount ) {
    const totalPages = parseInt( totalCount / ( paginationParameters.limit ?? paginationConstants.DEFAULT_LIMIT ) )
    const offsetPage = totalCount % ( paginationParameters.limit ?? paginationConstants.DEFAULT_LIMIT ) != 0

    return {
        current_page: paginationParameters.page ?? paginationConstants.DEFAULT_PAGE,
        data: data,
        per_page: paginationParameters.limit ?? paginationConstants.DEFAULT_LIMIT,
        total_entries: totalCount,
        total_pages: offsetPage ? totalPages + 1 : totalPages
    }
}

module.exports = {
    paginationFormat
}