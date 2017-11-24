'use strict'
const getFormFields = require(`../../../lib/get-form-fields`)
const vacationAPI = require('../API/vacation-api')

const onCreateVacation = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  vacationAPI.createVacation(data)
    .then((response) => console.log('success!'))
    .catch((response) => console.log('fail!'))
}
const backToMap = function () {
  console.log('cancel button clicked')
  $('#content-container').html('')
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
