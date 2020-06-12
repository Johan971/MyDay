
function ChooseDate(timeStamp) {
  let dayNameArray = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
  let monthDayArray = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"]

  this.ts = timeStamp;
  this.date = new Date(timeStamp * 1000);
  this.hour = this.date.getHours();
  this.minute = this.date.getMinutes();
  this.dayNumber = this.date.getDate(); // number of the day
  this.monthName = monthDayArray[this.date.getMonth()];
  this.dayName = dayNameArray[this.date.getDay()];
  this.yearNumber = this.date.getFullYear();
}

function round(nombre, precision){
    var precision = precision || 2;
    var tmp = Math.pow(10, precision);
    return Math.round( nombre*tmp )/tmp;
}

function typeNum(number) {
    return (number < 10) ? '0' + number.toString() : number.toString();
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

  var ongletMain=document.querySelector(".main.tab-div")
      ongletMain.innerHTML=""

      clockCreation()


  getReq('/api/weeklyWeather', (result) => {
    tabMeteo=result;

    var newZone=addNewzone(main,tabMeteo.length)

    for(var i=0; i<tabMeteo.length;i++){


      var preview = newZone[i].getElementsByClassName("preview")
      var fullview = newZone[i].getElementsByClassName("fullview")


      var day = new ChooseDate(tabMeteo[i].timeStamp)
      var sunset = new ChooseDate(tabMeteo[i].sunset)
      var sunrise = new ChooseDate(tabMeteo[i].sunrise)

      date = document.createElement("h1");
      date.appendChild(document.createTextNode(day.dayName+" "+day.dayNumber+" "+day.monthName+" "+day.yearNumber));
      preview[0].appendChild(date);

      logoWeather=document.createElement("img")
      logoWeather.setAttribute("src","https://openweathermap.org/img/wn/"+tabMeteo[i].icon+"@2x.png")
      preview[0].appendChild(logoWeather)

      weather = document.createElement("p");
      weather.appendChild(document.createTextNode("Le temps est : "+tabMeteo[i].description));
      preview[0].appendChild(weather);

      weather = document.createElement("p");
      weather.appendChild(document.createTextNode("La temperature de ce jour est : "+round(tabMeteo[i].temp["day"],1)+" °C"));
      preview[0].appendChild(weather);

      weather = document.createElement("p");
      weather.appendChild(document.createTextNode("Avec un ressenti de : "+round(tabMeteo[i].temp["dayFl"],1)+" °C"));
      preview[0].appendChild(weather);

      date = document.createElement("h1");
      date.appendChild(document.createTextNode(day.dayName+" "+day.dayNumber+" "+day.monthName+" "+day.yearNumber));
      fullview[0].appendChild(date);


      weather = document.createElement("p");
      weather.appendChild(document.createTextNode("Le temps est : "+tabMeteo[i].description+" avec une temperature de : "+tabMeteo[i].temp["day"]+" °C"+" et un ressenti de : "+tabMeteo[i].temp["dayFl"]+" °C"));
      fullview[0].appendChild(weather);

      weather = document.createElement("p");
      weather.appendChild(document.createTextNode("Matin : "+tabMeteo[i].temp["morning"]+" °C"+" avec un ressenti de : "+tabMeteo[i].temp["morningFl"]+" °C"));
      fullview[0].appendChild(weather);

      weather = document.createElement("p");
      weather.appendChild(document.createTextNode(" Apres midi : "+tabMeteo[i].temp["evening"]+" °C"+" avec un ressenti de : "+tabMeteo[i].temp["eveningFl"]+" °C"));
      fullview[0].appendChild(weather);

      weather = document.createElement("p");
      weather.appendChild(document.createTextNode(" Nuit : "+tabMeteo[i].temp["night"]+" °C"+" avec un ressenti de : "+tabMeteo[i].temp["nightFl"]+" °C"));
      fullview[0].appendChild(weather);

      weather = document.createElement("p");
      weather.appendChild(document.createTextNode("Le lever du soleil est à "+typeNum(sunrise.hour)+"h"+typeNum(sunrise.minute)));
      fullview[0].appendChild(weather);

      weather = document.createElement("p");
      weather.appendChild(document.createTextNode("Le coucher du soleil est à "+typeNum(sunset.hour)+"h"+typeNum(sunset.minute)));
      fullview[0].appendChild(weather);
    }
  })
}
