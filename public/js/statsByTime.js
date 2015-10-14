var data = [
          {
            x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
            y: [1, 3, 6],
            name: 'Found',
            fill: 'tonexty',
            type: 'scatter'
          },
          {
            x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
            y: [8, 10, 6],
            name: 'Lost',
            fill: 'tonexty',
            type: 'scatter'
          }
        ];
       
var layout = {title: 'Stats By Time'}
Plotly.newPlot('time', data, layout);