// Modules
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var net = require('net');
var morgan = require('morgan')

// Variables
app.use(express.static(__dirname + '/public'));
var chatscriptBot = "heckler";
var appport = process.env.PORT || 3000;
var chatscriptConfig = {
	port: 1337,
	host: '167.160.163.209'
};
var chatScriptOnline = true;

// Routes
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

// Logging
app.use(morgan('combined'))

// Test the connection and if 200, reset 
function initiateChatscript(config) {
	var csTest = net.createConnection(config, function() {
		// console.log('chatscript is alive');
		csTest.write(csTest.localAddress + '\x00' + chatscriptBot + '\x00' + ':reset' + '\x00');
		csTest.on('error', function(err) {
			chatScriptOnline = false;
			// console.log('chatscript is dead');
			io.emit('send_msg', 'sorry but cs is closed :('); // to browser
		});
		csTest.on('data', function(data) {
			io.emit('send_msg', data.toString()); // to browser
		});
		csTest.destroy();
	});
}

// Sockets events
io.on('connection', function(browserSocket) {
	// initiateChatscript(chatscriptConfig);
	// console.log('browserSocket opened');
	browserSocket.on('send_msg', function(msg) {
		var chatscriptSocket = net.createConnection(chatscriptConfig, function() {
			// console.log('chatscriptSocket opened');
			chatscriptSocket.on('data', function(data) {
				// console.log('chatscriptSocket received data');
				io.emit('send_msg', data.toString()); // to browser
				chatscriptSocket.destroy();
			});
			chatscriptSocket.on('end', function() {
				// console.log('chatscriptSocket end');
			});
			chatscriptSocket.on('error', function(err) {
				// console.log('chatscriptSocket error: ' + err + ' ' + chatscriptSocket.address()[1]);
			});
			chatscriptSocket.on('close', function() {
				// console.log('chatscriptSocket close');
			});
		});
		// console.log('browserSocket send_msg');
		payload = chatscriptSocket.localAddress + '\x00' + chatscriptBot + '\x00' + msg + '\x00';
		chatscriptSocket.write(payload);
	});
	browserSocket.on('disconnect', function() {
		// console.log('browserSocket disconnect');
	});
});

// Start http server on port 3000
http.listen(appport, function() {
	console.log('listening on', appport);
});