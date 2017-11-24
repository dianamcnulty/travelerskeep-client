'use strict'
const newVacationTemplate = require('../templates/addVacation.handlebars')

const goToNewVacation = function (event) {
  console.log('pressed the add adventure button')
  $('#map-view').hide()
  $('#content-container').html(newVacationTemplate())
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
