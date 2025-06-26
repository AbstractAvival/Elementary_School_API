const { DateTime, Duration } = require( 'luxon' )

function getOffsetDate( offsetDays ) {
    const currentDate = new Date()
    const offsetDate = new Date()
    offsetDate.setDate( currentDate.getDate() + parseInt( offsetDays ) )
    return offsetDate
}

function isDateExpired( dateToCheck, targetDate ) {
    const test = DateTime.fromISO( dateToCheck.replace( " ", "T" ) )
    const limit = DateTime.fromISO( targetDate.replace( " ", "T" ) )
    const difference = Duration.fromObject( test.diff( limit, [ 'years', 'months', 'days' ] ).toObject() )

    return Number( process.env.DEFAULT_PASSWORD_EXPIRATION_DAY_LENGTH ) - difference.as( 'days' ) > Number( process.env.DEFAULT_PASSWORD_EXPIRATION_DAY_LENGTH )
}

module.exports = {
    getOffsetDate,
    isDateExpired
}