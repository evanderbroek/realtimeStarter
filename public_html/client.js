let socket = io.connect();

$('body').on('click', function(event){

  //what's the mouse's position on the page
  console.log(event.clientX, event.clientY);

  //a JSON item package:
  $('<div>😐</div>').css({
    'position' : 'absolute',
    'top' : event.clientY,
    'left' : event.clientX,
  }).appendTo('body');

  let mouseDataToSend = {
    'top' : event.clientY,
    'left' : event.clientX,
  }

console.log(mouseDataToSend);

//send the mouse data up to the server so it can relay it to all users
socket.emit('addEmoji', mouseDataToSend);

//listen for incoming messages and react to them using the mouse data that was sent down from the server from any other client out there.
socket.on('massSendEmoji', function(receivedMouseData){

  $('<div>😐</div>').css({
    'position' : 'absolute',
    'top' : receivedMouseData.top,
    'left' : receivedMouseData.left
  }).appendTo('body');

})


});
