
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


//socket==client
//io==server
io.on('connection', function(socket){

  //log out the unique identifier for this connection
  console.log(socket.id);

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
