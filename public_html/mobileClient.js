let socket = io.connect();

console.log(window.innerWidth)

let bleeping = false;

$('.button').on('touchstart',function(event){
  console.log('you clicked the button');

  $('.button').css('background-color' , 'red')
  $('html').css('background-color' , 'yellow');

  let bleeping = true;
  console.log(bleeping);
  socket.emit('makeBleep', bleeping);

})

$('.button').on('touchend',function(event){
  console.log('you unclicked the button');

  $('.button').css('background-color' , 'green');
  $('html').css('background-color' , 'blue');

  let bleeping = false;
  console.log(bleeping);
  socket.emit('makeBleep', bleeping);

})
