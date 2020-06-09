
document.getElementById("media").onclick = function(){
	var tabNews=[]
	getReq('/api/news', (result) => {
		var ongletMedia=document.querySelector(".media.tab-div")
        console.log(ongletMedia)
        ongletMedia.innerHTML=""
        
        console.log(result);
        tabNews=result;
        var titreArticle=""
        var newZone=addNewzone(media,tabNews.length)// newZone is an array with all the new HTML element "zone"

        

		for (var i= 0; i<tabNews.length;i++){
			titreArticle=document.createTextNode(tabNews[i].title)

			console.log(titreArticle)
			var preView=newZone[i].getElementsByClassName("preview")
			console.log(preView)
			preView[0].appendChild(titreArticle)
		}
        

    })
}