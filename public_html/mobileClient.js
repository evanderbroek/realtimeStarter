let socket = io.connect();

socket.on('endIt', function(){
  location.reload();
})

console.log(window.innerWidth)

//variables
let bleeping = false;
let usedReady = false;
let yesReady = 1;

function awayCover(){
  $('.cover').css({
    'display' : 'none'
  });
}
function delayAwayCover(){
  timeoutID = setTimeout(awayCover, 2001);
}

function awayReady(){
  $('.ready').css({
    'display' : 'none'
  });
}
function delayAwayReady(){
  timeoutID = setTimeout(awayReady, 2001);
}

//when a user hits ready
$('.ready').on('touchstart', function(){
  $('.ready').css({
    'animation-name' : 'fadeAway',
    'animation-duration' : '1s',
    'animation-direction' : 'normal',
    'animation-timing-function' : 'ease-in',
    'animation-fill-mode' : 'forwards',
  });
  if(!usedReady){
  socket.emit('readied', yesReady);
  delayAwayReady();
  usedReady = true;
  }
})

//when all users tell the server they are ready
socket.on('allReady', function(){
  $('.cover').css({
    'animation-name' : 'fadeAway',
    'animation-duration' : '2s',
    'animation-direction' : 'normal',
    'animation-timing-function' : 'ease-in',
    'animation-fill-mode' : 'forwards',
    // 'display' : 'none'
  });
  delayAwayCover();
});

//when a user touches/holds the bleep button
$('.button').on('touchstart',function(event){
  console.log('you clicked the button');

  $('.button').css('background-color' , 'brown')
  // $('html').css('background-color' , 'yellow');

  let bleeping = true;
  console.log(bleeping);
  socket.emit('makeBleep', bleeping);

})

//when a user is not touching/releases the bleep button
$('.button').on('touchend',function(event){
  console.log('you unclicked the button');

  $('.button').css('background-color' , 'crimson');
  // $('html').css('background-color' , 'blue');

  let bleeping = false;
  console.log(bleeping);
  socket.emit('makeBleep', bleeping);

})
