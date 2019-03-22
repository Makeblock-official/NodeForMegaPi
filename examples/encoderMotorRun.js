var MegaPi = require("../megapi").MegaPi;
var bot = new MegaPi("/dev/ttyAMA0",onStart);

var level = 1;
function loop(){
  level = 1-level;
console.log(level);
  bot.encoderMotorRun(1,level?100:-100);
}
function onStart(){
  bot.encoderMotorRun(1,0);
  setInterval(loop,2000);
}
