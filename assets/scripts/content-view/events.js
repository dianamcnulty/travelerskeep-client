'use strict'
const vacationAPI = require('../API/vacation-api')
const newVacationEvents = require('../add-vacation/events')

const deleteVacation = function (event) {
  const vacationId = event.target.dataset.id
  vacationAPI.deleteVacation(vacationId)
    .then((response) => {
      newVacationEvents.backToMap()
      $('#section-alerts').text('Trip was successfully deleted.')
      $('#section-alerts').show()
      $('#section-alerts').fadeOut(400)
    })
    .catch(console.error)
}
const updateVacation = function (event) {
  console.log('clicked the update button. vacation id is', event.target.dataset.id)
}

const contentViewHandlers = function () {
  $(document).on('click', '#delete-vacation-btn', deleteVacation)
  $(document).on('click', '#update-vacation-btn', updateVacation)
}

module.exports = {
  contentViewHandlers
}
