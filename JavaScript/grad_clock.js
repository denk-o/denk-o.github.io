$(document).ready(function(){
  createGradient();
});

function createGradient(){
  var canvas = $('#gradient_canvas').get(0);
  var context = canvas.getContext("2d");
  var t = setInterval(createTime,500);
  
}

function createTime(){
  var now = new Date();
  var h = now.getHours();
  var m = now.getMinutes();
  var s = now.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  var time = h+":"+m+":"+s;
  $('.time').text(time);
  return time;
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
