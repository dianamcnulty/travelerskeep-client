'use strict'
const vacationAPI = require('../API/vacation-api')
const storyAPI = require('../API/story-api')
const mapEvents = require('../map-view/events')
const storyPhotoTemplate = require('../templates/add-story-photo.handlebars')
const updateUI = require('../updates/update-trip-ui')
const editStoryTemplate = require('../templates/edit-story.handlebars')

const deleteVacation = function (event) {
  const vacationId = $('#delete-vacation-btn').attr('data-id')
  console.log('vacation id is', vacationId)
  vacationAPI.deleteVacation(vacationId)
    .then((response) => {
      $('#delete-vacation-modal').modal('hide')
      mapEvents.backToMap()
      $('#section-alerts').text('Trip was successfully deleted.')
      $('#section-alerts').show()
    })
    .catch(console.error)
}
const editVacation = function (event) {
  const id = event.target.dataset.id
  vacationAPI.getOneVacation(id)
    .then((response) => {
      updateUI.showEditVacation(response)
    })
  console.log('clicked the update button. vacation id is', event.target.dataset.id)
}
const showStory = function (event) {
  const storyId = event.target.dataset.id
  storyAPI.getOneStory(storyId)
    .then(response => {
      $('#highlighted-content').html('<h3>' + response.story.title + '</h3><br><p>' + response.story.content + '</p><br><a id="go-edit-story" data-id="' + response.story.id + '">edit story</a>')
    })
    .catch(console.error)
}
const goToStoryPhotos = function (event) {
  const vacation = {vacation: {id: event.target.dataset.id}}
  console.log('vacation is ', vacation)
  $('#content-container').html(storyPhotoTemplate(vacation))
}
const goEditStory = function (event) {
  const storyId = event.target.dataset.id
  storyAPI.getOneStory(storyId)
    .then((response) => {
      console.log('onestory response is', response)
      $('#content-container').html(editStoryTemplate(response))
    })
}
const contentViewHandlers = function () {
  $(document).on('click', '#delete-vacation-cnfrm', deleteVacation)
  $(document).on('click', '#update-vacation-btn', editVacation)
  $(document).on('click', '.story-link', showStory)
  $(document).on('click', '#add-story-photo', goToStoryPhotos)
  $(document).on('click', '#go-edit-story', goEditStory)
}

module.exports = {
  contentViewHandlers
}
