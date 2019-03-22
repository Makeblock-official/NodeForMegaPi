var MegaPi = require("../megapi").MegaPi;
var bot = new MegaPi("/dev/ttyAMA0",onStart);
var axisX = 0;
var axisY = 0;
function onReadX(x){
  axisX = x;
  bot.joystickRead(6,2,onReadY);
}

function onReadY(y){
  axisY = y;
  console.log(axisX+":"+axisY);
}
function loop(){
  bot.joystickRead(6,1,onReadX);
}
function onStart(){
  setInterval(loop,300);
}
