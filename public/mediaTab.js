
document.getElementById("media").onclick = function(){
	var tabNews=[]
	getReq('/api/news', (result) => {
        console.log(result);
        tabNews=result;
        var newZone=addNewzone(media,tabNews.length)// newZone is an array with all the new HTML element "zone"
       
        

    })
}