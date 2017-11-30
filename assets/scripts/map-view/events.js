'use strict'
const newVacationTemplate = require('../templates/addVacation.handlebars')
const countryAPI = require('../API/country-api')
const map = require('./map')
const vacationAPI = require('../API/vacation-api')
const contentTemplate = require('../templates/content.handlebars')

const goToNewVacation = function () {
  // this array should eventually be moved to an API resource. It's used in 2 places.
  const states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY']
  // get countries to populate country dropdown
  countryAPI.getAllCountries()
    .then((countries) => {
      $('#map-view').hide()
      $('#section-alerts').html('')
      // reformat our response so we can send both states and countries to the template
      const places = {places: {nations: countries, states: states}}
      $('#content-container').html(newVacationTemplate(places))
    })
}
// bring user to their vacation content page.
const goToCountry = function (event) {
  event.preventDefault()
  const vacationId = $(this).find(':selected').data('id')
  vacationAPI.getOneVacation(vacationId)
    .then(vacation => {
      $('#map-view').hide()
      $('#world-map').html('')
      $('#us-map').html('')
      $('#section-alerts').html('')
      $('#content-container').html(contentTemplate(vacation))
    })
    .catch($('#section-alerts').html('<span class="warning">We encountered an error retrieving your trip details, please try again.</span>'))
}
const backToMap = function () {
  $('#content-container').html('')
  $('#section-alerts').html('')
  $('#us-map').html('')
  $('#world-map').html('')
  map.renderMap()
  $('#map-view').show()
}
// this controls what happens when a user clicks a section of the map:
const onSelectRegion = function (e) {
  const selectedRegion = e.target.dataset.code
  // get vacations to determine if users have been to that region
  vacationAPI.getAllVacations()
    .then((response) => {
      // if user selected USA, find out which states they've visited and render drill down map of states colored appropriately
      if (selectedRegion === 'United States') {
        const statesVisited = {}
        const vacations = response.vacations
        vacations.forEach(vacation => {
          if (vacation.state) {
            if (!statesVisited[vacation.state]) {
              statesVisited[vacation.state] = [vacation.year]
            } else {
              statesVisited[vacation.state].push(vacation.year)
            }
          }
        })
        $('#section-alerts').html('')
        map.showUS(statesVisited)
      } else {
        // if they pick a country that isn't USA find out if they've visited multiple times.
        const matching = []
        response.vacations.forEach((el) => {
          if (el.country === selectedRegion) {
            matching.push(el)
          } else if (el.state === selectedRegion) {
            matching.push(el)
          }
        })
        // if they've been to a region send them to vacation details on click
        if (matching.length >= 1) {
          vacationAPI.getOneVacation(matching[0].id)
            .then(vacation => {
              $('#map-view').hide()
              $('#section-alerts').html('')
              $('#content-container').html(contentTemplate(vacation))
            })
        }
        // if they've never been to the region send them to 'add vacation' page
        if (matching.length === 0) {
          $('#section-alerts').html('')
          goToNewVacation()
        }
      }
    })
}
const mapViewHandlers = function () {
  $(document).on('click', '#add-vacation', goToNewVacation)
  $('#map-nav').on('click', backToMap)
  $(document).on('submit', '#select-vacation', goToCountry)
  $(document).on('click', '.jvectormap-region', onSelectRegion)
  $(document).on('click', '#show-world', backToMap)
}

module.exports = {
  mapViewHandlers,
  goToNewVacation,
  backToMap
}
