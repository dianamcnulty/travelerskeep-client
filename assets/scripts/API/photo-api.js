'use strict'
const config = require('../config')
const store = require('../store')
const addVacationUi = require('../add-vacation/addvacation-ui')

const createPhoto = function (e) {
  e.preventDefault()
  // creates a new instance of the FileReader JS prototype
  const reader = new FileReader()

  // every time the reader finishes a read operation do this:
  reader.onload = function (event) {
    $.ajax({
      url: config.apiOrigin + '/photos',
      method: 'POST',
      headers: {
        Authorization: 'Token token=' + store.user.token
      },
      data: { photo: {
        caption: $('#caption').val(),
        vacation_id: $('#vacationID').val(),
        img: event.target.result // result of reading the file
      }}
      // I probably could have used .then and .catch here. The example did it this way and it works...
    }).done(function (response) {
      const caption = response.photo.caption
      addVacationUi.addPhotoSuccess(caption)
    }).fail(function (response) {
    })
  }
  // read the first file of the file input field
  const fileInput = $('#img')
  // invokes the reader
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
const deletePhoto = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/photos/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  createPhoto,
  getAllPhotos,
  deletePhoto
}
