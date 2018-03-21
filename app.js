// var express = require('express');  
// var app = express();  
// var server = require('http').createServer(app);  
// var io = require('socket.io')(server);

// app.use(express.static(__dirname + '/bower_components'));  
// app.get("/", function(req, res) {
// 	console.log("Home");
// 	res.sendFile(__dirname + '/index.html');
// });

// // Pega a localização da linha X.
// app.get("/busao/:linha", function(req, res) {
// 	console.log(req.params.linha);
// 	res.sendFile(__dirname + '/show_position.html');
// });

// var linha, old_linha,
// 	localizacao, old_localizacao;

// app.get("/busao/:linha/:location", function(req, res) {
// 	linha = req.params.linha;
// 	localizacao = req.params.location;

// 	console.log("Line: " + req.params.linha);
// 	console.log("Save location: " + req.params.location);
// 	console.log("Date: " + new Date());
// 	console.log("------------------------------------------------");

// 	io.emit('new_position', {'linha': linha, 'localizacao': localizacao});

// 	// res.sendFile(__dirname + '/get_position.html');	
// 	res.end();
// });

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on('connection', (socket) => {
	
	socket.on('disconnect', function(){
		io.emit('users-changed', {user: socket.nickname, event: 'left'});   
	});

	socket.on('set-line', (line) => {
		socket.line = line;
		io.emit('line-availables', {line: line, event: 'joined'});    
	});

	socket.on('send-position', (message) => {
		console.log(message);
		io.emit('position', {text: message.text, from: socket.line, created: new Date()});    
	});
});
  
var port = process.env.PORT || 3001;

http.listen(port, function(){
  console.log('listening in http://localhost:' + port);
});
