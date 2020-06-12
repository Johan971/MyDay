document.getElementById("economie").onclick = function (){

  var ongletEco = document.querySelector(".economie.tab-div");
  ongletEco.innerHTML = "";

  getReq('/api/kraken', (result) => {



    cryptoZone("BTC", result);
    cryptoZone("ETH", result);
    // pq pas
    cryptoZone("XRP", result);
    cryptoZone("LTC", result);
    
    console.log(getIndicator(result, Date.now()/1000 - 3600*24*3));
    console.log(getIndicator(result, Date.now()/1000 - 3600*24*90));

  });

}

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

  indicators.BTCIndicator = (100*(valueArray[valueArray.length - 1].priceBTC - valueArray[0].priceBTC) / valueArray[valueArray.length - 1].priceBTC) / valueArray.length;
  indicators.ETHIndicator = (100*(valueArray[valueArray.length - 1].priceETH - valueArray[0].priceETH) / valueArray[valueArray.length - 1].priceETH) / valueArray.length;
  indicators.XRPIndicator = (100*(valueArray[valueArray.length - 1].priceXRP - valueArray[0].priceXRP) / valueArray[valueArray.length - 1].priceXRP) / valueArray.length;
  indicators.LTCIndicator = (100*(valueArray[valueArray.length - 1].priceLTC - valueArray[0].priceLTC) / valueArray[valueArray.length - 1].priceLTC) / valueArray.length;
  
  return indicators;
}

function variationsPercentage(initiale,finale){
  return round((finale-initiale)*100/initiale,2);
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


  var ongletEco = document.querySelector(".economie.tab-div");

  let newZone = addNewzone(economie,1);
  newZone[0].classList.add("crypto")
  let childPreview = newZone[0].getElementsByClassName("preview")[0];
  let childFullview = newZone[0].getElementsByClassName("fullview")[0];

  /*let newZone = document.querySelector(".zone.economie")
  let childPreview = newZone.children[0]
  let childFullview = newZone.children[1]*/


  let infoCurrency = {
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
  //PREVIEW PART

  //Définition de la couleur (verte || rouge) en fonction des variations du cours de la monnaie
  let variationColor
  if (result[result.length-1]["price"+currency]>result[result.length-19]["price"+currency]){
    variationColor = (opacityColor) => "rgba(39, 174, 96,"+opacityColor+")"
  }
  else{
    variationColor = (opacityColor) => "rgba(235, 59, 90,"+opacityColor+")"
  }

  //PARTIE ELEMENT DOM

  childPreview.innerHTML="<h1>"+infoCurrency[currency].name+"</h1>"


  let lastPricePreview = document.createElement("h2")
  lastPricePreview.textContent = result[result.length-1]["price"+currency]+" €"
  lastPricePreview.style.color = variationColor("1.0")
  childPreview.appendChild(lastPricePreview)

  let percentagePreview = document.createElement("h3")
  percentagePreview.textContent = variationsPercentage(result[result.length-19]["price"+currency],result[result.length-1]["price"+currency])+' %'
  percentagePreview.style.color = variationColor("1.0")
  childPreview.appendChild(percentagePreview)




  let logoPreview = document.createElement("img")
  logoPreview.setAttribute("src",infoCurrency[currency].image)
  logoPreview.setAttribute("height","200px")
  logoPreview.setAttribute("width","200px")
  childPreview.appendChild(logoPreview)


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
  divButton.classList.add("div-btn-"+currency)
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
      data.labels = eval("date"+duration)
      data.datasets[0].data = eval("price"+duration)
      data.datasets[0].borderColor = borderColorData
      data.datasets[0].backgroundColor = backgroundColorData
      myChart.update(data.datasets.data)
    }

    //IMPLEMENTATION DU BOUTON
    divButton.appendChild(btnElt)
  }


  //CREATION DU GRAPHIQUE
  /*let divGraph = document.createElement("div")
  divGraph.classList.add("graph-crypto")
  childFullview.appendChild(divGraph)*/

  let graphElt = document.createElement("canvas")
  graphElt.setAttribute("width","864px")
  graphElt.setAttribute("height","432px")

  graphElt.classList.add("graphCanvas")
  childFullview.appendChild(graphElt)


  //------------------------PARTIE GESTION GRAPHIQUE----------------------
  let data = {
          labels: date3D,
          datasets: [{
              label: infoCurrency[currency].name+' Price',
              backgroundColor: variationColor(0.5),
              borderColor: variationColor(1.0),
              data: price3D,
          }]
  }

  let options = {
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

  let config = {
    type: 'line',
    data: data,
    options: options
  }

  let ctx = graphElt.getContext('2d')
  let myChart = new Chart(ctx,config)

  ongletEco.appendChild(newZone[0]);

}
