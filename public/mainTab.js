
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

function degToRad(degree) {
  var factor = Math.PI / 180;
  return degree * factor;
}

function renderTime(ctx) {
  var now = new Date();
  var today = now.toDateString();
  var time = now.toLocaleTimeString();
  var hrs = now.getHours();
  var min = now.getMinutes();
  var sec = now.getSeconds();
  var mil = now.getMilliseconds();
  var smoothsec = sec + (mil / 1000);
  var smoothmin = min + (smoothsec / 60);

  //Background
  gradient = ctx.createRadialGradient(250, 250, 5, 250, 250, 300);
  gradient.addColorStop(0, "#A9A9A9");
  gradient.addColorStop(1, "#696969");
  ctx.fillStyle = gradient;
  //ctx.fillStyle = 'rgba(00 ,00 , 00, 1)';
  ctx.fillRect(0, 0, 500, 500);
  //Hours
  ctx.beginPath();
  ctx.arc(250, 250, 200, degToRad(270), degToRad((hrs * 30) - 90));
  ctx.stroke();
  //Minutes
  ctx.beginPath();
  ctx.arc(250, 250, 170, degToRad(270), degToRad((smoothmin * 6) - 90));
  ctx.stroke();
  //Seconds
  ctx.beginPath();
  ctx.arc(250, 250, 140, degToRad(270), degToRad((smoothsec * 6) - 90));
  ctx.stroke();
  //Date
  ctx.font = "25px Helvetica";
  ctx.fillStyle = 'rgba(00, 255, 255, 1)'
  ctx.fillText(today, 175, 250);
  //Time
  ctx.font = "25px Helvetica Bold";
  ctx.fillStyle = 'rgba(00, 255, 255, 1)';
  ctx.fillText(time + ":" + mil, 175, 280);

}

function clockCreation(){
  let canvas = document.createElement("canvas");
  let mainTab = document.querySelector(".main.tab-div");

  let newZone = addNewzone(main, 1);
  let childPreview = newZone[0].getElementsByClassName("preview")[0];
  let childFullview = newZone[0].getElementsByClassName("fullview")[0];

  newZone[0].setAttribute("id", "clock");
  canvas.setAttribute("id", "canvas");
  canvas.setAttribute("width", "500px");
  canvas.setAttribute("height", "500px");

  newZone[0].appendChild(canvas);
}

function clockAnimation(){

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  ctx.strokeStyle = '#00ffff';
  ctx.lineWidth = 17;
  ctx.shadowBlur = 15;
  ctx.shadowColor = '#00ffff';

  renderTime(ctx);
}

function showWeather(){

  var tabMeteo=[]

  let zonePreview = document.getElementsByClassName("zone1 preview")
  let zoneFullview = document.getElementsByClassName("zone1 fullview")

  zonePreview[0].innerHTML = ""
  zoneFullview[0].innerHTML = ""

  clockCreation();


  getReq('/api/weeklyWeather', (result) => {
    tabMeteo=result;

    var today = new ChooseDate(tabMeteo[0].timeStamp);
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
