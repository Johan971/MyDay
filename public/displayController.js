
var Onglet={
  media : ['Twitter','Facebook','LeTelegrame'],
  sport : ['Tennis','Basket','Foot'],
  proximite : ['Velille','Evenement'],
  economie : ['Cac40','Top10'],
  main : ['Meteo','Agenda'],
}
// changement dans la navbar principal et affichage des contenus ( texte/module et sousnav) :
const tableauLiens = document.querySelectorAll(".navbar-list li a");        //On recupere tous les <a> dans les <li> dans une liste
//console.log(tableauLiens);

const tableauDivs = document.querySelectorAll(".tab-div");        //On recupere toutes les <div> qui contiennent les <p> à afficher dans une liste
//console.log(tableauDivs);
let zoneEltList = document.getElementsByClassName("zone")// récupartion d'une liste constituée de tous les élements "zone"




/* changement d'onglet via click*/

var onclickNavbar=function(elem){
  let li=elem.parentNode
  var nav =elem.parentNode.parentNode
  if(li.classList.contains("no-selected")){
    let ancienneliAffiche = document.getElementsByClassName("selected")[0]
    li.classList.remove("no-selected");
    li.classList.add("selected");
    ancienneliAffiche.classList.remove("selected");             //On lui eneleve sa classe affiche
    ancienneliAffiche.classList.add("no-selected");
    console.log('c est affiché')
  }else{
    console.log('deja affiché')
  }

}

//recupération de la position de l'élement el
function getOffset(el) {
  var _x = 0;
  var _y = 0;
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - el.scrollLeft;
    _y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return {
    top: _y,
    left: _x
  };
}

///////// Scroll Listener /////////
/*
function splitString(stringToSplit, separator) {
  var arrayOfStrings = stringToSplit.split(separator);

  console.log('La chaine d\'origine est : "' + stringToSplit + '"');
  console.log('Le délimiteur est : "' + separator + '"');
  console.log("Le tableau comporte " + arrayOfStrings.length + " elements : ");

  for (var i=0; i < arrayOfStrings.length; i++)
    print(arrayOfStrings[i] + " / ");
}
var point=".";
var contentWindow=document.getElementsByClassName('affiche')
splitString(contentWindow[0],point)*/
/*
function letsScroll(element) {
  var top = element.scrollTop;
  var contentWindow=document.getElementsByClassName('affiche')
  console.log("l element courant est :");
  console.log(contentWindow);

  var currentSection=contentWindow[0].split(".");
  console.log("le nom de la section affiche est :");
  console.log(currentSection);
  //var listAttributs=Onglet[currentSection[2]]
  //var listPos=[]
  for(var i=0;i<listAttributs.length;i++){
    listPos=getOffset( document.getElementById(listAttributs[i]) ).top;
  }
  console.log(listPos);

  console.log(top);
}*/


/*
document.onscroll = function(){
  var contentWindow=document.getElementsByClassName('affiche')
  console.log(contentWindow);
  var currentSection=contentWindow.classList[1]
  onsole.log(currentWindow);
  var listAttributs=Onglet[currentSection]
  var listPos=[]
  /*
  for(var i=0;i<listAttributs.length;i++){
    listPos=getOffset( document.getElementById(listAttributs[i]) ).top;
  }
  console.log(listPos);

}*/


/*
// changement d'onglet via scroll
var doc = document.documentElement;
document.onscroll = function(){

  //récupération des positions
  var PosTennis = getOffset( document.getElementById('tennis') ).top; 
  var PosBasket = getOffset( document.getElementById('basket') ).top; 
  var PosFoot = getOffset( document.getElementById('foot') ).top; 

  //récupération de la position de la barre de scroll
  var top = (window.pageYOffset||doc.scrollTop)  - (doc.clientTop || 0);

  //on établit quel onglet est actif en fonction de la position du scroll
  if (top<PosFoot&&top>PosBasket){
    var div = tabs[1].parentNode.parentNode.parentNode
    var li = tabs[1].parentNode
    if(li.classList.contains('selected')){
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
  
};*/

///////////// Onglet gestion /////////////

function navbarController(){
  for (let liens of tableauLiens){                                  //On boucle dans la liste des <li>

    liens.addEventListener("click",function(event){                 //On regarde si on clique sur liens <a>
      event.preventDefault();
      
      let nomClasse = liens.parentNode.getAttribute("id");          //On recupere l'id du parent du <a> (soit le <li>) et on le stocke dans une variable                                     //A savoir que l'id des <li> correpond a un nom de classe dans les <div>

      let divActive = document.getElementsByClassName(nomClasse)[0];  //On recupere donc la div en fonction de son nom de classe (qui est nomClasse)
      
      if(divActive.classList[2]=="non-affiche"){                     //On regarde déja si la <div> n'est pas déja affiche grâce à son 3e nom de classe (soit non-affiche soit affiche)

        console.log("Cette div n'est pas encore affichée");

        let ancienneDivAffiche = document.getElementsByClassName("affiche")[0]; //On recupere l'ancienne div qui est affichéelse

        ancienneDivAffiche.classList.remove("affiche");             //On lui eneleve sa classe affiche
        ancienneDivAffiche.classList.add("non-affiche");                   //On lui met une classe non-affiche

        divActive.classList.remove("non-affiche");                   //On enleve a la div sur laquelle on vient de cliquer sa classe non-affiche
        divActive.classList.add("affiche");                          //On lui met une classe affiche

        // gestion de la sous barre de navigation :
       
        let sousNavbar=document.querySelectorAll(".sousnavonglet")
        
        var ecritureOnglet=""
        var ecritureOngletComplet=""
        for(var i=0;i<Onglet[nomClasse].length;i++){
          if(i==0){
            ecritureOnglet="<li  class=\"selected\"><a onclick='onclickNavbar(this)'' class='sousnavlink' href=\'#"+Onglet[nomClasse][i]+"\'</a>"+Onglet[nomClasse][i]+"</li>"
          }else{
            ecritureOnglet="<li class=\"no-selected\"><a onclick='onclickNavbar(this)' class='sousnavlink' href=\'#"+Onglet[nomClasse][i]+"\'</a>"+Onglet[nomClasse][i]+"</li>"
          }
         ecritureOngletComplet=ecritureOngletComplet+ecritureOnglet
        }

        sousNavbar[0].innerHTML=ecritureOngletComplet
      }
      else{
        console.log("La div est déja affichée");

      }

    })

  }

  ////////AGRANDISSEMENT DES BLOCS///////////////

  for (let zoneElt of zoneEltList){
    zoneElt.onclick = function(){
      let childFullview = this.getElementsByClassName(this.id+" fullview")[0]
      if (this.classList.contains("large")===false){
        this.classList.add("large")
        let self=this
        setTimeout(function(){self.scrollIntoView({block:"start"})},500)
        childFullview.style.display = "block"
      }
      else{
        this.classList.remove("large")
        childFullview.style.display ="none"
      }
    }
  }
}
