
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

  var icons =[
    {icon : "10",image : "https://www.wallpaperup.com/uploads/wallpapers/2016/09/10/1016328/10f8db464dfdc5d159cbfd88a07ddc5e-700.jpg"},
    {icon : "09",image : "https://bacafanfic.files.wordpress.com/2014/10/tumblr_m6upaz4pvc1qhv7bk.jpg?w=560"},
    {icon : "01",image : "https://wallpapersite.com/images/pages/pic_h/4423.jpg"},
    {icon : "02",image : "https://4.bp.blogspot.com/-dZwQMqVZFMQ/UeAgjMdES1I/AAAAAAAAXFM/riuIUs_WoZc/s1600/Sun+And+Clouds+Wallpapers+(1).jpg"},
    {icon : "03",image : "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?ixlib=rb-1.2.1&w=1000&q=80"},
    {icon : "11",image : "https://sambadenglish.com/wp-content/uploads/2019/06/157ZIapRuOaO4HVf916cHjRZq_4Ope2Z2.jpg"},
    {icon : "13",image : "https://img.wallpapersafari.com/desktop/1920/1080/43/33/mxudJO.jpg"},
    {icon : "50",image : "https://inhabitat.com/wp-content/blogs.dir/1/files/2016/06/Matthias-Arndt-Triangle-Cliff-House-04-600x480.jpg"},
    {icon : "04",image : "https://c4.wallpaperflare.com/wallpaper/282/607/672/clouds-cloudy-sky-night-wallpaper-preview.jpg"}
  ]

      clockCreation()


  getReq('/api/weeklyWeather', (result) => {
    tabMeteo=result;
    var newZone=addNewzone(main,1,"zoneMeteoPrincipale")



    // =================PREVIEW=======================//



    var day = new ChooseDate(tabMeteo[0].timeStamp)
    var sunset = new ChooseDate(tabMeteo[0].sunset)
    var sunrise = new ChooseDate(tabMeteo[0].sunrise)

    var preview = newZone[0].getElementsByClassName("preview")[0]
    var fullview = newZone[0].getElementsByClassName("fullview")[0]
    //fullview.setAttribute("class","fullviewMeteo")



    var container=document.createElement("div") //Container superposition img text
    container.setAttribute("class","container")
    preview.appendChild(container)




    titleCase=(str)=> {
        return str.replace(
            /\w\S*/g,
            (txt)=> {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }


    createElementContainer=(adjective,containers,day)=>{   //today=0, tomorrow = 1 ...

      if (adjective=="date"){

        var date = new ChooseDate(tabMeteo[day].timeStamp)

        var element = document.createElement("h1");
        element.appendChild(document.createTextNode(date.dayName+" "+date.dayNumber+" "+date.monthName+" "+date.yearNumber))
        element.setAttribute("class","WeatherElements")

        element.setAttribute("id", adjective)
        containers.appendChild(element)
        return

      }
      else if (adjective=="description"){
        var element = document.createElement("p");
        element.appendChild(document.createTextNode(titleCase(String(tabMeteo[day].description))));
        element.setAttribute("class","WeatherElements")
        element.setAttribute("id", adjective)
        containers.appendChild(element);
        return
      }
      else if (adjective=="temp"){
        var element = document.createElement("p");
        element.appendChild(document.createTextNode(round(tabMeteo[day].temp["day"],1)+"°"));
        element.setAttribute("class","WeatherElements")
        element.setAttribute("id", adjective)
        containers.appendChild(element);
        return

      }
      else if (adjective=="ressenti"){
        var element = document.createElement("p");
        element.appendChild(document.createTextNode(round(tabMeteo[day].temp["dayFl"],1)+"°"));
        element.setAttribute("class","WeatherElements")
        element.setAttribute("id", adjective)
        containers.appendChild(element);

        var element2 = document.createElement("p");
        element2.appendChild(document.createTextNode("Ressenti"));
        element2.setAttribute("class","WeatherElements")
        element2.setAttribute("id", "ressenti2")
        containers.appendChild(element2);
        return
      }

      else if (adjective=="image") {

        icons.forEach(elm => {
              if (tabMeteo[day].icon.includes(elm.icon)) {
                if(container==containers){
                  var WeatherLogo=document.createElement("img")
                  WeatherLogo.setAttribute("src",elm.image)
                  containers.appendChild(WeatherLogo)
                  WeatherLogo.setAttribute("class","WeatherLogo")
                  return
                }
                else {
                  var WeatherLogo=document.createElement("img")
                  WeatherLogo.setAttribute("src",elm.image)
                  containers.appendChild(WeatherLogo)
                  WeatherLogo.setAttribute("class","WeatherLogoFull")
                  return

                }
              }
            })
      }
      else {
        console.log("ERROR ON ADJECTIVE")
      }

    }


    fillContainer=(container,day)=>{
      var image="image"
      var date="date"
      var des="description"
      var temp="temp"
      var ressenti="ressenti"

      createElementContainer(image,container,day)
      createElementContainer(date,container,day)
      createElementContainer(des,container,day)
      createElementContainer(temp,container,day)
      createElementContainer(ressenti,container,day)
    }

  fillContainer(container,0)
console.log(document.getElementsByClassName("containerFull"))




    // date = document.createElement("h1");
    // date.appendChild(document.createTextNode(day.dayName+" "+day.dayNumber+" "+day.monthName+" "+day.yearNumber))
    // date.setAttribute("class","WeatherElements")
    // container.appendChild(date);

    // weather = document.createElement("p");
    // weather.appendChild(document.createTextNode("Le temps est : "+tabMeteo[0].description));
    // weather.setAttribute("class","WeatherElements")
    // container.appendChild(weather);

    // weather = document.createElement("p");
    // weather.appendChild(document.createTextNode("La temperature de ce jour est : "+round(tabMeteo[0].temp["day"],1)+" °C"));
    // weather.setAttribute("class","WeatherElements")
    // container.appendChild(weather);

    // weather = document.createElement("p");
    // weather.appendChild(document.createTextNode("Avec un ressenti de : "+round(tabMeteo[0].temp["dayFl"],1)+" °C"));
    // weather.setAttribute("class","WeatherElements")
    // container.appendChild(weather);

    // ======================================================//

    // Mini zones des autres jours


    // for (var j=1;j<tabMeteo.length;j++){

    //   var previews = newZones[j].getElementsByClassName("preview")[0]
    //   var fullviews = newZones[j].getElementsByClassName("fullview")[0] //UNDEFINED
    //   // var day = new ChooseDate(tabMeteo[j].timeStamp)
    //   // var sunset = new ChooseDate(tabMeteo[j].sunset)
    //   // var sunrise = new ChooseDate(tabMeteo[j].sunrise)

    //   // date = document.createElement("h1");

    //   // date.appendChild(document.createTextNode(day.dayName+" "+day.dayNumber+" "+day.monthName+" "+day.yearNumber));
    //   // fullview[0].appendChild(date);
    //   previews[0].appendChild(document.createTextNode("fff"))
    // }
//------------------------------- fullview -----------------------------

//declare
      var containerFull0=document.createElement("div") //Container superposition img text
      containerFull0.setAttribute("class","containerFull")
      fullview.appendChild(containerFull0)
      var containerFull1=document.createElement("div") //Container superposition img text
      containerFull1.setAttribute("class","containerFull")
      fullview.appendChild(containerFull1)
      var containerFull2=document.createElement("div") //Container superposition img text
      containerFull2.setAttribute("class","containerFull")
      fullview.appendChild(containerFull2)
      var containerFull3=document.createElement("div") //Container superposition img text
      containerFull3.setAttribute("class","containerFull")
      fullview.appendChild(containerFull3)
      var containerFull4=document.createElement("div") //Container superposition img text
      containerFull4.setAttribute("class","containerFull")
      fullview.appendChild(containerFull4)
      var containerFull5=document.createElement("div") //Container superposition img text
      containerFull5.setAttribute("class","containerFull")
      fullview.appendChild(containerFull5)
      var containerFull6=document.createElement("div") //Container superposition img text
      containerFull6.setAttribute("class","containerFull")
      fullview.appendChild(containerFull6)
      var containerFull7=document.createElement("div") //Container superposition img text
      containerFull7.setAttribute("class","containerFull")
      fullview.appendChild(containerFull7)
 //create container and fill

 fillContainer(containerFull0,0)
 fillContainer(containerFull1,1)
 fillContainer(containerFull2,2)
 fillContainer(containerFull3,3)
 fillContainer(containerFull4,4)
 fillContainer(containerFull5,5)
 fillContainer(containerFull6,6)
 fillContainer(containerFull7,7)






/*
      var preview = newZones[i].getElementsByClassName("preview")
      var fullview = newZones[i].getElementsByClassName("fullview")

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
      fullview[0].appendChild(weather);*/

  })
}
