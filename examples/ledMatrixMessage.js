var MegaPi = require("../megapi").MegaPi;
var bot = new MegaPi("/dev/ttyAMA0",onStart);

var t = 16;
function loop(){
  bot.ledMatrixMessage(6,t,0,"Hello World");
  t-=1;
  if(t<-68){
    t = 16;
  }
}
function onStart(){
  bot.ledMatrixMessage(6,t,0,"Hello World");
  setInterval(loop,100);
}
