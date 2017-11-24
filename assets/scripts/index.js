'use strict'
const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const authEvents = require('./auth/authevents')
const loginTemplate = require('./templates/login.handlebars')
const map = require('./map-view/map')
const mapEvents = require('./map-view/events')
// const views = require('./nav/views.js')
$(() => {
  setAPIOrigin(location, config)
})
$(map)
$(() => {
  $('#map-view').hide()
  $('#content-container').html(loginTemplate())
  $('#sign-up').hide()
  $('#logout').hide()
})
$(() => {
  authEvents.clickHandlers()
  mapEvents.mapViewHandlers()
})
