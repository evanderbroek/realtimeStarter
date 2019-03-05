let socket = io.connect();

console.log(window.innerWidth)

let bleeping = false;
let usedReady = false;
let yesReady = 1;

function delayAwayCover(){
  timeoutID = setTimeout(awayCover, 2001);
}

function awayCover(){
  $('.cover').css({
    'display' : 'none'
  });
}

function delayAwayReady(){
  timeoutID = setTimeout(awayReady, 2001);
}

function awayReady(){
  $('.ready').css({
    'display' : 'none'
  });
}


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
