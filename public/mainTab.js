
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




function addNewzone(currentTab,numZone){// condition : à lancer avant startZone et/ou startBar même si inclus dans une autre fonction
	
	var className=currentTab.getAttribute("id");
	var selecZone=".zone."+className

	var allZone= document.querySelectorAll(selecZone)
	console.log(allZone)

	var tabElement=[]

	for (var i=0;i<numZone;i++){
		console.log(i)
		var zoneNumber=allZone.length+i+1;
		var focusTab=document.querySelector(".media")
		
		var myDivzone=document.createElement("div");
	 	myDivzone.setAttribute("class", "zone " +className);
		myDivzone.setAttribute("id","zone"+zoneNumber);

	 	focusTab.appendChild(myDivzone)
	 	

	 	var myDivPreview=document.createElement("div");
	 	myDivPreview.setAttribute("class", "zone"+zoneNumber+" preview");
		myDivPreview.setAttribute("style","display:block");
		myDivzone.appendChild(myDivPreview)
		
		var myDivFullview=document.createElement("div");
		myDivFullview.setAttribute("class", "zone"+zoneNumber+" fullview");
		myDivFullview.setAttribute("style","display:none");
		myDivzone.appendChild(myDivFullview)

		tabElement.push(myDivzone)
    }
    console.log('Les élements ajoutés sont :')
    return(tabElement)
}

/*
function afficheNews(){
	var tabNews=[]
	getReq('/api/news', (result) => {
        console.log(result);
        tabNews=result;
        newZone=""
        for( let elt in tabNews){
        	 newZone='<div class="zone main" id="zone1"> <div class="zone1 preview"> Tu vois actuellement la preview de cette zone</div><div class="zone1 fullview" style="display:none"><p><br>En cliquant, tu as la fullview de la zone <br><br>Vêtues d un habit bleu sombre, qui les écoutait à tour de bras nos respectables citoyens !Donnez-moi votre parole que si je ne trouve riend autre en lui que le quartier voisin du ruisseau offrait un air d inquiétude.</p></div> </div>'

        }

    })
}*/
