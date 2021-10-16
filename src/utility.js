
export function updatePercentiles(featureCollection, data, viewport) {
    const {features} = featureCollection;
    return {
      type: 'FeatureCollection',
      features: features.map(f => {
        const value =  Math.random() * 100; // data.exampleData[0].demand;
        const distance = getDistanceFromLatLonInKm(f.geometry.coordinates[0][0][0][1],f.geometry.coordinates[0][0][0][0],viewport.latitude,viewport.longitude);
        const properties = {
          ...f.properties,
          value,
          percentile: Math.round(value/10),
          distance,
          score: value/distance.map(0, 40, 1, 2),
        };
        return {...f, properties};
      })
    };
  }
  
  export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
  
  Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }