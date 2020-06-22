let Onglet={
  media : ['Twitter','Facebook','LeTelegrame'],
  sport : ['Tennis','Basket','Foot'],
  proximite : ['Velille','Evenement'],
  economie : ['Cac40','Top10'],
  main : ['Meteo','Agenda'],
}

/* changement d'onglet via click*/

let onclickNavbar=function(elem){
  let li=elem.parentNode
  let nav =elem.parentNode.parentNode
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
// changement dans la navbar principal et affichage des contenus ( texte/module et sousnav) :
const tableauLiens = document.querySelectorAll(".navbar-list li a");        //On recupere tous les <a> dans les <li> dans une liste
//console.log(tableauLiens);

const tableauDivs = document.querySelectorAll(".tab-div");        //On recupere toutes les <div> qui contiennent les <p> à afficher dans une liste
//console.log(tableauDivs);
let zoneEltList = document.getElementsByClassName("zone")// récupartion d'une liste constituée de tous les élements "zone"

function ChooseDate(timeStamp) {
  let dayNameArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let monthDayArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  this.ts = timeStamp;
  this.date = new Date(timeStamp * 1000);
  this.dayNumber = this.date.getDate(); // number of the day
  this.monthName = monthDayArray[this.date.getMonth()];
  this.dayName = dayNameArray[this.date.getDay()];
  this.yearNumber = this.date.getFullYear();
}


function showWeather() {
  let todayDate = timeStampToDate(jsonResponse[0]["timeStamp"]);
  let todayTemp = jsonResponse[0]["temp"]["day"];
  let todayDes = jsonResponse[0]["temp"]["description"];
}


/*______________________REQUEST FUNCTIONS_____________________________*/

function getReq(pathApi, callback) {

  let xhr = new XMLHttpRequest()

  xhr.open("get", pathApi)
  xhr.send();


  xhr.onreadystatechange = (event) => {
    if (xhr.readyState == 4) {
      //console.log(xhr.response)
      let data = JSON.parse(xhr.response);
      callback(data);
      ///let date = new Date(jsonResponse[0]["timeStamp"]*1000) test date
      ///console.log(date);

    }
  }
}

function postReq(pathApi, obj) {

  let xhr = new XMLHttpRequest();

  xhr.open("POST", pathApi, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(obj));

  console.log("posted");
}


/*____________________________________________________________________*/


//recupération de la position de l'élement el
function getOffset(el) {
  let _x = 0;
  let _y = 0;
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
function letsScroll(element) {
  let top = element.scrollTop;
  let contentWindow=document.getElementsByClassName('affiche')
  console.log(contentWindow);
  let currentSection=contentWindow.classList[1]
  onsole.log(currentWindow);
  let listAttributs=Onglet[currentSection]
  let listPos=[]
  for(let i=0;i<listAttributs.length;i++){
    listPos=getOffset( document.getElementById(listAttributs[i]) ).top;
  }
  console.log(listPos);

  console.log(top);
}*/



//----------------------------------------------------//
//                 GEOLOCALISATION                    //
//----------------------------------------------------//


window.onload = function () {

  let startPos;

  let geoOptions = {
    enableHighAccuracy: true
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

};

document.getElementById("main").onclick = function (){

  getReq('/api/weeklyWeather', (result) => {
    console.log(result);
    getReq('/api/vLille', (result) => {
      console.log(result);
      getReq('/api/news', (result) => {
        console.log(result);
        getReq('/api/kraken', (result) => {
          console.log(result);
        });
      });
    });
  });

}

///////////// Onglet gestion /////////////

for (let liens of tableauLiens){                                  //On boucle dans la liste des <li>

  liens.addEventListener("click",function(event){                 //On regarde si on clique sur liens <a>
    event.preventDefault();
    
    let nomClasse = liens.parentNode.getAttribute("id");          //On recupere l'id du parent du <a> (soit le <li>) et on le stocke dans une letiable
    console.log(nomClasse);                                       //A savoir que l'id des <li> correpond a un nom de classe dans les <div>

    let divActive = document.getElementsByClassName(nomClasse)[0];  //On recupere donc la div en fonction de son nom de classe (qui est nomClasse)
    
    console.log(tableauDivs);
    console.log(divActive.classList)
    if(divActive.classList[2]=="non-affiche"){                     //On regarde déja si la <div> n'est pas déja affiche grâce à son 3e nom de classe (soit non-affiche soit affiche)

      console.log("Cette div n'est pas encore affichée");

      let ancienneDivAffiche = document.getElementsByClassName("affiche")[0]; //On recupere l'ancienne div qui est affichéelse

      ancienneDivAffiche.classList.remove("affiche");             //On lui eneleve sa classe affiche
      ancienneDivAffiche.classList.add("non-affiche");                   //On lui met une classe non-affiche

      divActive.classList.remove("non-affiche");                   //On enleve a la div sur laquelle on vient de cliquer sa classe non-affiche
      divActive.classList.add("affiche");                          //On lui met une classe affiche

      // gestion de la sous barre de navigation :
     
      let sousNavbar=document.querySelectorAll(".sousnavonglet")
      
      let ecritureOnglet=""
      let ecritureOngletComplet=""
      for(let i=0;i<Onglet[nomClasse].length;i++){
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



/*
document.onscroll = function(){
  let contentWindow=document.getElementsByClassName('affiche')
  console.log(contentWindow);
  let currentSection=contentWindow.classList[1]
  onsole.log(currentWindow);
  let listAttributs=Onglet[currentSection]
  let listPos=[]
  /*
  for(let i=0;i<listAttributs.length;i++){
    listPos=getOffset( document.getElementById(listAttributs[i]) ).top;
  }
  console.log(listPos);

}*/


/*
// changement d'onglet via scroll
let doc = document.documentElement;
document.onscroll = function(){

  //récupération des positions
  let PosTennis = getOffset( document.getElementById('tennis') ).top; 
  let PosBasket = getOffset( document.getElementById('basket') ).top; 
  let PosFoot = getOffset( document.getElementById('foot') ).top; 

  //récupération de la position de la barre de scroll
  let top = (window.pageYOffset||doc.scrollTop)  - (doc.clientTop || 0);

  //on établit quel onglet est actif en fonction de la position du scroll
  if (top<PosFoot&&top>PosBasket){
    let div = tabs[1].parentNode.parentNode.parentNode
    let li = tabs[1].parentNode
    if(li.classList.contains('selected')){
      return false
    }
    console.log(li.classList)
    div.querySelector('.tabs .active').classList.remove('active')
    li.classList.add('active')
    console.log(li.classList)
  
  }else if(top>PosBasket){
    let div = tabs[2].parentNode.parentNode.parentNode
    let li = tabs[2].parentNode
    if(li.classList.contains('active')){
      return false
    }
    console.log(li.classList)
    div.querySelector('.tabs .active').classList.remove('active')
    li.classList.add('active')
    console.log(li.classList)
  }else if(top<PosFoot){
    let div = tabs[0].parentNode.parentNode.parentNode
    let li = tabs[0].parentNode
    if(li.classList.contains('active')){
      return false
    }
    console.log(li.classList)
    div.querySelector('.tabs .active').classList.remove('active')
    li.classList.add('active')
    console.log(li.classList)
  }
  
};*/


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
