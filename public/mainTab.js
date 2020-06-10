
function ChooseDate(timeStamp) {
  let dayNameArray = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
  let monthDayArray = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"]

  this.ts = timeStamp;
  this.date = new Date(timeStamp * 1000);
  this.dayNumber = this.date.getDate(); // number of the day
  this.monthName = monthDayArray[this.date.getMonth()];
  this.dayName = dayNameArray[this.date.getDay()];
  this.yearNumber = this.date.getFullYear();
}

function showWeather(){
  var tabMeteo=[]

  let zonePreview = document.getElementsByClassName("zone1 preview")
  let zoneFullview = document.getElementsByClassName("zone1 fullview")

  zonePreview[0].innerHTML = ""
  zoneFullview[0].innerHTML = ""

  getReq('/api/weeklyWeather', (result) => {
    tabMeteo=result;

    var today = new ChooseDate(tabMeteo[0].timeStamp)
    date = document.createElement("h1");
    date.appendChild(document.createTextNode(today.dayName+" "+today.dayNumber+" "+today.monthName+" "+today.yearNumber));
    zonePreview[0].appendChild(date);


    weather = document.createElement("p");
    weather.appendChild(document.createTextNode(tabMeteo[0].description+" temperature du jour :"+tabMeteo[0].temp["day"]));
    zonePreview[0].appendChild(weather);

    for(var i=0; i<tabMeteo.length;i++){
      var day = new ChooseDate(tabMeteo[i].timeStamp)

      date = document.createElement("h1");
      date.appendChild(document.createTextNode(day.dayName+" "+day.dayNumber+" "+day.monthName+" "+day.yearNumber));
      zoneFullview[0].appendChild(date);


      weather = document.createElement("p");
      weather.appendChild(document.createTextNode(tabMeteo[i].description+" temperature du jour :"+tabMeteo[i].temp["day"]+" ressenti :"+tabMeteo[i].temp["dayFl"]));
      zoneFullview[0].appendChild(weather);

      weather2 = document.createElement("p");
      weather2.appendChild(document.createTextNode("Matin :"+tabMeteo[i].temp["morning"]+" avec un ressenti de : "+tabMeteo[i].temp["morningFl"]));
      zoneFullview[0].appendChild(weather2);

      weather3 = document.createElement("p");
      weather3.appendChild(document.createTextNode(" Apres midi :"+tabMeteo[i].temp["evening"]+" avec un ressenti de : "+tabMeteo[i].temp["eveningFl"]));
      zoneFullview[0].appendChild(weather3);

      weather4 = document.createElement("p");
      weather4.appendChild(document.createTextNode(" Nuit :"+tabMeteo[i].temp["night"]+" avec un ressenti de : "+tabMeteo[i].temp["nightFl"]));
      zoneFullview[0].appendChild(weather4);
    }
  })
}
