var MegaPi = require("../megapi").MegaPi;
var bot = new MegaPi("/dev/ttyAMA0",onStart);

function onFinish1(slot){
  console.log(slot);
  bot.encoderMotorMoveTo(slot,100,0,onFinish2);
}
function onFinish2(slot){
  console.log(slot);
  bot.encoderMotorMoveTo(slot,100,1000,onFinish1);
}
function onStart(){
  onFinish1(1);
}
