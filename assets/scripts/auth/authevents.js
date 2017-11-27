const getFormFields = require(`../../../lib/get-form-fields`)
const authui = require('./authui')
const api = require('../API/userapi')

const signUpBehavior = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.signUp(data)
    .then(() => api.logIn(data))
    .then(authui.logInSuccess)
    .catch(authui.signUpFail)
}
const logInBehavior = function (event) {
  event.preventDefault()
  console.log('log-in clicked')
  const data = getFormFields(this)
  api.logIn(data)
    .then(authui.logInSuccess)
    .catch(authui.logInFail)
}
const logOutBehavior = function () {
  api.logOut()
    .then(authui.logOutSuccess)
    .catch(() => $('#password.message').text('Whoops, there was an error logging out. Please try that again.'))
}
const passwordBehavior = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.updatePassword(data)
    .then(authui.passwordSuccess)
    .catch(authui.passwordFail)
}
const clickHandlers = function () {
  $(document).on('submit', '#sign-up', signUpBehavior)
  $(document).on('submit', '#log-in', logInBehavior)
  $('#logout-nav').on('click', logOutBehavior)
  $(document).on('submit', '#password-update', passwordBehavior)
  $(document).on('click', '#sign-up-link', () => {
    $('#sign-up-link').hide()
    $('#auth-error').text('')
    $('#sign-up').show()
  })
}
module.exports = {
  clickHandlers // need to import to index, then call this function at ready
}
