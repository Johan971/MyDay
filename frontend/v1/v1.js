//PARTIE ONGLETS
const tableauLiens = document.querySelectorAll(".navbar-list li a");        //On recupere tous les <a> dans les <li> dans une liste
console.log(tableauLiens);

const tableauDivs = document.querySelectorAll(".tab-div");        //On recupere toutes les <div> qui contiennent les <p> à afficher dans une liste
console.log(tableauDivs);


for (let liens of tableauLiens){                                  //On boucle dans la liste des <li>

    liens.addEventListener("click",function(event){                 //On regarde si on clique sur liens <a>
    event.preventDefault();
    let nomClasse = liens.parentNode.getAttribute("id");          //On recupere l'id du parent du <a> (soit le <li>) et on le stocke dans une variable
    console.log(nomClasse);                                       //A savoir que l'id des <li> correpond a un nom de classe dans les <div>

    let divActive = document.getElementsByClassName(nomClasse)[0];  //On recupere donc la div en fonction de son nom de classe (qui est nomClasse)
    console.log(divActive);

    if(divActive.classList[2]=="non-affiche"){                     //On regarde déja si la <div> n'est pas déja affiche grâce à son 3e nom de classe (soit non-affiche soit affiche)

      console.log("Cette div n'est pas encore affichée");

      let ancienneDivAffiche = document.getElementsByClassName("affiche")[0]; //On recupere l'ancienne div qui est affichéelse

      ancienneDivAffiche.classList.remove("affiche");              //On lui eneleve sa classe affiche
      ancienneDivAffiche.classList.add("non-affiche");             //On lui met une classe non-affiche

      divActive.classList.remove("non-affiche");                   //On enleve a la div sur laquelle on vient de cliquer sa classe non-affiche
      divActive.classList.add("affiche");                         //On lui met une classe affiche
    }
    else{
      console.log("La div est déja affichée");
    }

  })

}

//PARTIE NAVBAR GAUCHE

/* changement d'onglet via click*/
var tabs=document.querySelectorAll(".tabs a")
console.log(tabs)
for(var i=0;i<tabs.length;i++){
	console.log('yes2')
	tabs[i].addEventListener('click',function(e){

		var div=this.parentNode.parentNode.parentNode
		var li = this.parentNode

		if(li.classList.contains('active')){
			return false
		}
		console.log(li.classList)
		div.querySelector('.tabs .active').classList.remove('active')
		li.classList.add('active')
		console.log(li.classList)
	})
}

/*recupération de la position de l'élement el*/
function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

/* changement d'onglet via scroll*/
var doc = document.documentElement;
document.onscroll = function(){
	/*récupération des positions*/
	var PosTennis = getOffset( document.getElementById('tennis') ).top;
	var PosBasket = getOffset( document.getElementById('basket') ).top;
	var PosFoot = getOffset( document.getElementById('foot') ).top;
	/*récupération de la position de la barre de scroll*/
	var top = (window.pageYOffset||doc.scrollTop)  - (doc.clientTop || 0);
	/*on établit quel onglet est actif en fonction de la position du scroll*/
	if (top<PosFoot&&top>PosBasket){
		var div = tabs[1].parentNode.parentNode.parentNode
		var li = tabs[1].parentNode
		if(li.classList.contains('active')){
			return false
		}
		console.log(li.classList)
		div.querySelector('.tabs .active').classList.remove('active')
		li.classList.add('active')
		console.log(li.classList)

	}else if(top>PosBasket){
		var div = tabs[2].parentNode.parentNode.parentNode
		var li = tabs[2].parentNode
		if(li.classList.contains('active')){
			return false
		}
		console.log(li.classList)
		div.querySelector('.tabs .active').classList.remove('active')
		li.classList.add('active')
		console.log(li.classList)
	}else if(top<PosFoot){
		var div = tabs[0].parentNode.parentNode.parentNode
		var li = tabs[0].parentNode
		if(li.classList.contains('active')){
			return false
		}
		console.log(li.classList)
		div.querySelector('.tabs .active').classList.remove('active')
		li.classList.add('active')
		console.log(li.classList)
	}
};


//FONCTION DE REQUETE
let requestGET = function(url){
  let request = new XMLHttpRequest();
  request.open("GET",url)
  request.onreadystatechange = function(){
    if (this.readyState==4 && this.status>=200 && this.status<400){
      let response = JSON.parse(this.responseText);
      console.log(response);
    }
  }
  request.send();
}
