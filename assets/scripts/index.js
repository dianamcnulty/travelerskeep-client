'use strict'
const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const authEvents = require('./auth/authevents')
const loginTemplate = require('./templates/login.handlebars')
const contentView = require('./content-view/events')
const mapEvents = require('./map-view/events')
const createVacationEvents = require('./add-vacation/events')
const updateView = require('./update-view/events')
$(() => {
  setAPIOrigin(location, config)
})

$(() => {
  $('#map-view').hide()
  $('#content-container').html(loginTemplate())
  $('#sign-up').hide()
  $('#nav').hide()
})
$(() => {
  authEvents.clickHandlers()
  mapEvents.mapViewHandlers()
  contentView.contentViewHandlers()
  createVacationEvents.newVacationHandlers()
  updateView.updateViewHandlers()
})
