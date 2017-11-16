'use strict'
require('../jvectormap/jquery-jvectormap-world-mill.js')
require('../jvectormap/jquery-jvectormap-2.0.3.min.js')
require('jquery')

const map = function () {
  const visited = {
    'JP': 1972,
    'BO': 2006,
    'DZ': 2015
  }
  $('#world-map').vectorMap({
    map: 'world_mill',
    series: {
      regions: [{
        values: visited,
        scale: ['#C8EEFF', '#0071A4'],
        attribute: 'fill',
        normalizeFunction: 'linear',
        min: 0,
        Max: 1
      }]
    },
    onRegionTipShow: function (e, el, code) {
      if (visited[code] > 0) {
        el.html(el.html() + ': You were last here in ' + visited[code])
      } else {
        el.html(el.html() + ': This place is calling you!')
      }
    }
  })
}

module.exports = map
