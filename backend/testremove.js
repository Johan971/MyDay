//Library
const mongoose = require("mongoose");
const connectDb = require("./connectDb"); // Database connection module
const DailyWeather = require("./models/DailyWeather"); // Models
const insert = require("./insert") // Database insert module
const remove = require("./remove") // Database insert module



module.exports= function(model, newObj, dbName, filter={}){ // filter have to select one obj
	
	connectDb("mongodb://localhost:27017/"+dbName)
	if (filter=={}){
		console.log("Rien à remplacer, filtre vide.")
		mongoose.disconnect()

	}
	else{
		model.deleteOne(filter, (err,doc)=>{ 
		    
		    if(err) throw err // error handling

		    else if (doc){
		    	console.log("on essaie de save") //BUG APRES 
		    	newObj.save(erro=>{
		    		if(erro) throw erro // error handling
		    		console.log("Document inseré!")
		    		mongoose.disconnect() // disconnect connection from database once document is saved

		    	})
		    }
		    else{
		    	console.log("Pas de correspondance")
		    }
		    
		});
	}


}