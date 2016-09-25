window.addEventListener("resize", resizeCanvas, false);

function resizeCanvas(e) {
  var myCanvas = document.getElementById("circle_canvas");
  var width = document.documentElement.clientWidth;
  var height = document.documentElement.clientHeight;
  myCanvas.width = width;
  myCanvas.height = height;
  circle['x'] = width/2;
  circle['y'] = height*.75;
  circle['radius'] = width/4;//radius is only dependent on width currently
  init();
};

$(document).ready(function(){
  createTime();//call oncce to pre render
  var t = setInterval(createTime,500);
  init();
});

var circle = {
  'x': $(window).width()/2,
  'y': $(window).height()*.75,
  'radius': $(window).width()/4,
  'color': 'yellow',
  'endAngle': 0//in radians
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
  canvas.width = $('#circle_canvas').parent().innerWidth();
  canvas.height = $('#circle_canvas').parent().innerHeight();
  // var width = canvas.width;
  // var height = canvas.height;
  // var gradient = context.createLinearGradient(0,0,width,height);
  // gradient.addColorStop(0,"#01020c");
  // gradient.addColorStop(0.33,"#71c9f1");
  // gradient.addColorStop(0.5,"#FFCD05");
  // gradient.addColorStop(0.66,"#336699");
  // gradient.addColorStop(1,"#01020c");
  // context.fillStyle=gradient;
  // context.fillRect(0,0,width,height);

  render();
  var r = setInterval(render,1000);
  //animate('x',500,1000);
};

var updateArc = function(){
  var date = new Date();
  var currHour = date.getHours();
  var daytime = true;
  if((currHour<6)||(currHour>=18)){
    daytime = false;
    circle["color"] = 'white';
  }
  var secondsInDay = 86400;
  var halfDay = secondsInDay/2;
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  var offset = 6*3600;
  if(!daytime){
    offset = 18*3600;
  }
  var currSeconds = s+(60*m)+(3600*h);
  var ratio = (currSeconds-offset)/halfDay;
  circle.endAngle = (ratio+1)*Math.PI;
  //console.log(circle.endAngle);
};


var render = function(){
  var canvas = $('#circle_canvas').get(0);
  var context=canvas.getContext("2d");
  //draw the canvas circle based on initial start time
  updateArc();
  context.clearRect(0,0,canvas.width, canvas.height);
  context.beginPath();
  context.arc(circle.x, circle.y, circle.radius,Math.PI,circle.endAngle);
  context.lineWidth=15;
  context.strokeStyle = circle.color;
  context.stroke();
  context.beginPath();
  context.arc(circle.x,circle.y,circle.radius,circle.endAngle,0);
  context.lineWidth = 15;
  context.strokeStyle = 'black';
  context.stroke();
  // context.beginPath();
  // context.arc(circle.x, circle.y, circle.radius+20,-Math.PI*.75,-Math.PI*.80, true);
  // context.lineWidth=15;
  // context.strokeStyle = 'green';
  // context.stroke();
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
