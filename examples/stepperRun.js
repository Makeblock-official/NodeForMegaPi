var MegaPi = require("../megapi").MegaPi;
var bot = new MegaPi("/dev/ttyAMA0",onStart);

var level = 1;
function loop(){
  level = 1-level;
console.log(level);
  bot.stepperMotorRun(3,level?2000:-2000);
}
function onStart(){
  bot.stepperMotorRun(3,0);
  setInterval(loop,1000);
}
