'use strict'
const vacationAPI = require('../API/vacation-api')
const getFormFields = require(`../../../lib/get-form-fields`)
const contentTemplate = require('../templates/content.handlebars')
const storyAPI = require('../API/story-api')

const sendToTrip = function (id) {
  vacationAPI.getOneVacation(id)
    .then(vacation => {
      console.log('vacation is', vacation)
      $('#map-view').hide()
      $('#content-container').html(contentTemplate(vacation))
    })
    .catch(console.error)
}
const onUpdateTrip = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  console.log('updateData is', data)
  const id = data.vacation.id
  vacationAPI.updateVacation(data)
    .then((response) => sendToTrip(id))
    .catch(console.error)
}
const onEditStory = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  console.log('clicked submit edit story data is', data)
  storyAPI.updateStory(data)
    .then(response => {
      const id = response.story.vacation.id
      sendToTrip(id)
    })
    .catch(console.error)
}
const cancelUpdate = function (event) {
  const vacationId = event.target.dataset.id
  console.log('vacationId is', vacationId)
  sendToTrip(vacationId)
}
const onDeleteStory = function (event) {
  const vacationId = $('#delete-story-btn').attr('data-vacation')
  const storyId = $('#delete-story-btn').attr('data-id')
  storyAPI.deleteStory(storyId)
    .then(() => {
      sendToTrip(vacationId)
    })
    .catch(console.error)
}
const updateViewHandlers = function () {
  $(document).on('submit', '#update-vacation-form', onUpdateTrip)
  $(document).on('submit', '#edit-story', onEditStory)
  $(document).on('click', '#cancel-update-story', cancelUpdate)
  $(document).on('click', '#delete-story-cnfrm', onDeleteStory)
}

module.exports = {
  updateViewHandlers
}
