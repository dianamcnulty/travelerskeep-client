'use strict'
const vacationAPI = require('../API/vacation-api')
const getFormFields = require(`../../../lib/get-form-fields`)
const contentTemplate = require('../templates/content.handlebars')

const onUpdateTrip = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  console.log('updateData is', data)
  const id = data.vacation.id
  vacationAPI.updateVacation(data)
    .then((response) => vacationAPI.getOneVacation(id))
    .then(vacation => {
      console.log('vacation is', vacation)
      $('#map-view').hide()
      $('#content-container').html(contentTemplate(vacation))
    })
}

const updateViewHandlers = function () {
  $(document).on('submit', '#update-vacation-form', onUpdateTrip)
}

module.exports = {
  updateViewHandlers
}
