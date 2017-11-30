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
      const places = {places: {nations: countries, states: states}}
      $('#content-container').html(editTripTemplate(places))
      const trip = vacation.vacation
      // this selects the correct country, state, and month in the dropdowns on the edit page
      $('#' + trip.country).attr('selected', 'selected')
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
