
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

function compareDelta(a, b) {

	const deltaA = a.delta;
	const deltaB = b.delta;

	let comparison = 0;

	if (deltaA < deltaB) {
		comparison = 1;
	} else if (deltaA > deltaB) {
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

		classTwit="twitterZone"
		var newZone2=addNewzone(media,1,classTwit)
        var preView=newZone2[0].getElementsByClassName("preview")
		/*
		let preview = zoneMain[0].children[0]
		let fullview = zoneMain[0].children[1]
		*/

		// newZone2.classList.add("twitter")

        //HEADERZONE PART
        let headerZone = document.createElement("div")
        headerZone.classList.add("header-zone")
        newZone2[0].insertBefore(headerZone,preView[0])

        let imageHeader = document.createElement("i")
        imageHeader.class="logoMedia"
        imageHeader.setAttribute("class","fab fa-twitter-square fa-3x")
        imageHeader.setAttribute("alt","LogoTwitter")
        headerZone.appendChild(imageHeader)

        let titleHeader = document.createElement("h1")
        titleHeader.setAttribute("class", "headerZoneTitle")
        titleHeader.textContent = "Twitter"
        headerZone.appendChild(titleHeader)

        //Twitter content
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

		var newZonePrediction = addNewzone(media, 1,"twitterZone");

		// sort by delta
		let predictionResult = result.slice(10, result.length - 1).sort(compareDelta);;
		let topResult = result.slice(0,10).sort(compareDelta);

		predictionTitle1 = document.createElement("h1");
		predictionTitle1.appendChild(document.createTextNode("Prochains Tweet en tendance"));
		prediction1 = document.createElement("h2");
		prediction2 = document.createElement("h2");
		separator = document.createElement("hr");
		predictionTitle2 = document.createElement("h1");
		predictionTitle2.appendChild(document.createTextNode("Prochains Tweet à sortir des tendances"));
		prediction3 = document.createElement("h2");
		prediction4 = document.createElement("h2");

		if (predictionResult[0].name[0] != '#') {
			prediction1.appendChild(document.createTextNode("#" + predictionResult[0].name));
		}
		else{
			prediction1.appendChild(document.createTextNode(predictionResult[0].name));
		}

		if (predictionResult[1].name[0] != '#') {
			prediction2.appendChild(document.createTextNode("#" + predictionResult[1].name));
		} else {
			prediction2.appendChild(document.createTextNode(predictionResult[1].name));
		}

		if (topResult[topResult.length-1].name[0] != '#') {
			prediction3.appendChild(document.createTextNode("#" + topResult[topResult.length-1].name));
		} else {
			prediction3.appendChild(document.createTextNode(topResult[topResult.length-1].name));
		}
		
		if (topResult[topResult.length-2].name[0] != '#') {
			prediction4.appendChild(document.createTextNode("#" + topResult[topResult.length-2].name));
		} else {
			prediction4.appendChild(document.createTextNode(topResult[topResult.length-2].name));
		}

		newZonePrediction[0].appendChild(predictionTitle1);
		newZonePrediction[0].appendChild(prediction1);
		newZonePrediction[0].appendChild(prediction2);
		newZonePrediction[0].appendChild(separator);
		newZonePrediction[0].appendChild(predictionTitle2);
		newZonePrediction[0].appendChild(prediction3);
		newZonePrediction[0].appendChild(prediction4);

		ongletMedia.appendChild(newZonePrediction[0]);
        var preViewPred=newZonePrediction[0].getElementsByClassName("preview")

        //HEADER ZONEZ TWITTER PREDICTION
        let headerZonePred = document.createElement("div")
        headerZonePred.classList.add("header-zone")
        newZonePrediction[0].insertBefore(headerZonePred,preViewPred[0])

        let imageHeaderPred = document.createElement("i")
        imageHeaderPred.class="logoMedia"
        imageHeaderPred.setAttribute("class","fab fa-twitter-square fa-3x")
        imageHeaderPred.setAttribute("alt","LogoTwitter")
        headerZonePred.appendChild(imageHeaderPred)

        let titleHeaderPred = document.createElement("h1")
        titleHeaderPred.setAttribute("class", "headerZoneTitle")
        titleHeaderPred.textContent = "Twitter"
        headerZonePred.appendChild(titleHeaderPred)
   


        // Separation Twitter/ News
        var divSeparator=document.createElement("div")
        var hrSeparator=document.createElement("hr")
        divSeparator.setAttribute("id", "separator")
        hrSeparator.setAttribute("id", "lignSeparator")
        divSeparator.appendChild(hrSeparator);
        
        ongletMedia.appendChild(divSeparator);

		getReq('/api/news', (result) => {
			
			tabNews=result;
			var contenuArticle=""
			var descriptionArtcicle=""
			var articleLink=""
            var classNews="News"
			var newZone=addNewzone(media,tabNews.length,classNews)// newZone is an array with all the new HTML element "zone"

			for (var i= 0; i<tabNews.length;i++){

                var preView=newZone[i].getElementsByClassName("preview")
                var fullView=newZone[i].getElementsByClassName("fullview")
                 //HEADERZONE PART
                let headerZone = document.createElement("div")
                headerZone.classList.add("header-zone")
                newZone[i].insertBefore(headerZone,preView[0])

                let imageHeader = document.createElement("i")
                imageHeader.class="logoMedia"
                imageHeader.setAttribute("class","far fa-newspaper fa-2x")
                imageHeader.setAttribute("alt","Logo Media")
                headerZone.appendChild(imageHeader)

                let titleHeader = document.createElement("h1")
                titleHeader.setAttribute("class", "headerZoneTitle")
                titleHeader.textContent = "   News"
                headerZone.appendChild(titleHeader)
				//gestion de l affichage de la preview d'un article (titre, image + descrition)
				

                if(tabNews[i].imageUrl!=null){
                    var imageNode=document.createElement("img")
                    imageNode.setAttribute("src", tabNews[i].imageUrl)
                    imageNode.setAttribute("class", "imgArcticle")
                    preView[0].appendChild(imageNode)
                }

				var titrePv=document.createElement("h2")//titre preView
				titrePv.appendChild(document.createTextNode(tabNews[i].title))
                titrePv.setAttribute("class", "articleTitle")
				preView[0].appendChild(titrePv)

               
                if(tabNews[i].description){
				descriptionArtcicle=document.createElement("p")
                descriptionArtcicle.setAttribute("class", "articleSpeech")
				descriptionArtcicle.appendChild(document.createTextNode(tabNews[i].description))
				preView[0].appendChild(descriptionArtcicle)
                }
				//gestion de la full view (titre + contenu)
				


				var titreFv=document.createElement("h1")
				titreFv.appendChild(document.createTextNode(tabNews[i].title))//titre fullView
				fullView[0].appendChild(titreFv)

                if(tabNews[i].content!=null){
				contenuArticle=document.createElement("p")//titre preView
				contenuArticle.appendChild(document.createTextNode(tabNews[i].content))
				fullView[0].appendChild(contenuArticle)
                }

				articleLink=document.createElement("a")//titre preView
				articleLink.setAttribute("href", tabNews[i].articleUrl);
				

				articleLink.setAttribute("target", "_blank");
				articleLink.appendChild(document.createTextNode(tabNews[i].articleUrl))
				fullView[0].appendChild(articleLink)

			}
			
		})
	
	});

}