let socket = io.connect();
var bleep = document.getElementById("myAudio");
var video = document.getElementById("myVideo");
var usersOnline = null;
let mobile, pc = 1;

document.getElementById("myAudio").muted = true;

//check if device is mobile or desktop
console.log(window.innerWidth)

if(window.innerWidth<=776){
  console.log('Yo you are mobile.');
  socket.emit('mobileUser', mobile);
  window.location.href = "mobile.html";
}
else{
  console.log('Hey its desktop');
  socket.emit('pcUser', pc);
  $('.video').html('<video id="myVideo" width="1000" height="auto" src="media/Curtis_Ethan_Tristen_Minnesota_Goodbye.mp4"></video>');
}

//once all mobile devices are ready:
socket.on('allReady', function(){
  $('.cover').css({
    'animation-name' : 'fadeAway',
    'animation-duration' : '2s',
    'animation-direction' : 'normal',
    'animation-timing-function' : 'ease-in',
    'animation-fill-mode' : 'forwards',
    // 'display' : 'none'
  });

  bleep.play();

  function delayAway(){
    timeoutID = setTimeout(away, 2500);
  }
  function away(){
    $('.cover').css({
      'display' : 'none'
    });
  }

  delayAway();

  function delayVideo(){
    timeoutID = setTimeout(playVideo, 5000)
  }
  function playVideo(){
    document.getElementById("myVideo").play();
  }

  delayVideo();

});

//log out how many users are online
socket.on('userNumber', function(users){
  usersOnline = users;

  console.log(usersOnline);
})

//bleep the video
socket.on('massBleep', function(bleeping){

  if(bleeping){
    console.log('bleep');
    $('html').css('background-color', 'red');
    document.getElementById("myAudio").muted = false;
    document.getElementById("myVideo").muted = true;
    // $('#myAudio').play();
    // $('#myVideo').play();

      console.log($('video').get(0).currentTime)

  }
  else if (!bleeping){
    console.log('notbleep');
    $('html').css('background-color', 'black');
    document.getElementById("myAudio").muted = true;
    document.getElementById("myVideo").muted = false;
  }
});
