//Library
const mongoose = require("mongoose");
const connectDb = require("./connectDb"); // Database connection module
const DailyWeather = require("./models/DailyWeather"); // Models
//const insert = require("./insert") // Database insert module
const util = require("util")


const remove = (model,filter) => new Promise ((succ,rej)=>{
	model.deleteOne(filter,(err,doc)=>{
		if (err) return rej(err)
		else if (doc){
			console.log("Document supprimé!");
			return succ()
		}
		else{
			return rej(console.log("Pas de correspondance"));

		}
		})
})


const insert = (newObj) => new Promise ((succ,rej)=>{
	newObj.save(err => {
		console.log("Essai sauvegarde")
		if (err) return rej(err)
			else{
				console.log("Réussite")
				return succ()
			}
		})
})



module.exports= function(model, newObj, dbName, filter={}){ // filter have to select one obj
	
	connectDb("mongodb://localhost:27017/"+dbName)
	if (filter=={}){
		console.log("Rien à remplacer, filtre vide.");
		mongoose.disconnect();
	}

	else{
		remove(model, filter)
		.then(insert(newObj), mongoose.disconnect()).catch(console.error);
	}

}