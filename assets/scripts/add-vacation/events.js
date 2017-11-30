'use strict'
const getFormFields = require(`../../../lib/get-form-fields`)
const vacationAPI = require('../API/vacation-api')
const storyAPI = require('../API/story-api')
const mapEvents = require('../map-view/events')
const storyPhotoTemplate = require('../templates/add-story-photo.handlebars')
const photoAPI = require('../API/photo-api')
const updateEvents = require('../updates/events')
const addVacationUI = require('./addvacation-ui')

const onCreateVacation = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  vacationAPI.createVacation(data)
    .then((response) => {
      $('#content-container').html(storyPhotoTemplate(response))
      $('#section-alerts').html('<p class="success">Trip Details Saved Successfully</p>')
    })
    .catch(() => {
      $('#section-alerts').html('<p class="success">We were unable to create your vacation. Please Try again.</p>')
    })
}
const onSaveStory = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  storyAPI.createStory(data)
    .then(addVacationUI.addStorySuccess)
    .catch(() => {
      $('#section-alerts').html('<p class="success">We were unable to save your stroy. Please Try again.</p>')
    })
}
const sendToSendToTrip = function (event) {
  $('#section-alerts').html('')
  const vacationId = event.target.dataset.vacationid
  updateEvents.sendToTrip(vacationId)
}
const showStateField = function (event) {
  if ($('#select-country').val() === 'United States') {
    $('.select-state').show()
  } else {
    $('.select-state').hide()
    $('.select-state').val('')
  }
}
const newVacationHandlers = function () {
  $('.add-input').val('')
  $('#new-nav').on('click', mapEvents.goToNewVacation)
  $(document).on('submit', '#add-vacation-form', onCreateVacation)
  $(document).on('click', '#cancel-new-vacation', mapEvents.backToMap)
  $(document).on('submit', '#add-story', onSaveStory)
  $(document).on('click', '#done', sendToSendToTrip)
  $(document).on('click', '#skip', sendToSendToTrip)
  $(document).on('submit', '#photo-form', photoAPI.createPhoto)
  $(document).on('change', '#select-country', showStateField)
}
module.exports = {
  newVacationHandlers
}
