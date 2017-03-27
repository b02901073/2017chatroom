var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var messages = [];
var likes = [];
var usercount = 0;

app.get('/', function(req, res) {
    res.sendfile('chat.html');
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});

io.on('connection', function(socket) {
    console.log("a users connect");
    io.emit('broadcast','Welcome to Ping Chat');
    for (var i = 0; i < messages.length; i++) {
        socket.emit('chat message', messages[i]);
    }

    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
        messages.push(msg);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});
