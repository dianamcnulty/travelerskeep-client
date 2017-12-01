'use strict'
const editTripTemplate = require('../templates/updateVacation.handlebars')
const countryAPI = require('../API/country-api')
// similar functionality to add vacation, but uses vacation data to populate the fields.
const showEditVacation = function (vacation) {
  const states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY']
  countryAPI.getAllCountries()
    .then((countries) => {
      $('#map-view').hide()
      $('#section-alerts').html('')
      countries.countries.forEach((country) => {
        // to use countryname for id's in template need to provied a version without spaces and punctuation
        country.idValue = country.name.replace(/ /g, '').replace(/\./g, '')
      })
      const places = {places: {nations: countries, states: states}}
      $('#content-container').html(editTripTemplate(places))
      return countries
    })
    .then(() => {
      const trip = vacation.vacation
      const vacationCountry = trip.country.replace(/ /g, '').replace(/\./g, '')
      $('#' + vacationCountry).attr('selected', 'selected')
      if (trip.state) { $('#' + trip.state).attr('selected', 'selected') }
      if (trip.month) { $('#' + trip.month).attr('selected', 'selected') }
      $('#year').val(trip.year)
      $('#companions').val(trip.companions)
      $('#vacation-id-input').val(trip.id)
      $('#cancel-new-vacation').attr('data-id', trip.id)
    })
}

module.exports = {
  showEditVacation
}
