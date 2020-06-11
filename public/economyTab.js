document.getElementById("economie").onclick = function (){

  var ongletEco = document.querySelector(".economie.tab-div");
  ongletEco.innerHTML = "";

  getReq('/api/kraken', (result) => {
    cryptoZone("BTC", result);
    cryptoZone("ETH", result);
    cryptoZone("XRP", result);
    cryptoZone("LTC", result);
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
