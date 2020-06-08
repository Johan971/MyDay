
function ChooseDate(timeStamp) {
  let dayNameArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let monthDayArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  this.ts = timeStamp;
  this.date = new Date(timeStamp * 1000);
  this.dayNumber = this.date.getDate(); // number of the day
  this.monthName = monthDayArray[this.date.getMonth()];
  this.dayName = dayNameArray[this.date.getDay()];
  this.yearNumber = this.date.getFullYear();
}


function showWeather() {
  var todayDate = timeStampToDate(jsonResponse[0]["timeStamp"]);
  var todayTemp = jsonResponse[0]["temp"]["day"];
  var todayDes = jsonResponse[0]["temp"]["description"];
}




function afficheMeteo() {
  var tabMeteo=[]
  console.log("execute")
  getReq('/api/weeklyWeather', (result) => {
  	tabMeteo=result;
  	console.log(tabMeteo)
  	for(var i=0; i<tabMeteo.length;i++){
    console.log("les différentes infos de l'élement"+i+" sont :")
    console.log(new ChooseDate(tabMeteo[i].timeStamp).dayName);
  	}
  })
  var zoneMain=document.querySelectorAll(".zone.main")
  console.log(zoneMain[0])
  
}


