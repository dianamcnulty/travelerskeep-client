const store = require('../store')
// const view = require('../nav/views.js')
const loginTemplate = require('../templates/login.handlebars')
// const mapEvents = require('../map-view/events')
const map = require('../map-view/map')
// const mapTemplate = require('../templates/mapview.handlebars')

// const signUpSuccess = function (data) {
//   // console.log('signed up successfully', store)
//   $('#section-alerts').css('color', '#546819')
//   $('#section-alerts').text('Thanks for signing up! Enter your new user name and password to log in.')
//   $('#auth-error').hide()
//   $('#sign-up').hide()
//   $('#loginmessage').hide()
//   $('.login').val('')
//   // console.log(data)
// }
const signUpFail = function () {
  $('#section-alerts').hide()
  $('#section-alerts').html('<span class="warning">Sorry, there was an issue signing up. Please try again.</span>')
  $('#section-alerts').fadeIn(200)
}
const logInFail = function () {
  $('#section-alerts').hide()
  $('#section-alerts').html('<span class="warning">Sorry, sign in failed. Please try again.</span>')
  $('#section-alerts').fadeIn(200)
  $('.login').val('')
}
const logInSuccess = function (data) {
  console.log('log in success')
  store.user = data.user
  $('.login').val('')
  $('#section-alerts').html('')
  $('#content-container').html('')
  map.renderMap()
  $('#map-view').show()
  $('#nav').show()
}
const logOutSuccess = function (data) {
  store.user = null
  console.log('logged out successfully')
  $('#signupmessage').text('')
  $('#map-view').hide()
  $('#content-container').html(loginTemplate())
  $('#sign-up').hide()
  $('#nav').hide()
  $('#world-map').html('')
  $('#us-map').html('')
  $('#section-alerts').html('<span class="success">logged out successfully</span>')
}
const passwordSuccess = function (data) {
  $('#section-alerts').html('<span class="success">Your password has beeen updated. Please use your new password next time you log in.</span>')
  $('#password-modal').modal('hide')
  $('#oldpass').val('')
  $('#newpass').val('')
}
const passwordFail = function () {
  $('#password-alert').hide()
  $('#oldpass').val('')
  $('#newpass').val('')
  $('#password-alert').text('uh oh... your password update didn\'t process. Please Try again')
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
