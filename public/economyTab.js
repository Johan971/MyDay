document.getElementById("economie").onclick = function (){

  var ongletEco = document.querySelector(".economie.tab-div");
  ongletEco.innerHTML = "";

  getReq('/api/kraken', (result) => {



    cryptoZone("BTC", result);
    cryptoZone("ETH", result);
    cryptoZone("XRP", result);
    cryptoZone("LTC", result);
    indicatorsZone(result);

    console.log(getIndicator(result, Date.now()/1000 - 3600*24*3));
    console.log(getIndicator(result, Date.now()/1000 - 3600*24*90));

  });

}




function cryptoZone(currency, result){

  let date3D = [];
  let price3D = [];
  let date1W = [];
  let price1W = [];
  let date1M = [];
  let price1M = [];
  let date3M = [];
  let price3M = [];


  var ongletEco = document.querySelector(".economie.tab-div")

  let newZone = addNewzone(economie,1)[0]
  newZone.classList.add("crypto")
  let childPreview = newZone.getElementsByClassName("preview")[0]
  let childFullview = newZone.getElementsByClassName("fullview")[0]






  var infoCurrency = {
    BTC: {
      name: "Bitcoin",
      image: "https://tokensinvaders.com/wp-content/uploads/2018/11/Bitcoin-cest-quoi.png"
    },
    ETH: {
      name: "Ethereum",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/628px-Ethereum_logo_2014.svg.png"
    },
    XRP: {
      name: "Ripple",
      image: "https://www.xrp.co/wp-content/uploads/2018/07/xrplogo.png"
    },
    LTC: {
      name: "LiteCoin",
      image: "https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/litecion_ltc_lite_coin_crypto-512.png"
    }
  }

  //HEADERZONE PART
  let headerZone = document.createElement("div")
  headerZone.classList.add("header-zone")
  newZone.insertBefore(headerZone,childPreview)

  let imageHeader = document.createElement("img")
  imageHeader.classList.add("logoCrypto")
  imageHeader.setAttribute("src",infoCurrency[currency].image)
  imageHeader.setAttribute("alt",`logo de ${infoCurrency[currency].name}`)
  headerZone.appendChild(imageHeader)

  let titleHeader = document.createElement("h1")
  titleHeader.textContent = infoCurrency[currency].name
  headerZone.appendChild(titleHeader)


  //Définition de la couleur (verte || rouge) en fonction des variations du cours de la monnaie
  let variationColor
  if (result[result.length-1]["price"+currency]>result[result.length-19]["price"+currency]){
    variationColor = (opacityColor) => "rgba(39, 174, 96,"+opacityColor+")"
  }
  else{
    variationColor = (opacityColor) => "rgba(235, 59, 90,"+opacityColor+")"
  }

  let statsCryptElt = document.createElement("div")
  statsCryptElt.classList.add("stats-crypto")
  newZone.insertBefore(statsCryptElt,childPreview)

  let lastPricePreview = document.createElement("h2")
  lastPricePreview.textContent = result[result.length-1]["price"+currency]+" €"
  /*lastPricePreview.style.color = variationColor("1.0")*/
  statsCryptElt.appendChild(lastPricePreview)

  let percentagePreview = document.createElement("h3")
  percentagePreview.textContent = variationsPercentage(result[result.length-19]["price"+currency],result[result.length-1]["price"+currency])+' %'
  percentagePreview.style.color = variationColor("1.0")
  statsCryptElt.appendChild(percentagePreview)

  //PREVIEW PART
  let graphPVElt = document.createElement("canvas")
  graphPVElt.setAttribute("max-width","300px")
  graphPVElt.setAttribute("height","auto")

  graphPVElt.classList.add("graphCanvas")
  childPreview.appendChild(graphPVElt)

  //------------------------PARTIE GESTION GRAPHIQUE----------------------
  let dataPV = {
          labels: date3D,
          datasets: [{
              label: "Crypto",
              backgroundColor: "transparent",
              borderColor: "rgb(0, 105, 255)",
              data: price3D,
              pointRadius:0
          }]
  }

  let optionsPV = {
    responsive: true,
    /*responsive: true,*/
    maintainAspectRatio:false,
    title: {
      display: false,
    },
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{
        display: false
        }],
      yAxes: [{
        display: false,
      }]
    }
  }

  let configPV = {
    type: 'line',
    data: dataPV,
    options: optionsPV
  }

  let ctxPV = graphPVElt.getContext('2d')
  let myChartPV = new Chart(ctxPV,configPV)


  /*
  let logoPreview = document.createElement("img")
  logoPreview.setAttribute("src",infoCurrency[currency].image)
  logoPreview.setAttribute("height","200px")
  logoPreview.setAttribute("width","200px")
  childPreview.appendChild(logoPreview)
  */

  //FULLVIEW PART

  //------------------------PARTIE TRAITEMENT DATA----------------------


  for (let i in result){
    let objectDateTmp = new ChooseDate(result[i].time)
    let dateTmp = objectDateTmp.dayNumber+"/"+objectDateTmp.date.getMonth()+" "+objectDateTmp.date.getHours()+":00"
    let priceTmp = result[i]["price"+currency]

    //PARTIE 3D (3 days)
    if (i>result.length-19){
      date3D.push(dateTmp)
      price3D.push(priceTmp)
    }
    //PARTIE 1W
    if (i>result.length-43){
      date1W.push(dateTmp)
      price1W.push(priceTmp)
    }
    //PARTIE 1M
    if(i>result.length-190 && i%4==0){
      date1M.push(dateTmp)
      price1M.push(priceTmp)
    }
    //PARTIE 3M
    if(i%10==0){
      date3M.push(dateTmp)
      price3M.push(priceTmp)
    }
  }



  //------------------------PARTIE ELEMENTS DOM----------------------

  let divButton = document.createElement("div")
  divButton.classList.add("div-btn-crypto")
  childFullview.appendChild(divButton)

  listeDurations = ["3D","1W","1M","3M"]
  for (let duration of listeDurations){
    //CREATION DU BOUTON
    let btnElt = document.createElement("button")
    btnElt.textContent = duration

    let priceTmp = "price"+duration
    let borderColorData
    let backgroundColorData
    if (eval(priceTmp)[0]>eval(priceTmp)[eval(priceTmp).length-1]){
      borderColorData="rgba(235, 59, 90, 1)"
      backgroundColorData="rgba(235, 59, 90, 0.5)"
    }
    else{
      borderColorData="rgba(39, 174, 96, 1)"
      backgroundColorData="rgba(39, 174, 96, 0.5)"
    }

    //FONCTION DU BOUTON
    btnElt.onclick = function(event){
      event.stopPropagation()
      dataFV.labels = eval("date"+duration)
      dataFV.datasets[0].data = eval("price"+duration)
      dataFV.datasets[0].borderColor = borderColorData
      dataFV.datasets[0].backgroundColor = backgroundColorData
      myChartFV.update(dataFV.datasets.data)
    }

    //IMPLEMENTATION DU BOUTON
    divButton.appendChild(btnElt)
  }


  //CREATION DU GRAPHIQUE
  let divGraphFV = document.createElement("div")
  divGraphFV.classList.add("graph-crypto")
  childFullview.appendChild(divGraphFV)

  let graphFVElt = document.createElement("canvas")
  graphFVElt.setAttribute("width","864px")
  graphFVElt.setAttribute("height","432px")

  graphFVElt.classList.add("graphCanvas")
  divGraphFV.appendChild(graphFVElt)


  //------------------------PARTIE GESTION GRAPHIQUE----------------------
  let dataFV = {
          labels: date3D,
          datasets: [{
              label: infoCurrency[currency].name+' Price',
              backgroundColor: variationColor(0.5),
              borderColor: variationColor(1.0),
              data: price3D,
          }]
  }

  let optionsFV = {
    responsive: false,
    //responsive: true,
    maintainAspectRatio:true,
    title: {
      display: true,
      text: infoCurrency[currency].name
    },
    scales: {
      xAxes: [{
        id: 'Time',
        display: true
        }],
      yAxes: [{
        id: 'Price',
        display: true,
      }]
    }
  }

  let configFV = {
    type: 'line',
    data: dataFV,
    options: optionsFV
  }

  let ctxFV = graphFVElt.getContext('2d')
  let myChartFV = new Chart(ctxFV,configFV)
}



