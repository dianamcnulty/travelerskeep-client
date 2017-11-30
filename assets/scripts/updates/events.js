'use strict'
const vacationAPI = require('../API/vacation-api')
const getFormFields = require(`../../../lib/get-form-fields`)
const contentTemplate = require('../templates/content.handlebars')
const storyAPI = require('../API/story-api')

const sendToTrip = function (id) {
  vacationAPI.getOneVacation(id)
    .then(vacation => {
      $('#map-view').hide()
      $('#content-container').html(contentTemplate(vacation))
      return vacation
    })
}
const onUpdateTrip = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  const id = data.vacation.id
  vacationAPI.updateVacation(data)
    .then((response) => {
      sendToTrip(id)
      $('#section-alerts').html('<span class="success">Details for this journey have been successfully updated</span>')
    })
    .catch($('#section-alerts').html('<span class="warning">We encountered an error updating your trip details, please try again.</span>'))
}
const onEditStory = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  storyAPI.updateStory(data)
    .then(response => {
      const id = response.story.vacation.id
      sendToTrip(id)
      $('#section-alerts').html('<span class="success">Story Successfully Updated</span>')
    })
    .catch($('#section-alerts').html('<span class="warning">We encountered an error updating your story, please try again.</span>'))
}
const cancelUpdate = function (event) {
  const vacationId = event.target.dataset.id
  sendToTrip(vacationId)
  $('#section-alerts').html('')
}
const onDeleteStory = function (event) {
  // when user clicks the button to open the delete modal, send the vacation id to the confirm delete button within the modal
  const vacationId = $('#delete-story-btn').attr('data-vacation')
  const storyId = $('#delete-story-btn').attr('data-id')
  storyAPI.deleteStory(storyId)
    .then(() => {
      sendToTrip(vacationId)
      $('#section-alerts').html('<span class="success">Story Successfully Deleted</span>')
    })
    .catch($('#section-alerts').html('<span class="warning">We encountered an error deleting your story, please try again.</span>'))
}
const updateViewHandlers = function () {
  $(document).on('submit', '#update-vacation-form', onUpdateTrip)
  $(document).on('submit', '#edit-story', onEditStory)
  $(document).on('click', '#cancel-update-story', cancelUpdate)
  $(document).on('click', '#delete-story-cnfrm', onDeleteStory)
}

module.exports = {
  updateViewHandlers,
  sendToTrip
}
