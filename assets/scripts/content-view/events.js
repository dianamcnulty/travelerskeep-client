'use strict'
const vacationAPI = require('../API/vacation-api')
const storyAPI = require('../API/story-api')
const mapEvents = require('../map-view/events')
const storyPhotoTemplate = require('../templates/add-story-photo.handlebars')

const deleteVacation = function (event) {
  const vacationId = $('#delete-vacation-btn').attr('data-id')
  console.log('vacation id is', vacationId)
  vacationAPI.deleteVacation(vacationId)
    .then((response) => {
      $('#delete-vacation-modal').modal('hide')
      mapEvents.backToMap()
      $('#section-alerts').text('Trip was successfully deleted.')
      $('#section-alerts').show()
      $('#section-alerts').fadeOut(400)
    })
    .catch(console.error)
}
const updateVacation = function (event) {
  console.log('clicked the update button. vacation id is', event.target.dataset.id)
}
const showStory = function (event) {
  const storyId = event.target.dataset.id
  storyAPI.getOneStory(storyId)
    .then(response => {
      $('#highlighted-content').html('<h3>' + response.story.title + '</h3><br><p>' + response.story.content + '</p>')
    })
    .catch(console.error)
}
const goToStoryPhotos = function (event) {
  const vacation = {vacation: {id: event.target.dataset.id}}
  console.log('vacation is ', vacation)
  $('#content-container').html(storyPhotoTemplate(vacation))
}
const contentViewHandlers = function () {
  $(document).on('click', '#delete-vacation-cnfrm', deleteVacation)
  $(document).on('click', '#update-vacation-btn', updateVacation)
  $(document).on('click', '.story-link', showStory)
  $(document).on('click', '#add-story-photo', goToStoryPhotos)
}

module.exports = {
  contentViewHandlers
}
