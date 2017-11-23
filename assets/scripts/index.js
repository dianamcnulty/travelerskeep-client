'use strict'
const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const authevents = require('./auth/authevents')
const loginTemplate = require('./templates/login.handlebars')
// const views = require('./nav/views.js')
$(() => {
  setAPIOrigin(location, config)
})

$(() => {
  authevents.clickHandlers()
  $('#content-container').html(loginTemplate())
  $('#sign-up').hide()
})
// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
