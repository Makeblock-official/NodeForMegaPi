var MegaPi = require("../megapi").MegaPi;
var bot = new MegaPi("/dev/ttyAMA0",onStart);

function onStart(){
  setTimeout(loop,500);
}
var level = 0;
function loop(){
  bot.digitalWrite(13, level);
  level = 1-level;
  setTimeout(loop,500);
}
