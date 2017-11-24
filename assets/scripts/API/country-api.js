const config = require('../config')
// const store = require('../store')

// pass in "data" to form
// when ajax is called set data first with this: const data = getFormFields(this)

const getAllCountries = function () {
  return $.ajax({
    url: config.apiOrigin + '/countries',
    method: 'GET'
    // headers: {
    //   Authorization: 'Token token=' + store.user.token
    // }
  })
}
const getOneCountry = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/countries/' + id,
    method: 'GET'
    // headers: {
    //   Authorization: 'Token token=' + store.user.token
    // }
  })
}

module.exports = {
  getAllCountries,
  getOneCountry
}
