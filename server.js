
//make express available
const express = require('express');
//turn on express
const app = express();
//make a server to handle tcp connections & use the app (our express instance) to handle end points (/) and requests
const server = require('http').Server(app);
//make socket.io available
const io = require('socket.io')(server);

//serve out files in our public_html folder
app.use(express.static('public_html'));

let users = io.engine.clientsCount;
let mobileUsers = null;
let pcUsers = null;
let readiedUsers = null;

//socket==client
//io==server
io.on('connection', function(socket){

  //log out the unique identifier for this connection
  console.log(socket.id);
  users = io.engine.clientsCount;
  console.log('users: ' + users);
  io.emit('userNumber', users);

  socket.on('readied', function(yesReady){
    users = io.engine.clientsCount;
    readiedUsers+=yesReady;
    console.log('# of users: ' + users);
    console.log('readied users = ' + readiedUsers);

    if(readiedUsers == users-1 && readiedUsers!=0){
      console.log('all ready');
      io.emit('allReady');
    }

  })

  //message relay
  //listen for a message from any client
  socket.on('makeBleep', function(bleeping){

    io.emit('massBleep', bleeping);

    if(bleeping){
    console.log('bleep');
    }
    else {
      console.log('notbleep');
    }

  });

});


//turn on our server so it can receive requests
server.listen(3000, function(){
  console.log('app is listening on port 3000');
});
