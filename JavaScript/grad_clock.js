$(document).ready(function(){
  createTime();//call oncce to pre render
  var t = setInterval(createTime,500);
  init();
});

var circle = {
  'x': 110,
  'y': 750,
  'radius': 100,
  'fill': 'yellow'
};

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
};

var checkTime = function(i){
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
};

var init = function(){
  var canvas = $('#circle_canvas').get(0);
  var context = canvas.getContext("2d");
  canvas.width = $('#circle_canvas').parent().width();
  canvas.height = $('#circle_canvas').parent().height();
  var width = canvas.width;
  var height = canvas.height;
  // var gradient = context.createLinearGradient(0,0,width,height);
  // gradient.addColorStop(0,"#01020c");
  // gradient.addColorStop(0.33,"#71c9f1");
  // gradient.addColorStop(0.5,"#FFCD05");
  // gradient.addColorStop(0.66,"#336699");
  // gradient.addColorStop(1,"#01020c");
  // context.fillStyle=gradient;
  // context.fillRect(0,0,width,height);
  render();
  //animate('x',0,1000);
};


var render = function(){
  var canvas = $('#circle_canvas').get(0);
  var context=canvas.getContext("2d");
  //draw the canvas circle based on initial start time
  context.clearRect(0,0,canvas.width, canvas.height);
  context.beginPath();
  context.arc(circle.x, circle.y, circle.radius,0,2*Math.PI);
  context.fillStyle = circle.fill;
  //context.stroke();
  context.fill();
  //requestAnimationFrame(render);
};

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
  var start = new Date().getTime();
  var end = start+duration;
  var current = circle[prop];
  var distance = val-current;
  var step = function(){
    var timestamp = new Date().getTime();
    var progress = Math.min((duration-(end-timestamp))/duration, 1);
    circle[prop] = current + (distance*progress);
    if(progress<1) requestAnimationFrame(step);
  };
  return step();
};
