'use strict'
const config = require('../config')
const store = require('../store')
const addVacationUi = require('../add-vacation/addvacation-ui')

const createPhoto = function (e) {
  e.preventDefault()
  // creates a new instance of the FileReader object prototype
  const reader = new FileReader()

  // setting a function to be executed every time the reader successfully completes a read operation
  reader.onload = function (event) {
    // once the data url has been loaded, make the ajax request with the result set as the value to key 'poster'
    $.ajax({
      url: config.apiOrigin + '/photos',
      method: 'POST',
      headers: {
        Authorization: 'Token token=' + store.user.token
      },
      data: { photo: {
        caption: $('#caption').val(),
        vacation_id: $('#vacationID').val(),
        img: event.target.result
      }}
    }).done(function (response) {
      const caption = response.photo.caption
      addVacationUi.addPhotoSuccess(caption)
    }).fail(function (response) {
      console.error('Awww crud!!')
    })
  }

  // read the first file of the file input
  const fileInput = $('#img')
  reader.readAsDataURL(fileInput[0].files[0])
}

const getAllPhotos = function (vacationId) {
  return $.ajax({
    url: config.apiOrigin + '/photos',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      photo: {vacation_id: vacationId}
    }
  })
}

module.exports = {
  createPhoto,
  getAllPhotos
}
