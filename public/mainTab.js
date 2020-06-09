
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







/*
function afficheNews(){
	var tabNews=[]
	getReq('/api/news', (result) => {
        console.log(result);
        tabNews=result;
        newZone=""
        for( let elt in tabNews){
        	

        }

    })
}*/
