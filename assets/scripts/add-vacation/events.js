'use strict'
const getFormFields = require(`../../../lib/get-form-fields`)
const vacationAPI = require('../API/vacation-api')
const storyAPI = require('../API/story-api')
const mapEvents = require('../map-view/events')
const storyPhotoTemplate = require('../templates/add-story-photo.handlebars')
const photoApi = require('../API/photo-api')

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
    .then(response => {
      const title = response.story.title
      console.log('title is', title)
      $('#story-container').append('<label>' + title + '</label><br>')
      $('#story-title-field').val('')
      $('#story-content-field').val('')
    })
    .catch(console.error)
}

// upload Events

const createUploadEncoded = function (event) {
  event.preventDefault()
  console.log('it did something')

  const data = getFormFields(event.target)

  photoApi.createEnc(data)
    .then(console.log)
    .catch(console.error)
}

const createUploadMultiPart = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log('getformfields is', data)
  const formData = new FormData(event.target)
  console.log('formData is', formData)
  photoApi.createPhoto(formData)
    .then(console.log)
    .catch(console.error)
}

// event handlers

const newVacationHandlers = function () {
  $('.add-input').val('')
  $(document).on('submit', '#add-vacation-form', onCreateVacation)
  $(document).on('click', '#cancel-new-vacation', mapEvents.backToMap)
  $(document).on('submit', '#add-story', onSaveStory)
  $(document).on('click', '#done', mapEvents.backToMap)
  $(document).on('skip', '#done', mapEvents.backToMap)
  $(document).on('submit', '#photo-form', createUploadMultiPart)
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
  newVacationHandlers,
  createUploadEncoded,
  createUploadMultiPart
}
