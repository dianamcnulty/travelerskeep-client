'use strict'
const vacationAPI = require('../API/vacation-api')
const storyAPI = require('../API/story-api')
const mapEvents = require('../map-view/events')
const storyPhotoTemplate = require('../templates/add-story-photo.handlebars')
const updateUI = require('../updates/update-trip-ui')
const editStoryTemplate = require('../templates/edit-story.handlebars')

const deleteVacation = function (event) {
  const vacationId = $('#delete-vacation-btn').attr('data-id')
  vacationAPI.deleteVacation(vacationId)
    .then((response) => {
      $('#delete-vacation-modal').modal('hide')
      mapEvents.backToMap()
      $('#section-alerts').html('<span class="success">Trip was successfully deleted.</span>')
      $('#section-alerts').show()
    })
    .catch($('#section-alerts').html('<span class="warning">We encountered an error deleting this trip, please try again.</span>'))
}
const editVacation = function (event) {
  const id = event.target.dataset.id
  vacationAPI.getOneVacation(id)
    .then((response) => {
      updateUI.showEditVacation(response)
      $('#section-alerts').html('')
    })
    .catch($('#section-alerts').html('<span class="warning">We encountered an error retrieving your trip details, please try again.</span>'))
}
const showStory = function (event) {
  const storyId = event.target.dataset.id
  storyAPI.getOneStory(storyId)
    .then(response => {
      $('#highlighted-content').html('<h3>' + response.story.title + "</h3><br><p class='story'>" + response.story.content + '</p><br><a id="go-edit-story" data-id="' + response.story.id + '">edit story</a>')
    })
}
const goToStoryPhotos = function (event) {
  const vacation = {vacation: {id: event.target.dataset.id}}
  $('#section-alerts').html('')
  $('#content-container').html(storyPhotoTemplate(vacation))
}
const goEditStory = function (event) {
  const storyId = event.target.dataset.id
  storyAPI.getOneStory(storyId)
    .then((response) => {
      $('#section-alerts').html('')
      $('#content-container').html(editStoryTemplate(response))
    })
}
const scrollLeft = function () {
  const currentPosition = $('.rg-image-wrapper').scrollLeft()
  $('.rg-image-wrapper').scrollLeft(currentPosition + 40)
}
const scrollRight = function () {
  const currentPosition = $('.rg-image-wrapper').scrollLeft()
  $('.rg-image-wrapper').scrollLeft(currentPosition - 40)
}
const showImage = function (event) {
  const url = event.target.dataset.url
  const caption = event.target.dataset.caption
  $('#highlighted-content').html("<img class='feature-photo' src='" + url + "'><p class='caption'>" + caption + '</p>')
}
const contentViewHandlers = function () {
  $(document).on('click', '#delete-vacation-cnfrm', deleteVacation)
  $(document).on('click', '#update-vacation-btn', editVacation)
  $(document).on('click', '.story-link', showStory)
  $(document).on('click', '#add-story-photo', goToStoryPhotos)
  $(document).on('click', '#go-edit-story', goEditStory)
  $(document).on('click', '#scroll-left', scrollLeft)
  $(document).on('click', '#scroll-right', scrollRight)
  $(document).on('click', '.thumb', showImage)
}

module.exports = {
  contentViewHandlers
}
