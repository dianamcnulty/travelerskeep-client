'use strict'
const config = require('../config')
const store = require('../store')

const createEnc = function (data) {
  return $.ajax({
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const createPhoto = function (data) {
  console.log('photo data is', data)
  return $.ajax({
    url: config.apiOrigin + '/photos',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data,
    contentType: false,
    processData: false
  })
}

module.exports = {
  createEnc,
  createPhoto
}
