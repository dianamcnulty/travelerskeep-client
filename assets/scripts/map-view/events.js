'use strict'
const newVacationTemplate = require('../templates/addVacation.handlebars')
const countryAPI = require('../API/country-api')

const goToNewVacation = function (event) {
  console.log('pressed the add adventure button')
  countryAPI.getAllCountries()
    .then((countries) => {
      console.log('countries', countries)
      $('#map-view').hide()
      $('#content-container').html(newVacationTemplate(countries))
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
