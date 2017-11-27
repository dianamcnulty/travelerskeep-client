'use strict'
const newVacationTemplate = require('../templates/addVacation.handlebars')
const countryAPI = require('../API/country-api')
const map = require('./map')
const vacationAPI = require('../API/vacation-api')
const contentTemplate = require('../templates/content.handlebars')

const goToNewVacation = function () {
  const states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY']
  countryAPI.getAllCountries()
    .then((countries) => {
      $('#map-view').hide()
      const places = {places: {nations: countries, states: states}}
      $('#content-container').html(newVacationTemplate(places))
    })
}
const goToCountry = function (event) {
  event.preventDefault()
  const vacationId = $(this).find(':selected').data('id')
  console.log('clicked go button. vacation id is', vacationId)
  vacationAPI.getOneVacation(vacationId)
    .then(vacation => {
      console.log('vacation is', vacation)
      $('#map-view').hide()
      $('#content-container').html(contentTemplate(vacation))
    })
}
const backToMap = function () {
  console.log('cancel button clicked')
  $('#content-container').html('')
  $('#world-map').html('')
  map.renderMap()
  $('#map-view').show()
}
const onSelectRegion = function (e) {
  const selectedRegion = e.target.dataset.code
  vacationAPI.getAllVacations()
    .then((response) => {
      console.log(response)
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
        console.log('statesVisited is', statesVisited)
        map.showUS(statesVisited)
      } else {
        const matching = []
        response.vacations.forEach((el) => {
          if (el.country === selectedRegion) {
            matching.push(el)
          } else if (el.state === selectedRegion) {
            matching.push(el)
          }
        })
        if (matching.length >= 1) {
          console.log('matching is 1', matching)
          vacationAPI.getOneVacation(matching[0].id)
            .then(vacation => {
              console.log('vacation is', vacation)
              $('#map-view').hide()
              $('#content-container').html(contentTemplate(vacation))
            })
        }
        if (matching.length === 0) {
          goToNewVacation()
        }
        console.log('matching trips are', matching)
      }
    })
}
const mapViewHandlers = function () {
  $(document).on('click', '#add-vacation', goToNewVacation)
  $('#map-nav').on('click', backToMap)
  $(document).on('submit', '#select-country', goToCountry)
  $(document).on('click', '.jvectormap-region', onSelectRegion)
}

module.exports = {
  mapViewHandlers,
  backToMap
}
