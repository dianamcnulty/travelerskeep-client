'use strict'
const vacationAPI = require('../API/vacation-api')
const getFormFields = require(`../../../lib/get-form-fields`)
const contentTemplate = require('../templates/content.handlebars')
const storyAPI = require('../API/story-api')

const onUpdateTrip = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  console.log('updateData is', data)
  const id = data.vacation.id
  vacationAPI.updateVacation(data)
    .then((response) => vacationAPI.getOneVacation(id))
    .then(vacation => {
      console.log('vacation is', vacation)
      $('#map-view').hide()
      $('#content-container').html(contentTemplate(vacation))
    })
}
const onEditStory = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  console.log('clicked submit edit story data is', data)
  storyAPI.updateStory(data)
}
const updateViewHandlers = function () {
  $(document).on('submit', '#update-vacation-form', onUpdateTrip)
  $(document).on('submit', '#edit-story', onEditStory)
}

module.exports = {
  updateViewHandlers
}
