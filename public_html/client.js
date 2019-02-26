let socket = io.connect();

console.log(window.innerWidth)

if(window.innerWidth<=776){
  console.log('Yo you are mobile.');
  window.location.href = "mobile.html";
}


socket.on('massBleep', function(bleeping){

  if(bleeping){
    console.log('bleep');
    $('html').css('background-color', 'black');
  }
  else if (!bleeping){
    console.log('notbleep');
    $('html').css('background-color', 'white');
  }
});
