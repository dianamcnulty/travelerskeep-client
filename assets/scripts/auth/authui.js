const store = require('../store')
// const view = require('../nav/views.js')
const loginTemplate = require('../templates/login.handlebars')
// const mapEvents = require('../map-view/events')
const map = require('../map-view/map')
// const mapTemplate = require('../templates/mapview.handlebars')
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
  $('#map-view').hide()
  $('#content-container').html(loginTemplate())
  $('#sign-up').hide()
  $('#nav').hide()
  $('#world-map').html('')
  $('#us-map').html('')
  $('#section-alerts').html('')
  $('#login-quote').html('"Let us step into the night and pursue that flighty temptress, adventure."<br>― J.K. Rowling, Harry Potter and the Half-Blood Prince')
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
