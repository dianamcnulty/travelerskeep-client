'use strict'
require('../../jvectormap/jquery-jvectormap-world-mill.js')
require('../../jvectormap/jquery-jvectormap-2.0.3.min.js')
require('jquery')
require('../../jvectormap/jquery-jvectormap-us-aea.js')
const vacationAPI = require('../API/vacation-api')

const renderMap = function () {
  const countriesVisited = {}
  vacationAPI.getAllVacations()
    .then(response => {
      // populate the vacation dropdown with the users vacations so they can choose from there if they want.
      $('#vacation-dropdown').html('')
      if (response.vacations.length > 0) {
        $('#choose-trip').show()
        response.vacations.forEach((vacation) => {
          $('#vacation-dropdown').prepend("<option data-id='" + vacation.id + "'>" + vacation.state + ' ' + vacation.country + ', ' + vacation.year + '</option>')
          if (!countriesVisited[vacation.country]) {
            countriesVisited[vacation.country] = [vacation.year]
          } else {
            countriesVisited[vacation.country].push(vacation.year)
          }
        })
      } else {
        // if they have no vacations, hide the dropdown
        $('#choose-trip').hide()
      }
      // hide the button that returns a user to 'world' if they're on the US map
      $('#show-world').hide()
      $('#world-map').show()
      $('#us-map').hide()
      $('#world-map').vectorMap({
        // these specifications are passed to the vectorMap JS and the map is render.
        map: 'world_mill',
        series: {
          regions: [{
            values: countriesVisited,
            scale: ['#8e6f4d', '#be6a2b'],
            attribute: 'fill',
            normalizeFunction: 'linear',
            min: 0,
            Max: 1
          }]
        },
        // this controls what a user sees when they hover over a map section
        onRegionTipShow: function (e, el, year) {
          if (!countriesVisited[year]) {
            el.html('Have you been to ' + el.html() + '? Click to add your memories to your collection.')
          } else if (countriesVisited[year].length === 1) {
            el.html('You were in ' + el.html() + ' in ' + countriesVisited[year].toString() + ' Click to see your trip')
          } else if (countriesVisited[year].length > 1) {
            el.html('You have been to ' + el.html() + ' several times! Click to see memories from your first trip here. To see other trips to ' + el.html() + ', select one from the dropdown below.')
          }
        }
      })
    })
}
// all the same as above but for USA
const showUS = function (statesVisited) {
  $('#world-map').hide()
  $('#us-map').html('')
  $('#us-map').show()
  $('#us-map').vectorMap({
    map: 'us_aea',
    series: {
      regions: [{
        values: statesVisited,
        scale: ['#8e6f4d', '#be6a2b'],
        attribute: 'fill',
        normalizeFunction: 'linear',
        min: 0,
        Max: 1
      }]
    },
    onRegionTipShow: function (e, el, code) {
      if (statesVisited[code] > 0) {
        el.html(el.html() + ': You were last here in ' + statesVisited[code])
      } else {
        el.html(el.html() + ' is calling to you!')
      }
    }
  })
  $('#show-world').show()
}
module.exports = {
  renderMap,
  showUS
}
