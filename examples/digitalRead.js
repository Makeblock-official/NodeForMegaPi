var MegaPi = require("../megapi").MegaPi;
var bot = new MegaPi("/dev/ttyAMA0",onStart);

function onRead(level){
  console.log("onRead:"+level);
}

function loop(){
  bot.digitalRead(7,onRead);
  setTimeout(loop,100);
}
function onStart(){
  setTimeout(loop,100);
}
