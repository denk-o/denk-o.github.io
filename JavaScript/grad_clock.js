$(document).ready(function(){
  createGradient();
});

var circle = {
  'x': 50,
  'y': 50,
  'radius': 100,
  'fill': '#000000'
};
var canvas = $('#gradient_canvas').get(0);
var context = canvas.getContext("2d");

var createGradient = function(){
  var width = canvas.width;
  var height = canvas.height;
  var gradient = context.createLinearGradient(0,0,width,height);
  gradient.addColorStop(0,"#01020c");
  gradient.addColorStop(0.33,"#71c9f1");
  gradient.addColorStop(0.5,"#FFCD05");
  gradient.addColorStop(0.66,"#336699");
  gradient.addColorStop(1,"#01020c");
  context.fillStyle=gradient;
  context.fillRect(0,0,width,height);
  var t = setInterval(createTime,500);
}

var createTime = function(){
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

var checkTime = function(i){
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

var render = function(){
  context.clearRect(0,0,canvas.width, canvas.height);
  context.beginPath();
  context.arc(circle.x, circle.y, circle.radius,0,2*Math.PI);
  context.fillStyle = circle.fill;
  context.fill();
  requestAnimationFram(render);
}

var requestAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function(callback) {
          return setTimeout(callback, 1);
        };
var animate = function(prop, val, duration){

}
