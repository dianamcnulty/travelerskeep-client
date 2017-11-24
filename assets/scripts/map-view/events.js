'use strict'

const goToAddVacation = function (event) {
  console.log('pressed the add adventure button')
}
const goToCountry = function (event) {
  event.preventDefault()
  console.log('clicked go button')
}

const mapViewHandlers = function () {
  $(document).on('click', '#add-vacation', goToAddVacation)
  $(document).on('submit', '#select-country', goToCountry)
}

module.exports = {
  mapViewHandlers
}
