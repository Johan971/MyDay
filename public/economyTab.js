document.getElementById("economie").onclick = function (){
  let zoneMain = document.querySelectorAll(".zone.economie");
  let preview = zoneMain[0].children[0];
  let fullview = zoneMain[0].children[1];

  preview.innerHTML = "";
  fullview.innerHTML = "";
  cryptoZone("BTC")
}


function cryptoZone(currency){
  //let newZone = addNewzone(economie,1)   //On crée une nouvelle zone dans l'onglet "economy"
  let newZone = document.querySelector(".zone.economie")

  let childPreview = newZone.children[0]

  let childFullview = newZone.children[1]


  getReq('/api/kraken', (result) => {

    let infoCurrency = {
      BTC : {
        name:"bitcoin"
      },
      ETH : {
        name:"ethereum"
      }
    }

    //PREVIEW PART

    let lastPrice = result[result.length-1]["price"+currency]

    childPreview.innerHTML="<h1>"+infoCurrency[currency].name+"</h1>"+"<h2>"+lastPrice+"</h2>"


    //FULLVIEW PART

    //------------------------PARTIE TRAITEMENT DATA----------------------
    date3D = []
    price3D = []

    date1W = []
    price1W = []

    date1M = []
    price1M =[]

    date3M = []
    price3M = []

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
      if (i%40==0){
        date1W.push(dateTmp)
        price1W.push(priceTmp)
      }
      //PARTIE 1M
      if(i%25==0){
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
    divButton.id="div-btn-btc"
    childFullview.appendChild(divButton)

    listeDurations = ["3D","1W","1M","3M"]
    for (let duration of listeDurations){
      //CREATION DU BOUTON
      let btnElt = document.createElement("button")
      btnElt.textContent = duration

      //FONCTION DU BOUTON
      btnElt.onclick = function(event){
        event.stopPropagation()
        data.labels = eval("date"+duration)
        data.datasets.data = eval("price"+duration)
        myChart.update()
      }

      //IMPLEMENTATION DU BOUTON
      divButton.appendChild(btnElt)
    }


    //CREATION DU GRAPHIQUE
    let divGraph = document.createElement("div")
    divGraph.id = "graph-btc"
    childFullview.appendChild(divGraph)

    let graphElt = document.createElement("canvas")
    divGraph.appendChild(graphElt)


    //------------------------PARTIE GESTION GRAPHIQUE----------------------
    let data = {
           labels: date3D,
           datasets: [{
               label: 'Bictoin Price',
               backgroundColor: 'rgb(255, 255, 255)',
               borderColor: 'rgb(255, 99, 132)',
               data: price3D
           }]
    }

    let options = {
      responsive: true,
      title: {
        display: true,
        text: 'Bitcoin'
      },
      scales: {
        xAxes: [{
          id: 'Time',
          display: true
          }],
        yAxes: [{
          id: 'Price',
          display: true
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

  })

}
