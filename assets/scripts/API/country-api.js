const config = require('../config')

const getAllCountries = function () {
  return $.ajax({
    url: config.apiOrigin + '/countries',
    method: 'GET'

  })
}
const getOneCountry = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/countries/' + id,
    method: 'GET'

  })
}

module.exports = {
  getAllCountries,
  getOneCountry
}
