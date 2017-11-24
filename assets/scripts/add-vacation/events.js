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

const newVacationHandlers = function () {
  $(document).on('submit', '#add-vacation-form', onCreateVacation)
}
module.exports = {
  newVacationHandlers
}
