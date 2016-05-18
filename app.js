var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var mongodb = require('mongodb');
var mongo = mongodb.MongoClient;

app.use(express.static('images'));
app.use(express.static('materialize'));
app.use('/dist',express.static(__dirname+'/dist'));

app.get('/', function(req, res) {
	res.sendFile(__dirname+'/index.html', function() {
		res.end();
	});
});

app.get('/index', function(req, res) {
	res.sendFile(__dirname+'/index.html', function() {
		res.end();
	});
});

app.get('/about', function(req, res) {
	res.sendFile(__dirname+'/about.html', function() {
		res.end();
	});
});
app.get('/pictures', function(req, res) {
	res.sendFile(__dirname+'/pictures.html', function() {
		res.end();
	});
});

app.get('/news', function(req, res) {
	res.sendFile(__dirname+'/news.html', function() {
		res.end();
	});
});
app.get('/course', function(req, res) {
	res.sendFile(__dirname+'/course.html', function() {
		res.end();
	});
});

app.get('/comments', function(req, res) {
	res.sendFile(__dirname+'/comments.html', function() {
		res.end();
	});
});


app.get('/registration', function(req, res) {
	res.sendFile(__dirname+'/registration.html', function() {
		res.end();
	});
});

app.get('/regist_detail', function(req, res) {
	res.sendFile(__dirname+'/regist_detail.html', function() {
		res.end();
	});
});

app.get('/registration2', function(req, res) {
	res.sendFile(__dirname+'/registration2.html', function() {
		res.end();
	});
});



app.get('/maincss', function(req, res) {
	res.sendFile(__dirname+'/materialize/css/materialize.css', function() {
		res.end();
	});
});

app.get('/sylecss', function(req, res) {
	res.sendFile(__dirname+'/materialize/css/style.css', function() {
		res.end();
	});
});

app.get('/init', function(req, res) {
	res.sendFile(__dirname+'/materialize/js/init.js', function() {
		res.end();
	});
});

io.on('connection',function(socket){
    socket.on('reg q',function(name,birth,id,phone,email,school,fbres){
        mongo.connect('mongodb://db:27017/summer2016',function(err,db){
            if(err){
                throw err;
            }
            db.collection('reg').insert({name:name,birth:birth,id:id,phone:phone,email:email,school:school,fb:fbres});
            socket.emit('reg d');
        })
    })
    socket.on('que q',function(name,email,detail){
        mongo.connect('mongodb://db:27017/summer2016',function(err,db){
            if(err){
                throw err;
            }
            db.collection('que').insert({name:name,email:email,detail:detail});
            socket.emit('que d');
        })
    })
})


server.listen(5555);
