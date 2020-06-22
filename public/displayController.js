
let Onglet={
  media : [['twitter','<i class="fab fa-twitter-square fa-3x"></i>'],['news','<i class="far fa-newspaper fa-3x"></i>']],
  sport : [['basket','<i class="fas fa-basketball-ball fa-3x"></i>'],['foot','<i class="fas fa-football-ball fa-3x"></i>'],['volley','<i class="fas fa-volleyball-ball fa-3x"></i>']],
  proximite : [['Vlille','<i class="fas fa-bicycle fa-3x"></i>'],['Musique','<i class="fas fa-music fa-3x"></i>']],
  economie : [['Cryptos','<i class="fas fa-chart-line fa-3x"></i>'],['Portefeuille','<i class="fas fa-wallet fa-3x"></i>']],
  main : [['horloge','<i class="far fa-clock fa-3x"></i>'],['meteo','<i class="fas fa-cloud-sun fa-3x"></i>']],
}
// changement dans la navbar principal et affichage des contenus ( texte/module et sousnav) :
const tableauLiens = document.querySelectorAll(".navbar-list li a");        //On recupere tous les <a> dans les <li> dans une liste

const tableauDivs = document.querySelectorAll(".tab-div");        //On recupere toutes les <div> qui contiennent les <p> à afficher dans une liste

let zoneEltList = document.getElementsByClassName("zone")// récupartion d'une liste constituée de tous les élements "zone"




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
  }

}

//Retrieving 'el' position
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

///////////// Tab Handling /////////////
function startBar(){

  //Changes in principal navbar and content displaying :
  const tableauLiens = document.querySelectorAll("#tabbar-list li a");        //All <a> and <li> retrieving in a list

  const tableauDivs = document.querySelectorAll(".tab-div");        //All <div> containing <p> retrieving in a liste

  for (let liens of tableauLiens){                                  //<li> list loop

    liens.addEventListener("click",function(event){                 //Listening to <a> click event
      event.preventDefault();

      let nomClasse = liens.parentNode.getAttribute("id");          //Retrieving <a> parent ID and storing in a table
                                         //<li> IDs are class names in <div> tags

      let divActive = document.getElementsByClassName(nomClasse)[0];  //div retrieving by its class name


      if(divActive.classList[2]==="non-affiche"){                     //Check if the div is not already displayed due to its 3rd class name


        let ancienneDivAffiche = document.getElementsByClassName("affiche")[0]; //Former displayed div retrieving

        ancienneDivAffiche.classList.remove("affiche");             //Removing 'displayed' class
        ancienneDivAffiche.classList.add("non-affiche");                   //Adding 'not-displayed' class

        divActive.classList.remove("non-affiche");                   //Removing 'not-displayed' class from the div the user just clicked on
        divActive.classList.add("affiche");                          //Adding it 'displayed' class

        //Sub navbar handling
        let sidebarElt=document.getElementById("sidebar-list")

        let ecritureOnglet=""
        let ecritureOngletComplet=""
        for(let i=0;i<Onglet[nomClasse].length;i++){
        let classSelectValue=""
          if(i==0){
            classSelectValue="'selected'"
          }
          else{
            classSelectValue="'no-selected'"
          }

          ecritureOnglet="<li class="+classSelectValue+"><a onclick='onclickNavbar(this)' class='sousnavlink' href=\'#"+Onglet[nomClasse][i][0]+"\'</a>"+Onglet[nomClasse][i][1]+"</li>"
          ecritureOngletComplet+=ecritureOnglet
        }
        sidebarElt.innerHTML=ecritureOngletComplet
      }
      else{
        console.log("La div est déja affichée");
      }
    })
  }
}

////////BLOCKS EXPANSION///////////////
function startZone(){
  let zoneEltList = document.getElementsByClassName("zone")//All 'zone' elements retrieving
  for (let zoneElt of zoneEltList){
    zoneElt.onclick = function(){
      let childFullview = this.getElementsByClassName(this.id+" fullview")[0]
      let childPreview = this.getElementsByClassName(this.id+" preview")[0]
      if (this.classList.contains("large")===false){
        this.classList.add("large")
        let self=this
        setTimeout(function(){self.scrollIntoView({block:"start"})},500)
        childFullview.style.display = "flex"
        childPreview.style.display = "none"
      }
      else{
        this.classList.remove("large")
        childFullview.style.display ="none"
        childPreview.style.display = "flex"
      }
    }
  }
}


////////////////////////// ADDING X ZONES//////////////////////////////////

function addNewzone(currentTab,numZone,addClass=""){//WARNING : need to be launched before startZone() and startBar() even if included in another function

  let className=currentTab.getAttribute("id");
  let selecZone=".zone."+className

  let allZone= document.querySelectorAll(selecZone)

  let tabElement=[]

  for (let i=0;i<numZone;i++){
    let zoneNumber=allZone.length+i+1;
    let focusTab=document.querySelector("."+className)

    let myDivzone=document.createElement("div");
    myDivzone.setAttribute("class", "zone " +className+" "+addClass);
    myDivzone.setAttribute("id","zone"+zoneNumber);

    focusTab.appendChild(myDivzone)


    let myDivPreview=document.createElement("div");
    myDivPreview.setAttribute("class", "zone"+zoneNumber+" preview");
    myDivPreview.setAttribute("style","display:flex");
    myDivzone.appendChild(myDivPreview)

    let myDivFullview=document.createElement("div");
    myDivFullview.setAttribute("class", "zone"+zoneNumber+" fullview");
    myDivFullview.setAttribute("style","display:none");
    myDivzone.appendChild(myDivFullview)

    tabElement.push(myDivzone)
    }
    startZone()

    return(tabElement)
}
