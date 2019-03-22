var MegaPi = require("../megapi").MegaPi;
var bot = new MegaPi("/dev/ttyAMA0",onStart);

var level = 1;
function onFinish1(slot){
  console.log(slot);
  bot.stepperMotorMove(slot,2000,-1000,onFinish2);
}
function onFinish2(slot){
  console.log(slot);
  bot.stepperMotorMove(slot,2000,1000,onFinish1);
}
function onStart(){
  onFinish1(3);
}
