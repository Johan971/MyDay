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
//console.log(__dirname)
//app.use(express.static)
app.get("/",(req,res)=>{

	
	res.sendFile(path.join(__dirname+"\\public"+"\\firsto2.html"))

})


*/
app.use("/",routeur)
app.listen(8080)

