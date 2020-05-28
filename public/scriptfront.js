





//PARTIE USELESS POUR LE FONCTIONNEMENT DU PROJET
//-------------------------------------------------
let age=24

const nom= prompt("Entrez votre prenom:")
console.log(`Tu es ${nom} et tu as ${age} ans`)
console.log("lol")


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
//----------------------------------------------------------------




var myAnchor= document.getElementById("Bouton")

myAnchor.addEventListener("click",(event)=>{
	//1:ajouter donnnée avec console log
	//2: modifier le html 
	//event.preventDefault()
	var xhr=new XMLHttpRequest()
	xhr.open("get",'/api/dailyWeather')
	
	xhr.send()
	
	console.log("rr",xhr.responseText)


	xhr.onreadystatechange=(event)=>{
		if (xhr.readyState==4){
			//mettre dans la page
			console.log(xhr.response)

		}
	}

	/*
	if (xhr.responseText==undefined) {
		console.log("ok")
	}
	else if (xhr.responseText==""){
		console.log("vide")
	}
	*/
})