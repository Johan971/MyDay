
function compare(a, b) {

	const volA = a.tweetVolume;
	const volB = b.tweetVolume;

	let comparison = 0;

	if (volA < volB) {
		comparison = 1;
	} else if (volA > volB) {
		comparison = -1;
	}

	return comparison;
}

document.getElementById("media").onclick = function(){
	var tabNews=[]
	var ongletMedia=document.querySelector(".media.tab-div")
    ongletMedia.innerHTML=""


	getReq('/api/twitter', (result)=>{

		console.log(result)

		// sort again
		result = result.sort(compare);
		
		var newZone2=addNewzone(media,1)
		/*
		let preview = zoneMain[0].children[0]
		let fullview = zoneMain[0].children[1]
		*/

		// newZone2.classList.add("twitter")

		var preview=newZone2[0].getElementsByClassName("preview")[0]
		var fullview=newZone2[0].getElementsByClassName("fullview")[0]
		
		

		var titlePv = document.createElement("h1")
		titlePv.setAttribute("class", "titleTwitterTrend")
		titlePv.appendChild(document.createTextNode("Tendances"))
		preview.appendChild(titlePv)
		
		var titleFv = document.createElement("h1")
		titleFv.setAttribute("class", "titleTwitterTrend")
		titleFv.appendChild(document.createTextNode("Tendances"))
		fullview.appendChild(titleFv)
		
		var logotwitter=document.createElement("img")
		logotwitter.setAttribute("src", "https://upload.wikimedia.org/wikipedia/fr/thumb/c/c8/Twitter_Bird.svg/1200px-Twitter_Bird.svg.png")
		logotwitter.setAttribute("class", "logoTwitter")
		
		var canvasPv = document.createElement("canvas")
		var canvasFv = document.createElement("canvas")

		var ctx1 = canvasPv.getContext('2d')
		var ctx2 = canvasFv.getContext('2d')           	

		logotwitter.onload= ()=>{
			ctx1.drawImage(logotwitter, 150, 0, 100, 100)
			ctx2.drawImage(logotwitter, 150, 0, 100, 100)

			// console.log(canvas,ctx)
		}

		preview.appendChild(canvasPv)
		fullview.appendChild(canvasFv)
		
		for (var previewIterator = 0; previewIterator < 3; previewIterator++){
			separatorPv=document.createElement("hr")
			trendNamePv=document.createElement("h2")
			trendNamePv.appendChild(document.createTextNode(result[previewIterator].name))
			preview.appendChild(trendNamePv)
			preview.appendChild(separatorPv)
			
		}

		for(var i = 0; i < 10; i++) {
			
			separatorFv = document.createElement("hr")			

			trendNameFv = document.createElement("h2")//titre preView
			trendNameFv.appendChild(document.createTextNode(result[i].name))
			fullview.appendChild(trendNameFv)

			var explore = document.createElement("p")
			
			var link=document.createElement("a")
			link.setAttribute("href", result[i].urlTwitter)
			link.appendChild(document.createTextNode("Explorez"))
			explore.appendChild(link)
			explore.setAttribute("class", "twitterExploreURL")
			// explore.setAttribute("href", elm.urlTwitter)
			fullview.appendChild(explore)

			if (result[i].tweetVolume != null) {
				var last24Tweet= document.createElement("p")
				last24Tweet.appendChild(document.createTextNode(`${result[i].tweetVolume} tweets durant ces dernières 24 heures`))
	
				fullview.appendChild(last24Tweet)
			}

			fullview.appendChild(separatorFv)

		};

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
				imageNode.setAttribute("src", tabNews[i].imageUrl)
				imageNode.setAttribute("class", "imgArcticle")
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
	
	});

}