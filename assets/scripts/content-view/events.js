'use strict'
const vacationAPI = require('../API/vacation-api')
const storyAPI = require('../API/story-api')
const photoAPI = require('../API/photo-api')
const mapEvents = require('../map-view/events')
const storyPhotoTemplate = require('../templates/add-story-photo.handlebars')
const updateUI = require('../updates/update-trip-ui')
const editStoryTemplate = require('../templates/edit-story.handlebars')
const contentTemplate = require('../templates/content.handlebars')

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
      $('#highlighted-content').html('<h3>' + response.story.title + "</h3><br><p style='white-space:pre-wrap;' class='story'>" + response.story.content + '</p><br><a id="go-edit-story" data-id="' + response.story.id + '">edit story</a>')
    })
}
const showImage = function (event) {
  const url = event.target.dataset.url
  const caption = event.target.dataset.caption
  const photoID = event.target.dataset.id
  // const tripID = event.target.dataset.tripid
  // console.log('trip Id?', tripID)
  // $('#highlighted-content').html("<div class='center-children'><img class='feature-photo' src='" + url + "'><p class='caption'>" + caption + "</p><a class='warning' id='delete-photo' data-toggle='modal' data-target='#delete-photo-modal' data-id='" + photoID + "' data-tripid='" + tripID + "'>Delete this Photo</a></div>")
  $('.feature-photo').attr('src', url)
  $('.caption').html(caption)
  $('#delete-photo').attr('data-id', photoID)
}
const openDeleteImgModal = function (event) {
  const photoID = event.target.dataset.id
  const tripID = event.target.dataset.tripid
  console.log('dataset is', event.target.dataset)
  $('#delete-photo-cnfrm').attr('data-id', photoID)
  $('#delete-photo-cnfrm').attr('data-tripid', tripID)
}
const deleteImage = function (event) {
  const photoID = event.target.dataset.id
  const tripID = event.target.dataset.tripid
  console.log('event.target.dataset is', event.target.dataset)
  photoAPI.deletePhoto(photoID)
    .then((response) => {
      vacationAPI.getOneVacation(tripID)
      .then(vacation => {
        $('#section-alerts').html('<span class="success">Photo was successfully deleted.</span>')
        $('#content-container').html(contentTemplate(vacation))
      })
    })
    .catch($('#section-alerts').html('<span class="warning">We encountered an error retrieving your trip details, please try again.</span>'))
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
// scrolls the image carousel when the adorable paper airplanes are clicked.
const scrollLeft = function () {
  const currentPosition = $('.rg-image-wrapper').scrollLeft()
  $('.rg-image-wrapper').scrollLeft(currentPosition + 40)
}
const scrollRight = function () {
  const currentPosition = $('.rg-image-wrapper').scrollLeft()
  $('.rg-image-wrapper').scrollLeft(currentPosition - 40)
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
  $('#delete-photo-cnfrm').on('click', deleteImage)
  $(document).on('click', '#delete-photo', openDeleteImgModal)
}

module.exports = {
  contentViewHandlers
}
