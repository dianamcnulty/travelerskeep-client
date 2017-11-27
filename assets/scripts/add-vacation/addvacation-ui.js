'use strict'
const addPhotoSuccess = function (caption) {
  $('#photo-list-label').text('Photos Successfully Added:')
  $('#photo-container').append('<p>' + caption + '<p>')
  $('#choose-label').text('Choose Another File')
}

module.exports = {
  addPhotoSuccess
}
