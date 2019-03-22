var MegaPi = require("../megapi").MegaPi;
var bot = new MegaPi("/dev/ttyAMA0",onStart);

function onReadHumiture(hum){
  console.log("Humiture:"+hum+"%");
  bot.humitureSensorRead(6,1,onReadTemperature);
}

function onReadTemperature(temp){
  console.log("Temperature:"+temp+" C");
}
function loop(){
  bot.humitureSensorRead(6,0,onReadHumiture);
}
function onStart(){
  setInterval(loop,1000);
}
