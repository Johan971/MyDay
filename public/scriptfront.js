
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


/*______________________FONCTIONS_____________________________*/

function getConsole(pathApi){
    var xhr=new XMLHttpRequest()
    xhr.open("get",pathApi)

    xhr.send()

    xhr.onreadystatechange=(event)=>{
        if (xhr.readyState==4){
            //mettre dans la page
            console.log(xhr.response)

        }
    }
}


//----------------------------------------------------------------


  //----------------------------------------------------//
 //                 GEOLOCALISATION                    //
//----------------------------------------------------//


window.onload = function() {

  var startPos;

  var geoSuccess = function(position) {

    // Do magic with location
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };

  var geoError = function(error) {
  	console.log(error);
  };

  var geoOptions = {
     timeout: 10 * 1000
  }

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);

};
//________________________________________________________________________________________
//__________________________________________________________________________________________


var myAnchor= document.getElementById("Bouton")

myAnchor.addEventListener("click",(event)=>{
	
	//2: modifier le html 
	//event.preventDefault()

	getConsole('/api/dailyWeather')

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

