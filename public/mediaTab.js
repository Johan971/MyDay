
document.getElementById("media").onclick = function(){
	var tabNews=[]
	getReq('/api/news', (result) => {
		var ongletMedia=document.querySelector(".media.tab-div")
        ongletMedia.innerHTML=""
        tabNews=result;
        var contenuArticle=""
        var descriptionArtcicle=""
        var newZone=addNewzone(media,tabNews.length)// newZone is an array with all the new HTML element "zone"
		for (var i= 0; i<tabNews.length;i++){


			//gestion de l affichage de la preview d'un article (titre, image + descrition)
			var preView=newZone[i].getElementsByClassName("preview")

			var titrePv=document.createElement("h1")//titre preView
			titrePv.appendChild(document.createTextNode(tabNews[i].title))
			preView[0].appendChild(titrePv)


			var imageNode=document.createElement("img")
			imageNode.setAttribute("src", tabNews[i].imageUrl);
			imageNode.setAttribute("class", "imgArcticle");
			preView[0].appendChild(imageNode)


			
			descriptionArtcicle=document.createElement("p")//titre preView
			descriptionArtcicle.appendChild(document.createTextNode(tabNews[i].description))
			preView[0].appendChild(descriptionArtcicle)

			//gestion de la full view (titre + contenu)
			var fullView=newZone[i].getElementsByClassName("fullview")

			var titreFv=document.createElement("h1")
			titreFv.appendChild(document.createTextNode(tabNews[i].title))//titre fullView
			fullView[0].appendChild(titreFv)

			contenuArticle=document.createElement("p")//titre preView
			contenuArticle.appendChild(document.createTextNode(tabNews[i].content))
			fullView[0].appendChild(contenuArticle)

		}
        
    })
}