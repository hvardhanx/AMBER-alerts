var lost = {
  x: ['Delhi', 'Lucknow', 'Bangalore', 'Mumbai'],
  y: [20, 14, 23, 24],
  name: 'Lost',
  type: 'bar'
};

var found = {
  x: ['Delhi', 'Lucknow', 'Bangalore', 'Mumbai'],
  y: [12, 18, 29, 19],
  name: 'Found',
  type: 'bar'
};

var data = [lost, found];

var layout = {barmode: 'stack',title: 'Stats By Location'};

Plotly.newPlot('location', data, layout);