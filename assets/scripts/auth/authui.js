const store = require('../store')
// const view = require('../nav/views.js')
const loginTemplate = require('../templates/login.handlebars')
const mapEvents = require('../map-view/events')
const map = require('../map-view/map')
// const mapTemplate = require('../templates/mapview.handlebars')
const signUpFail = function () {
  $('#section-alerts').hide()
  $('#section-alerts').text('Sorry, there was an issue signing up. Please try again.')
  $('#section-alerts').fadeIn(200)
}
const logInFail = function () {
  $('#section-alerts').hide()
  $('#section-alerts').text('Sorry, sign in failed. Please try again.')
  $('#section-alerts').fadeIn(200)
  $('.login').val('')
}
const logInSuccess = function (data) {
  console.log('log in success')
  store.user = data.user
  $('.login').val('')
  $('#content-container').html('')
  map.renderMap()
  $('#map-view').show()
  $('#nav').show()
}
const logOutSuccess = function (data) {
  store.user = null
  $('#map-view').hide()
  $('#content-container').html(loginTemplate())
  $('#sign-up').hide()
  $('#nav').hide()
}
const passwordSuccess = function (data) {
  // console.log('password changed successfully')
  $('#section-alerts').css('color', '#546819')
  $('#section-alerts').text('Your password has beeen updated. Please use your new password next time you log in.')
  $('#password-update').hide()
  $('#oldpass').val('')
  $('#newpass').val('')
}
const passwordFail = function () {
  $('#password-alert').hide()
  $('#oldpass').val('')
  $('#newpass').val('')
  $('#password-alert').html("<span class='warning'>uh oh... your password update didn't process. Please Try again</span>")
  $('#password-alert').fadeIn(200)
}
module.exports = {
  // signUpSuccess,
  signUpFail,
  logInSuccess,
  logOutSuccess,
  passwordSuccess,
  passwordFail,
  logInFail
}
