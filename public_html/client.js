let socket = io.connect();
var bleep = document.getElementById("myAudio");
var video = document.getElementById("myVideo");
var vidLength = 75.114667;
var usersOnline = null;
let mobile, pc = 1;
let currentTC = 0;

document.getElementById("myAudio").muted = true;

socket.on('endIt', function(){
  location.reload();
})

//check if device is mobile or desktop
console.log(window.innerWidth)

if($('video').get(0).currentTime > 0 && $('video').get(0).currentTime < 115.157333){

  window.location.href = "queue.html";

}

if(window.innerWidth<=776){
  console.log('Yo you are mobile.');
  socket.emit('mobileUser', mobile);
  window.location.href = "mobile.html";
}
else{
  console.log('Hey its desktop');
  socket.emit('pcUser', pc);
  $('.video').html('<video id="myVideo" width="1000" height="auto" src="media/Bleep_720p.mp4"></video>');
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
    setInterval(function(){
      console.log($('video').get(0).currentTime);

      currentTC = $('video').get(0).currentTime;

      socket.emit('tc', currentTC)

      if($('video').get(0).currentTime==75.114667){
        socket.emit('end');
        }


    }, 1000);
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
