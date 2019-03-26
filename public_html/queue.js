let socket = io.connect();

socket.on('timeCode', function(currentTC){
  $('h1').text(currentTC);
})

socket.on('endIt'){
  window.location.href = "mobile.html";
}
