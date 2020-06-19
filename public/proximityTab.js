document.getElementById("proximite").onclick = function (){

  var proximityTab = document.querySelector(".proximite.tab-div");
  proximityTab.innerHTML = "";

  vlilleZone()
}


function vlilleZone(){

  let newZone = addNewzone(proximite,1)[0]
  newZone.classList.add("vlille")
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
  imageHeader.id="logoVlille"
  imageHeader.setAttribute("src","https://is5-ssl.mzstatic.com/image/thumb/Purple113/v4/61/00/23/610023da-56b3-531f-5d85-9a8e70d73789/source/256x256bb.jpg")
  imageHeader.setAttribute("alt","logo de V'lille")
  headerZone.appendChild(imageHeader)

  let titleHeader = document.createElement("h1")
  titleHeader.classList.add("headerZoneTitle")
  titleHeader.setAttribute("id", "vlilleTitle")
  titleHeader.textContent = "V'lille"
  headerZone.appendChild(titleHeader)

  let titleH2 = document.createElement("h2")
  titleH2.textContent = "Liste des stations V'Lilles les plus proches :"
  newZone.insertBefore(titleH2,childPreview)

  getReq("/api/vLille", (result) => {
    getReq("/api/coordinates", (coordinates) => {
      userLat = coordinates[0].lat
      userLon = coordinates[0].lon

      // computing the distance between user and stations
      for (const elt in result) {
          result[elt].dist = distance(userLat, userLon, result[elt].lat, result[elt].lon, 'K')
      }
      // sorting nearest stations
      result = result.sort(compare)

      tableMakerVlille(3,result,childPreview)
      tableMakerVlille(result.length,result,childFullview)

    })
  })

}


function tableMakerVlille(nbDisplay,result,parentNd){
  //WE BUILD THE TABLE IN THE APPROPRIATE PARENT NODE
  let tableDisplay = document.createElement("table")
  tableDisplay.classList.add("table-vlille")
  parentNd.appendChild(tableDisplay)

  //TABLE'S HEADER PART
  let theadElt = document.createElement("thead")
  tableDisplay.appendChild(theadElt)

  let trOfTheadElt = document.createElement("tr")
  theadElt.appendChild(trOfTheadElt)

  headerListTable = ["Station","Localisation","Ville","Nombre disponibles"]

  for (let elt of headerListTable){
    let thElt = document.createElement("th")
    thElt.textContent = elt
    trOfTheadElt.appendChild(thElt)
  }

  //TABLE'S CONTENT PART
  let tbodyElt = document.createElement("tbody")
  tableDisplay.appendChild(tbodyElt)

  for (let i=0; i<nbDisplay; i++){
    let trOfTbodyElt = document.createElement("tr")
    tbodyElt.appendChild(trOfTbodyElt)

    //DYNAMIC COLOR DISPLAY
    let vlilleNbr = Number(result[i].bikeAvaliable)
    if (vlilleNbr>10){
      trOfTbodyElt.style.backgroundColor = "#00b318"
    }
    else if (vlilleNbr>5){
      trOfTbodyElt.style.backgroundColor = "#89dc63"
    }
    else if (vlilleNbr>0){
      trOfTbodyElt.style.backgroundColor = "#f99a22"
    }
    else{
      trOfTbodyElt.style.backgroundColor = "#a30000"
    }
    /*--------------------*/

    let stationElt = document.createElement("td")
    stationElt.textContent = result[i].name
    trOfTbodyElt.appendChild(stationElt)

    let localisationElt = document.createElement("td")
    localisationElt.textContent = result[i].adress
    trOfTbodyElt.appendChild(localisationElt)

    let townElt = document.createElement("td")
    townElt.textContent = result[i].town
    trOfTbodyElt.appendChild(townElt)

    let numberElt = document.createElement("td")
    numberElt.textContent = result[i].bikeAvaliable
    trOfTbodyElt.appendChild(numberElt)
  }
}

//MAP LOGIC FUNCTIONS

function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    } else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") {
            dist = dist * 1.609344
        }
        if (unit == "N") {
            dist = dist * 0.8684
        }
        return dist;
    }
}

function compare(a, b) {

    const distA = a.dist;
    const distB = b.dist;

    let comparison = 0;

    if (distA > distB) {
        comparison = 1;
    } else if (distA < distB) {
        comparison = -1;
    }

    return comparison;
}
