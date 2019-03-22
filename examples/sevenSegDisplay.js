var MegaPi = require("../megapi").MegaPi;
var bot = new MegaPi("/dev/ttyAMA0",onStart);

var t = 0.0;
function loop(){
  bot.sevenSegmentDisplay(6,t);
  t+=0.2;
  if(t>99.99){
    t = 0.0;
  }
}
function onStart(){
  setInterval(loop,100);
}
