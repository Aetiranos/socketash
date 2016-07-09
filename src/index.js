var express = require('express'), 
    app = express(),
    socketash = require('./socketash'),
    server = require('http').Server(app),
    io = require('socket.io')(server)
    Socketash = new socketash(io);



io.on('connection',function(socket) {
    console.log('connected');
    socket.on('test1',function() {
        console.log(data);
    });
});

server.listen(2017, function() {
    console.log('Server started on port 2017');
    io.emit('test1',{data1:"test1",data2:"test2"});
});