//INDICATOR FUNCTIONS

function getIndicator(result, since){ // since is a unix timestamp

  valueArray = [];
  indicators = {
    BTCIndicator: Number,
    ETHIndicator: Number,
    XRPIndicator: Number,
    LTCIndicator: Number
  };

  // keep the value since the timestamp
  for(const elt in result){
    if(result[elt].time >= since){
      valueArray.push(result[elt]);
    }
  }

  indicators.BTCIndicator = (10000*(valueArray[valueArray.length - 1].priceBTC - valueArray[0].priceBTC) / valueArray[valueArray.length - 1].priceBTC) / valueArray.length;
  indicators.ETHIndicator = (10000*(valueArray[valueArray.length - 1].priceETH - valueArray[0].priceETH) / valueArray[valueArray.length - 1].priceETH) / valueArray.length;
  indicators.XRPIndicator = (10000*(valueArray[valueArray.length - 1].priceXRP - valueArray[0].priceXRP) / valueArray[valueArray.length - 1].priceXRP) / valueArray.length;
  indicators.LTCIndicator = (10000*(valueArray[valueArray.length - 1].priceLTC - valueArray[0].priceLTC) / valueArray[valueArray.length - 1].priceLTC) / valueArray.length;

  return indicators;
}

function variationsPercentage(initiale,finale){
  return round((finale-initiale)*100/initiale,2);
}

function indicatorsZone(result){
  var ongletEco = document.querySelector(".economie.tab-div")

  let newZone = addNewzone(economie,1)[0]

  indicators = document.createElement("h1");
  indicators.appendChild(document.createTextNode("Indicateurs"));
  newZone.appendChild(indicators);


  let averageDays = (getIndicator(result, Date.now()/1000 - 3600*24*3).BTCIndicator+getIndicator(result, Date.now()/1000 - 3600*24*3).ETHIndicator+getIndicator(result, Date.now()/1000 - 3600*24*3).XRPIndicator+getIndicator(result, Date.now()/1000 - 3600*24*3).LTCIndicator)/4
  let averageMonths = (getIndicator(result, Date.now()/1000 - 3600*24*90).BTCIndicator+getIndicator(result, Date.now()/1000 - 3600*24*90).ETHIndicator+getIndicator(result, Date.now()/1000 - 3600*24*90).XRPIndicator+getIndicator(result, Date.now()/1000 - 3600*24*90).LTCIndicator)/4

  indicatorsAverageDay = document.createElement("p")
  indicatorsAverageDay.appendChild(document.createTextNode("Indicateur de 3 jours du marché : "+ round(averageDays),2));
  indicatorsAverageMonth = document.createElement("p")
  indicatorsAverageMonth.appendChild(document.createTextNode("Indicateur de 3 mois du marché : "+ round(averageMonths),2));

  newZone.appendChild(indicatorsAverageDay);
  newZone.appendChild(indicatorsAverageMonth)
}
