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
      console.log('Vacation data is', response)
      $('#content-container').html(storyPhotoTemplate(response))
    })
    .catch((response) => console.log('fail!'))
}
const onSaveStory = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  console.log('story data is', data)
  storyAPI.createStory(data)
    .then(addVacationUI.addStorySuccess)
    .catch(console.error)
}
const sendToTrip = function (event) {
  const vacationId = event.target.dataset.vacationid
  updateEvents.sendToTrip(vacationId)
}
const newVacationHandlers = function () {
  $('.add-input').val('')
  $(document).on('submit', '#add-vacation-form', onCreateVacation)
  $(document).on('click', '#cancel-new-vacation', mapEvents.backToMap)
  $(document).on('submit', '#add-story', onSaveStory)
  $(document).on('click', '#done', sendToTrip)
  $(document).on('click', '#skip', sendToTrip)
  $(document).on('submit', '#photo-form', photoAPI.createPhoto)
  $(document).on('change', '#select-country', function () {
    if ($('#select-country').val() === 'United States') {
      $('.select-state').show()
    } else {
      $('.select-state').hide()
      $('.select-state').val('')
    }
  })
}
module.exports = {
  newVacationHandlers
  // createUploadEncoded,
  // createUploadMultiPart
}
