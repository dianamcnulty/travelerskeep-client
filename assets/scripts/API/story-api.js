const config = require('../config')
const store = require('../store')

// pass in "data" to form
// when ajax is called set data first with this: const data = getFormFields(this)
const createStory = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/stories',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

const getAllStories = function () {
  return $.ajax({
    url: config.apiOrigin + '/stories',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}
const getOneStory = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/stories/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}
const updateStory = function (data) {
  const id = data.story.id
  return $.ajax({
    url: config.apiOrigin + '/stories/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}
const deleteStory = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/stories/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}
module.exports = {
  createStory,
  getAllStories,
  getOneStory,
  updateStory,
  deleteStory
}
