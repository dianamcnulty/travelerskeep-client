'use strict'
const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const map = require('./map')
const authevents = require('./auth/authevents')
const loginTemplate = require('./templates/login.handlebars')
$(() => {
  setAPIOrigin(location, config)
})

$(map)
$(() => {
  authevents.clickHandlers()
  $('#content-container').html(loginTemplate())
})
// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
