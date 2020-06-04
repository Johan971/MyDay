
//PARTIE USELESS POUR LE FONCTIONNEMENT DU PROJET
//-------------------------------------------------
let age=24

//FIRST CLASS

class livre{

	constructor(titre, page, auteur){


		this.titre=titre
		this.page=page
		this.auteur=auteur

		}

}

let lartDeLaGuerre=new livre("L'Art De La Guerre",322,"Sun Tzu")


let tableau=["willy",12,lartDeLaGuerre]


/*______________________FUNCTIONS_____________________________*/

function getReq(pathApi, callback){

    var xhr = new XMLHttpRequest()

    xhr.open("get",pathApi)
    xhr.send();
    
    
    xhr.onreadystatechange=(event)=>{
        if (xhr.readyState==4){
            console.log(xhr.response)
            var data = JSON.parse(xhr.response);
						callback(data);
						///var date = new Date(jsonResponse[0]["timeStamp"]*1000) test date
						///console.log(date);

        }
    }
}


function postReq(pathApi, obj){

    var xhr=new XMLHttpRequest();

    xhr.open("POST",pathApi, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(obj));

    console.log("posted");
}


function ChooseDate(timeStamp) {
	let dayNameArray = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
	let monthDayArray = ["January","February","March","April","May","June","July","August","September","October","November","December"]

  this.ts =  timeStamp;
	this.date = new Date(timeStamp*1000);
  this.dayNumber = this.date.getDate();		// number of the day
	this.monthName = monthDayArray[this.date.getMonth()];
	this.dayName = dayNameArray[this.date.getDay()];
	this.yearNumber = this.date.getFullYear();
}


function showWeather(){
	var todayDate = timeStampToDate(jsonResponse[0]["timeStamp"]);
	var todayTemp = jsonResponse[0]["temp"]["day"];
	var todayDes = jsonResponse[0]["temp"]["description"];
}

//----------------------------------------------------------------


  //----------------------------------------------------//
 //                 GEOLOCALISATION                    //
//----------------------------------------------------//


window.onload = function() {

  var startPos;

  var geoOptions = {
    enableHighAccuracy: true
  }

  var geoSuccess = function(position) {

    // Do magic with location
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;

    let coord = {lat:  startPos.coords.latitude, lon: startPos.coords.longitude};
    postReq("/api/coordinates", coord);
  };

  var geoError = function(error) {
  	console.log(error);
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);

};

//___________________________________________________________________________________
//__________________________________________________________________________________________


var myAnchor= document.getElementById("Bouton")

myAnchor.addEventListener("click",(event)=>{

  /*
  getReq('/api/weeklyWeather', (result) => {
    console.log(result);
    getReq('/api/vLille', (result) => {
      console.log(result);


			var today = new ChooseDate(1591277045)  // test avec un timestamp fixe
			console.log(today)

    });
  });
  */
  getReq('/api/news')



});
