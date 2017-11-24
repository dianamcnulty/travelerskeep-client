'use strict'
require('../../jvectormap/jquery-jvectormap-world-mill.js')
require('../../jvectormap/jquery-jvectormap-2.0.3.min.js')
require('jquery')
const vacationAPI = require('../API/vacation-api')

const renderMap = function () {
  const countriesVisited = {}
  vacationAPI.getAllVacations()
    .then(response => {
      console.log('response is', response)
      response.vacations.forEach((vacation) => {
        console.log('each vacation', vacation)
        countriesVisited[vacation.country] = vacation.year
      })
      $('#show-world').hide()
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
          if (countriesVisited[year] > 0) {
            el.html('You were last in ' + el.html() + ' in ' + countriesVisited[year])
          } else {
            el.html(el.html() + ' is calling to you!')
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
// const showUS = function () {
//   $('#us-map').vectorMap({
//     map: 'us_aea',
//     series: {
//       regions: [{
//         values: statesVisited,
//         scale: ['#8e6f4d', '#be6a2b'],
//         attribute: 'fill',
//         normalizeFunction: 'linear',
//         min: 0,
//         Max: 1
//         }]
//       },
//     onRegionTipShow: function(e, el, code){
//       if (statesVisited[code] > 0){
//         el.html(el.html()+': You were last here in ' + statesVisited[code]);
//       } else {
//         el.html(el.html()+' is calling to you!');
//       }
//     }
//   })
//   $('#show-world').show()
//   $('#world-map').hide()
// }
module.exports = {renderMap}
