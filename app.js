var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var mongodb = require('mongodb');
var mongo = mongodb.MongoClient;

var config = require('./config.json');

var when;

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


/*app.get('/registration', function(req, res) {
	res.sendFile(__dirname+'/registration.html', function() {
		res.end();
	});
});*/

app.get('/regist_detail', function(req, res) {
	res.sendFile(__dirname+'/regist_detail.html', function() {
		res.end();
	});
});

app.get('/jizz', function(req, res) {
	res.sendFile(__dirname+'/jizz.html', function() {
		res.end();
	});
});


app.get('/back', function(req, res) {
	res.sendFile(__dirname+'/back.html', function() {
		res.end();
	});
});

app.get('/console', function(req, res) {
	res.sendFile(__dirname+'/console.html', function() {
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

setInterval(function() {
    var month = new Date().getMonth()+1;
    var now = new Date().getFullYear().toString()+"-"+month.toString()+"-"+new Date().getDate().toString()+" ";
    if(new Date().getHours()<10){var nnow=now+"0"+new Date().getHours().toString()+":";}
        else{var nnow=now+new Date().getHours().toString()+":";}
    if(new Date().getMinutes()<10){var nnnow=nnow+"0"+new Date().getMinutes().toString()+":";}
        else{var nnnow=nnow+new Date().getMinutes().toString()+":";}
    if(new Date().getSeconds()<10){var nnnnow=nnnow+"0"+new Date().getSeconds().toString();}
        else{var nnnnow=nnnow+new Date().getSeconds().toString();}
    when = nnnnow;
  }, 1000);


io.on('connection',function(socket){
    socket.on('reg q',function(name,birth,id,phone,email,school,fbres,emername,emertel,eat,size,ps,date){
        if(!(name==""||birth==""||id==""||phone==""||email==""||school==""||emername=="" || emertel=="" || eat=="" || size=="")){
            var idns = id.substring(1,id.length);
            var idn = parseInt(idns);
            var ida = id.substring(0,1);
            var idan = parseInt(ida);
            var phonen = parseInt(phone);
            var emerteln = parseInt(emertel);
            if(isNaN(idan) && idn>100000000 && idn<299999999 && !isNaN(phonen) && !isNaN(emerteln)){
                mongo.connect('mongodb://db:27017/summer2016',function(err,db){
                    if(err){
                        throw err;
                    }
                    
                    var obj = {time:when,name:name,birth:birth,id:id,phone:phone,email:email,school:school,fb:fbres,emername:emername,emertel:emertel,eat:eat,size:size,ps:ps,date:date};
                    for(var ele in obj){
                        if(ele==name||ele==birth||ele==id||ele==phone||ele==email||ele==school||ele==fbres||ele==emername||ele==emertel||ele==eat||ele==size||ele==ps){
                            obj[ele]=obj[ele].replace(/&/g,"&amp;");
                            obj[ele]=obj[ele].replace(/</g,"&lt;");
                            obj[ele]=obj[ele].replace(/>/g,"&gt;");
                        }
                    }


                    db.collection('reg').insert(obj);
                    socket.emit('reg d');
                })
            }
            else{
                socket.emit("reg f");
            }
        }
        else{
            socket.emit("reg f");
        }
    })
    socket.on('que q',function(name,email,detail){
        mongo.connect('mongodb://db:27017/summer2016',function(err,db){
            if(err){
                throw err;
            }
            
            var obj = {name:name,email:email,detail:detail};
            for(var ele in obj){
                obj[ele]=obj[ele].replace(/&/g,"&amp;");
                obj[ele]=obj[ele].replace(/</g,"&lt;");
                obj[ele]=obj[ele].replace(/>/g,"&gt;");
            }
            db.collection('que').insert(obj);
            socket.emit('que d');
        })
    })
    socket.on('mongo q',function(pw){
        if(pw==config.pass){
            mongo.connect('mongodb://db:27017/summer2016',function(err,db){
                if(err){
                    throw err;
                }
                var res1,res2;
                db.collection('reg').find({},{_id:0},function(err,res){
                    res.toArray(function(err,res){
                        if(err){
                            throw err;
                        }
                        res1=Object(res);
                        db.collection('que').find({},{_id:0},function(err,res){
                            res.toArray(function(err,res){
                                if(err){
                                    throw err;
                                }
                                res2=Object(res);
                                socket.emit('mongo d',res1,res2);
                            })
                        })
                    })
                })
            })
        }
    })
})


server.listen(5555);
