var express = require('express');
var app = express();
app.disable('x-powered-by');
app.use(express.static(__dirname + '/public'));
app.use(require('body-parser').urlencoded({extended: true}));

var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
var formidable = require('formidable');
var credentials = require('./credentials.js');
app.use(require('cookie-parser')(credentials.cookieSecret));

var mongo = require("mongodb");
var MongoClient = mongo.MongoClient;
var url = process.env.MONGODB_URI;

app.get('/', function (req, res) {
	console.log("home request");
	res.render('home', {csrf: "CSRF token here"});
})

app.use(function(req,res,next){
	console.log("Looking for url: " + req.url);
	next();
})

app.post('/process', function(req, res){
	var score = req.body.score;
	var name = req.body.name;
	console.log(score);
	console.log(name);
	MongoClient.connect(url, function(err,db){
		if (err){
			console.log("Unable to connect to db");
		} else{
			console.log("Connection established");
			var collection = db.collection("scores");
			var user = {name: name, score: score};
			collection.insert([user], function(err,result){
				if (err){
					console.log(err);
				} else{
					res.redirect(303, '/highscores');
				}
			});
			db.close();
		}
	})
})

app.get('/highscores', function(req, res){
	console.log('got request for highscores');
	MongoClient.connect(url, function(err,db){
		if (err){
			console.log("Unable to connect to db");
		} else{
			console.log("Connection established");
			var collection = db.collection("scores");
			collection.find({}).toArray(function(err,result){
				if (err){
					console.log(err);
				} else if (result.length){
					res.render('highscore', {layout: 'static_layout', list: result});
				} else{
					console.log("Not found");
				}
			})
			db.close();
		}
	})
})

app.use(function(req,res){
	res.type("text/html")
	res.status(404);
	res.render("404", {layout: 'static_layout'});
})


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})




