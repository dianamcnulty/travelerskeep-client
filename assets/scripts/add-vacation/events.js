'use strict'
const getFormFields = require(`../../../lib/get-form-fields`)
const vacationAPI = require('../API/vacation-api')
const map = require('../map-view/map')

const onCreateVacation = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  vacationAPI.createVacation(data)
    .then((response) => {
      console.log('Vacation data is', response)
      backToMap()
    })
    .catch((response) => console.log('fail!'))
}
const backToMap = function () {
  console.log('cancel button clicked')
  $('#content-container').html('')
  $('#world-map').html('')
  map.renderMap()
  $('#map-view').show()
}
const newVacationHandlers = function () {
  $('.add-input').val('')
  $(document).on('submit', '#add-vacation-form', onCreateVacation)
  $(document).on('click', '#cancel-new-vacation', backToMap)
}
module.exports = {
  newVacationHandlers
}
