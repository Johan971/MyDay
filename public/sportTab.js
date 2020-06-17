document.getElementById("sport").onclick = function (){

  var sportTab = document.querySelector(".sport.tab-div");
  sportTab.innerHTML = "";

  nbaZone()
}



function nbaZone(){
  let newZone = addNewzone(sport,1)[0]
  newZone.classList.add("nba")
  let childPreview = newZone.getElementsByClassName("preview")[0];
  let childFullview = newZone.getElementsByClassName("fullview")[0];

  /*
  MISE EN PLACE DU HEADERZONE ICI
  */

  //HEADERZONE PART
  let headerZone = document.createElement("div")
  headerZone.classList.add("header-zone")
  newZone.insertBefore(headerZone,childPreview)

  let imageHeader = document.createElement("img")
  imageHeader.id="logoNBA"
  imageHeader.setAttribute("src","https://cdn.bleacherreport.net/images/team_logos/328x328/nba.png")
  imageHeader.setAttribute("alt","logo de la nba")
  headerZone.appendChild(imageHeader)

  let titleHeader = document.createElement("h1")
  titleHeader.textContent = "Basketball"
  headerZone.appendChild(titleHeader)



  let titleH2 = document.createElement("h2")
  titleH2.textContent = "Classement des meilleurs joueurs de la NBA"
  newZone.insertBefore(titleH2,childPreview)

  getReq("/api/nba", (result)=> {

    tableMakerNba(3,result,childPreview)
    tableMakerNba(result.length,result,childFullview)

  })

}


//BUILT IN ORDER TO PURGE THE RESULT
function purgeChar(str){
    return str.replace('[', '').replace(']', '').replace('"', '').replace('"', '');
}


//GENERAL FUNCTION THAT ALLOWS TO CREATE A TABLE
function tableMakerNba(nbPlayers,result,parentNd){
  //WE BUILD THE TABLE IN THE APPROPRIATE PARENT NODE
  let tableRank = document.createElement("table")
  tableRank.classList.add("rank-nba")
  parentNd.appendChild(tableRank)

  //TABLE'S HEADER PART
  let theadElt = document.createElement("thead")
  tableRank.appendChild(theadElt)

  let trOfTheadElt = document.createElement("tr")
  theadElt.appendChild(trOfTheadElt)

  headerListTable = ["Numero","Nom du joueur","Equipe","Poste"]

  for (let elt of headerListTable){
    let thElt = document.createElement("th")
    thElt.textContent = elt
    trOfTheadElt.appendChild(thElt)
  }

  //TABLE'S CONTENT PART
  let tbodyElt = document.createElement("tbody")
  tableRank.appendChild(tbodyElt)

  for (let i=0; i<nbPlayers; i++){
    let trOfTbodyElt = document.createElement("tr")
    tbodyElt.appendChild(trOfTbodyElt)

    let playerRankElt = document.createElement("td")
    playerRankElt.textContent = i+1
    trOfTbodyElt.appendChild(playerRankElt)

    let playerNameElt = document.createElement("td")
    playerNameElt.textContent = purgeChar(result[i].playerName)
    trOfTbodyElt.appendChild(playerNameElt)

    let playerTeamElt = document.createElement("td")
    playerTeamElt.textContent = purgeChar(result[i].playerTeam)
    trOfTbodyElt.appendChild(playerTeamElt)

    let playerPositionElt = document.createElement("td")
    playerPositionElt.textContent = purgeChar(result[i].playerPosition)
    trOfTbodyElt.appendChild(playerPositionElt)
  }
}
