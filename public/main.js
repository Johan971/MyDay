
///----------------------------------------------------//
//                 GEOLOCALISATION                    //
//----------------------------------------------------//
window.onload = function () {

  var startPos;

  var geoOptions = {
    enableHighAccuracy: true

  }

  var geoSuccess = function (position) {

    // Do magic with location
    startPos = position;

    let coord = {
      lat: startPos.coords.latitude,
      lon: startPos.coords.longitude
    };

    postReq("/api/coordinates", coord);
  };

  var geoError = function (error) {
    console.log(error);
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);

};

document.getElementById("main").onclick = function (){

  getReq('/api/weeklyWeather', (result) => {
    console.log(result);
    getReq('/api/vLille', (result) => {
      console.log(result);
      getReq('/api/nba', (result) => {
        console.log(result);
        getReq('/api/kraken', (result) => {
          console.log(result);

        });
      });
    });
  });

}



startBar()
startZone()
