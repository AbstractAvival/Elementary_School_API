// utilities
const { isDateExpired } = require( "/app/source/utilities/dates" )
const { paginationConstants } = require( "/app/source/utilities/constants/pagination" )

function jwtTokenFormat( token, userData ) {
    return {
        id: userData.id,
        password_expired: isDateExpired( userData.password_expires_on, new Date().toISOString().slice( 0, 19 ).replace( "T", " " ) ) ? "Y" : "N",
        role: userData.role,
        token: token
    }
}

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
    jwtTokenFormat,
    paginationFormat
}