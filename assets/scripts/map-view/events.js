'use strict'
const newVacationTemplate = require('../templates/addVacation.handlebars')
const countryAPI = require('../API/country-api')
const map = require('./map')
const vacationAPI = require('../API/vacation-api')
const contentTemplate = require('../templates/content.handlebars')

const goToNewVacation = function (event) {
  const states =  ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"]
  countryAPI.getAllCountries()
    .then((countries) => {
      $('#map-view').hide()
      const places = {places: {nations: countries, states: states}}
      $('#content-container').html(newVacationTemplate(places))
    })
}
const goToCountry = function (event) {
  event.preventDefault()
  const vacationId = $(this).find(':selected').data('id')
  console.log('clicked go button. vacation id is', vacationId)
  vacationAPI.getOneVacation(vacationId)
    .then(vacation => {
      console.log('vacation is', vacation)
      $('#map-view').hide()
      $('#content-container').html(contentTemplate(vacation))
    })
}
const mapViewHandlers = function () {
  $(document).on('click', '#add-vacation', goToNewVacation)
  $(document).on('submit', '#select-country', goToCountry)
  $(document).on('click', '.jvectormap-region', (e) => {
    console.log('country code is', e.target.dataset.code)
    // if (e.target.dataset.code === 'US') {
    //   showUS()
    // }
  })
}

module.exports = {
  mapViewHandlers
}
