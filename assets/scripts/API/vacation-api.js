const config = require('../config')
const store = require('../store')

const createVacation = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/vacations',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

const getAllVacations = function () {
  return $.ajax({
    url: config.apiOrigin + '/vacations',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}
const getOneVacation = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/vacations/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}
const updateVacation = function (data) {
  const id = parseInt(data['vacation']['id'])
  return $.ajax({
    url: config.apiOrigin + '/vacations/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}
const deleteVacation = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/vacations/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}
module.exports = {
  createVacation,
  getAllVacations,
  getOneVacation,
  updateVacation,
  deleteVacation
}
