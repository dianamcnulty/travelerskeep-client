'use strict'
const newVacationTemplate = require('../templates/addVacation.handlebars')
const countryAPI = require('../API/country-api')

const goToNewVacation = function (event) {
  console.log('pressed the add adventure button')
  const states = ["N/A", "AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"]
  countryAPI.getAllCountries()
    .then((countries) => {
      console.log('countries', countries)
      $('#map-view').hide()
      const places = {places: {nations: countries, states: states}}
      console.log('places is', places)
      $('#content-container').html(newVacationTemplate(places))
    })
}
const goToCountry = function (event) {
  event.preventDefault()
  console.log('clicked go button')
}

const mapViewHandlers = function () {
  $(document).on('click', '#add-vacation', goToNewVacation)
  $(document).on('submit', '#select-country', goToCountry)
}

module.exports = {
  mapViewHandlers
}
