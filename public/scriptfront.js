
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
console.log(tableau.length)


/*______________________FUNCTIONS_____________________________*/

function getReq(pathApi){

    var xhr = new XMLHttpRequest()

    xhr.open("get",pathApi)
    xhr.send();

    xhr.onreadystatechange=(event)=>{
        if (xhr.readyState==4){
            //mettre dans la page
						var data = xhr.responseText;
						var jsonResponse = JSON.parse(data);
						return jsonResponse;
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
}


function timeStampToDate(timeStamp){
	var date = new Date(timeStamp*1000)
	return Date
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

	//2: modifier le html
	//event.preventDefault()

	getReq('/api/vLille')

	//OUTIL DEBUG
	/*
	if (xhr.responseText==undefined) {
		console.log("ok")
	}
	else if (xhr.responseText==""){
		console.log("vide")
	}
	*/
})
