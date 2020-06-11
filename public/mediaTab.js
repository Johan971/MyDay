
document.getElementById("media").onclick = function(){
	var tabNews=[]
	var ongletMedia=document.querySelector(".media.tab-div")
    ongletMedia.innerHTML=""


	getReq('/api/news', (result) => {
		
        tabNews=result;
        var contenuArticle=""
        var descriptionArtcicle=""
        var articleLink=""
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

			articleLink=document.createElement("a")//titre preView
			articleLink.setAttribute("href", tabNews[i].articleUrl);
			articleLink.setAttribute("target", "_blank");
			articleLink.appendChild(document.createTextNode(tabNews[i].articleUrl))
			fullView[0].appendChild(articleLink)

		}
        
    })

    getReq('/api/twitter', (result)=>{

    	
        var newZone2=addNewzone(media,1)
        let preview = zoneMain[0].children[0]
    	let fullview = zoneMain[0].children[1]

    	preview.innerHTML = ""
   		fullview.innerHTML = ""

        var logotwitter=document.createElement("img")

        title = document.createElement("h1")
        title.setAttribute("class", "titlePreview")
        
        title.appendChild(document.createTextNode("Tendances"))


		logotwitter.setAttribute("src", "https://upload.wikimedia.org/wikipedia/fr/thumb/5/52/Logo-vlille.svg/1200px-Logo-vlille.svg.png")
		logotwitter.setAttribute("class", "imgPreview")
		preview.appendChild(logotwitter)


		




    })
}