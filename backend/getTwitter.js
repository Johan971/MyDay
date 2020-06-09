const mongoose = require("mongoose"); // Import mongoose library
const read=require('./dbControl/read')
const connectdB=require('./dbControl/connectDb')
const Twit= require('twit')
const coordinates=require('./models/Coordinates')
const geolib=require('geolib')
const Trend = require("./models/Trends");

//////// WARNING : This is an asyc function working with callback ////////
// For more infos/understanding : https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call

const APIkey= "Uszcu6clBx7Om95C8nJQ94icS"
const APIkeySecret= "R4ei263Y2Dj3vyIuQvhg7ICT8G1pTV3iLzwC25BSXWCDOYs2iN"


const AccessToken ="1268637071830368256-yEzJv5kmPLdplBBuzA2zunK4f7T6Ai"
const AccessTokenSecret ="LboSKv85opYuiut7diwZixfBF6GBUnmxLSOSnUBAKNI8G"

	//======================Authentication
	// Configure the Twitter strategy for use by Passport.
	//
	// OAuth 1.0-based strategies require a `verify` function which receives the
	// credentials (`token` and `tokenSecret`) for accessing the Twitter API on the
	// user's behalf, alon with the user's profile.  The function must invoke `cb`
	// with a user object, which will be set at `req.user` in route handlers after
	// authentication.
// Newget()


module.exports ={


	newGet: (callback) => {
		//var result=[]


		const T = new Twit({
			consumer_key: APIkey,
			consumer_secret: APIkeySecret,
			access_token: AccessToken,
			access_token_secret: AccessTokenSecret,
		})

		const WOEIDs=[ {"name":"Lille","WOEID":608105,"lat":50.636227,"lon":3.075033} , {"name":"Lyon","WOEID":609125,"lat":45.746696,"lon":4.876320} ,{ "name":"Marseille","WOEID":610264,"lat":43.310077,"lon":5.370266} , {"name":"Montpellier","WOEID":612977,"lat":43.607995,"lon":3.881624} , {"name":"Nantes","WOEID":613858,"lat":47.218475,"lon":-1.554084} , {"name":"Paris","WOEID":615702,"lat":48.863356,"lon":2.343813} , {"name":"Rennes","WOEID":619163,"lat":48.108388,"lon":-1.679420} , {"name":"Strasbourg","WOEID":627791,"lat":48.577370,"lon":7.750068} , {"name":"Toulouse","WOEID":628886,"lat":43.602645,"lon":1.440712} ]

		/*==========================Recherche coordonnées BDD===========================*/

		connectdB()
		var tabDistance=[]
		var founde
		
		const lectureBDD=(succ,rej)=>{      //Cette fonction sors les coordonnées nécéssaire à l'affichage 
			
			coordinates.find((err,founded)=>{

				if(err) rej (err) // error handling


				if  (founded) {
			
					
					succ(founded)
				}


				else {
					console.log("pas de coordonnées")
					succ({_id:"012d",lat:48.863356,lon:2.343813})
				}

			})
				//mongoose.disconnect()
			
		}



		





		const calculDistance=(founde)=>{   //Quand on a les coord on cherche la ville la plus proche
			
			return new Promise(function(res,rej){
				console.log("dis:",founde)
				WOEIDs.forEach((elt)=>{

					tabDistance.push(geolib.getDistance({latitude:founde[0].lat, longitude:founde[0].lon},{latitude:elt.lat,longitude:elt.lon},(err)=>{
						if (err) rej(err)
					}))


				})
				res(tabDistance)


			})
		}



		const PPT=(tab)=>{
			return new Promise((res,rej)=>{

				var posVilleProche=0
				var ppt=tab[0]
				

				for (var j=0;j<tab.length-1;j++){

					if(ppt>tab[j+1]){
						ppt=tab[j+1]
						posVilleProche=j+1

					}
					

					if (tab[j+1]==tab[tab.length-1]){
						var villePP=WOEIDs[posVilleProche]
						var result=[]
						T.get('/trends/place',{id: villePP.WOEID}, (err,data,response)=>{
							if (err) rej(err) 
							for (var f=0;f<50;f++){ //data[0].length-1

								if(data[0].trends[f]==undefined){
									break
								}
								
								else{
									//console.log(data[0].trends[f].name)
									result.push(new Trend({
										name: data[0].trends[f].name,
										urlTwitter: data[0].trends[f].url
									}))
								}
							}
							res(result)
							callback(result)
							
						})
					}

				}
			})
		}
		lectureBDD ((succ)=>{
			calculDistance(succ).catch(err=>console.error(err)).then(PPT(tabDistance)).catch(er=>{console.log(er)})
		},(rej)=>{
			if (rej) throw rej
		})
		//lectureBDD().then(calculDistance(tabDistance,nfounde)).catch(err=>console.error(err)).then(PPT(tabDistance)).catch(errx=>{console.error(errx)})
	},
}
