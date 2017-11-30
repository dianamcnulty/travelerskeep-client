'use strict'
const addPhotoSuccess = function (caption) {
  $('#photo-list-label').text('Photos Successfully Added:')
  $('#photo-container').append('<li>' + caption + '</li><br>')
  $('#choose-label').text('Choose Another File')
}
const addStorySuccess = function (vacation) {
  const title = vacation.story.title
  $('#story-list-label').text('Stories Successfully Added:')
  $('#story-container').append('<li>' + title + '</li><br>')
  $('#story-title-field').val('')
  $('#story-content-field').val('')
}
module.exports = {
  addPhotoSuccess,
  addStorySuccess
}
