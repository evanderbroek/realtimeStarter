
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
let usersBleeping = 0;

let inQueue = null;
let playback = false;

//socket==client
//io==server
io.on('connection', function(socket){

  //log out the unique identifier for this connection
  console.log(socket.id);
  users = io.engine.clientsCount;
  console.log('users: ' + users);
  io.emit('userNumber', users);

  if(mobileUsers < 1){
    io.emit('empty');
  }

  io.on('pcUser', function(pc){
    pcUsers+=pc;
  })

  io.on('mobileUser', function(mobile){
    mobileUsers+=mobile;
  })

  io.on('tc', function(currentTC){
    io.emit('timeCode', currentTC);
  })

  io.on('playing', function(playing){
    if(playing){
      playback = true;
      console.log('playback is true');
    }
    else{
      playback = false;
      console.log('playback is true');
    }

    io.emit('playback', playback);
  })


  //determine when all users are ready
  socket.on('readied', function(yesReady){
    users = io.engine.clientsCount;
    readiedUsers+=yesReady;
    console.log('# of users: ' + users);
    console.log('readied users = ' + readiedUsers);

    if(readiedUsers == users-1 && readiedUsers!=0){
      console.log('all ready');
      io.emit('allReady');
      io.emit('start');
      inQueue = true;
    }

  })

  //message relay
  //listen for a message from any client
  socket.on('makeBleep', function(bleeping){

//communicate whether someone is bleeping or not.
    if(bleeping){
      usersBleeping += 1;
      console.log('bleep');
      console.log(usersBleeping);
    }
    else {
      usersBleeping -= 1;
      console.log('notbleep');
      console.log(usersBleeping);
    }

//This makes it so people can bleep over each other.
    if(bleeping && usersBleeping > 0){
      io.emit('massBleep', bleeping);
    }
    else if(!bleeping && usersBleeping > 0){
      io.emit('massBleep', !bleeping);}
    else if(bleeping && usersBleeping == 0){
      console.log("ERROR!");
    }
    else {
      this.bleeping = false;
      io.emit('massBleep', bleeping);
    }

  });

  socket.on('end', function(){
    readiedUsers = 0;
    inQueue = false;
    io.emit('endIt');
  })
});

let port = process.env.PORT || 3000 ;

//turn on our server so it can receive requests
server.listen(port, function(){
  console.log('app is listening on port 3000');
});
