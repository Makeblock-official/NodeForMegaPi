var MegaPi = require("../megapi").MegaPi;
var bot = new MegaPi("/dev/ttyAMA0",onStart);

function onRead(value){
  console.log(value);
}
function loop(){
  bot.potentiometerRead(6,onRead);
}
function onStart(){
  setInterval(loop,100);
}
