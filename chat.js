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
    for (var i = 1; i < messages.length; i++) {
        console.log(i);
        var now = i;
        while (likes[now] > likes[now - 1] && now > 0) {
            console.log("change");
            var tempmes = messages[now];
            var templike = likes[now];
            likes[now] = likes[now - 1];
            messages[now] = messages[now - 1];
            likes[now - 1] = templike;
            messages[now - 1] = tempmes;
            now--;
        }

    }

    for (var i = 0; i < messages.length; i++) {
        socket.emit('chat message', messages[i]);
    }

    for (var i = 0; i < messages.length; i++) {
        var count = likes[i];
        while (count > 0) {
            socket.emit('like', i);
            count--;
        }
    }


    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
        messages.push(msg);
        likes.push(0);
    });

    socket.on('like', function(aaa) {
        io.emit('like', aaa);
        //console.log(aaa);
        likes[aaa]++;
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
    /*
       socket.on('change', function(change){
        io.emit('change' , change);
      });

       socket.on('switch', function(bbb){
        io.emit('switch' , bbb);
      });*/
});
