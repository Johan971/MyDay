var http=require('http')
var fs= require("fs")
var express = require("express")
var app=express()
var path=require("path")

//var pathHTML="C:\\Users\\rouxj\\ScriptsJavaScripts\\serveur\\firsto2.html"
var routeur=express.Router() //Routeur qui va diriger vers des pages du site !





app.use("/",express.static(__dirname+"\\public"))


routeur.get("/",(req,res)=>{
	res.sendFile(path.join(__dirname+"\\public"+"\\firsto2.html"))
})

/*
		UNE AUTRE PAGE :
router.get('/about',function(req,res){
  res.sendFile(path.join(__dirname+'/about.html'));
});

*/




app.use("/",routeur)
app.listen(8080)

