var MegaPi = require("../megapi").MegaPi;
var bot = new MegaPi(onStart);

function onRead(value){
  console.log("Temperature:"+value);
}
function loop(){
  bot.temperatureRead(6,2,onRead);
}
function onStart(){
  setInterval(loop,100);
}