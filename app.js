var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var net = require('net')

var chatscriptConfig = {port: 1337, host: '167.160.163.209', allowHalfOpen: true}
var chatscriptBot = "Harry"

app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) { // Serve '/index.html' to all GET request to /
	// res.send("<h1>What's up worldz?</h1>")
	res.sendFile(__dirname + '/index.html')
})

io.on('connection', function(socket){ // Listening to events
	console.log('user connected')
	socket.on('disconnect', function() {
		console.log('user disconnected')
	})
	socket.on('send_msg', function(msg) {
		var chatscriptSocket = net.createConnection(chatscriptConfig, function(){
			payload = 'guest'+'\x00'+chatscriptBot+'\x00'+msg+'\x00'
			chatscriptSocket.write(payload)
			// console.log('send_msg')
		})
		chatscriptSocket.on('data', function(data) {
			console.log(data.toString());
			io.emit('send_msg', data.toString()); // FROM SERVER
		})
		chatscriptSocket.on('end', function() {
			// console.log('disconnected from server');
		})
		chatscriptSocket.on('error', function(err) {
			console.log('error from server ' + err +' '+ chatscriptSocket.address()[1]);
		})

	})
})

http.listen(3000, function() {
	console.log('listening on *:3000')
})