
//----------------------------------------------------//
//                 GEOLOCATION                        //
//----------------------------------------------------//
window.onload = function () {

  // Connect to the database

  let startPos;

  let geoOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0 
  }

  let geoSuccess = function (position) {

    // Do magic with location
    startPos = position;

    let coord = {
      lat: startPos.coords.latitude,
      lon: startPos.coords.longitude
    };

    postReq("/api/coordinates", coord);
  };

  let geoError = function (error) {
    console.log(error);
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);

  showWeather()

};

startBar();
startZone();

setInterval(clockAnimation, 40);
