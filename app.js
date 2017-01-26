var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);
var port = process.env.PORT || 8080

app.get("/", function(req, res) {
	console.log("Home");
	res.sendFile(__dirname + '/index.html');
});

// Pega a localização da linha X.
app.get("/busao/:linha", function(req, res) {
	console.log(req.params.linha);
	res.sendFile(__dirname + '/show_position.html');
});

var linha, old_linha,
	localizacao, old_localizacao;

app.get("/busao/:linha/:location", function(req, res) {
	linha = req.params.linha;
	localizacao = req.params.location;

	console.log("Line: " + req.params.linha);
	console.log("Save location: " + req.params.location);
	console.log("Date: " + new Date());
	console.log("------------------------------------------------");

	io.emit('new_position', {'linha': linha, 'localizacao': localizacao});

	// res.sendFile(__dirname + '/get_position.html');	
	res.end();
});



io.on('connection', function(client) {  
    console.log('Client connected...');

    client.on('join', function(data) {
        console.log(data);
        client.emit('messages', 'Hello from server');
    });
});


server.listen(port);  