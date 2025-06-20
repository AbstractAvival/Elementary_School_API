function getOffsetDate( offsetDays ) {
    const currentDate = new Date()
    const offsetDate = new Date()
    offsetDate.setDate( currentDate.getDate() + parseInt( offsetDays ) )
    return offsetDate
}

module.exports = {
    getOffsetDate
}