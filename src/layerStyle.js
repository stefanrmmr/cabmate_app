export const layerStyle = { 
    type: 'fill',
    paint: {
      'fill-color': {
        property: 'percentile',
        stops: [
          [0, 'rgba(245,141,18,0)'],
          [1, 'rgba(245,141,18,0.05)'],
          [2, 'rgba(245,141,18,0.1)'],
          [3, 'rgba(245,141,18,0.15)'],
          [4, 'rgba(245,141,18,0.2)'],
          [5, 'rgba(245,141,18,0.25)'],
          [6, 'rgba(245,141,18,0.3)'],
          [7, 'rgba(245,141,18,0.35)'],
          [8, 'rgba(245,141,18,0.4)'],
          [9, 'rgba(245,141,18,0.45)'],
          [10, 'rgba(245,141,18,0.5)']
        ]
      },
      'fill-outline-color': 'rgba(0,0,0,1)',
    }
  };
  export const selectedLayerStyle = { 
    type: 'line',
    paint: {
      'line-color': 'rgba(0,0,0,1)',
      'line-width': 3
    }
  };