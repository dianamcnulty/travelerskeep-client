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
      $('#vacation-dropdown').html('')
      response.vacations.forEach((vacation) => {
        $('#vacation-dropdown').prepend("<option data-id='" + vacation.id + "'>" + vacation.country + ', ' + vacation.year + '</option>')
        if (!countriesVisited[vacation.country]) {
          countriesVisited[vacation.country] = [vacation.year]
        } else {
          countriesVisited[vacation.country].push(vacation.year)
        }
      })
      console.log('countriesVisited is', countriesVisited)
      $('#show-world').hide()
      $('#world-map').show()
      $('#us-map').hide()
      $('#world-map').vectorMap({
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
        onRegionTipShow: function (e, el, year) {
          if (!countriesVisited[year]) {
            el.html('Have you been to ' + el.html() + '? Click to add your memories to your collection.')
          } else if (countriesVisited[year].length === 1) {
            el.html('You were in ' + el.html() + ' in ' + countriesVisited[year].toString() + ' Click to see your trip')
            // console.log('visited is', e.target.dataset.visited)
          } else if (countriesVisited[year].length > 1) {
            el.html('You have been to ' + el.html() + ' several times! To see trips to ' + el.html() + ' select a specific trip from the dropdown below.')
          }
        }
      })
    })
}
// $(() => {
//   $('.jvectormap-region').on('click', (e) => {
//     console.log('country code is', e.target.dataset.code)
//     if (e.target.dataset.code === 'US'){
//       showUS()
//     }
//   })
// })
// $(() => {
//   $('#show-world').on('click',()=>{
//     $('#world-map').show()
//     $('#show-world').hide()
//     $('#us-map').html('')
//   })
// })
const showUS = function (statesVisited) {
  console.log('showing US. states are:', statesVisited)
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
