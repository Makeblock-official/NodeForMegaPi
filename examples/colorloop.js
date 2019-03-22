var MegaPi = require("../megapi").MegaPi;
var bot = new MegaPi("/dev/ttyS0", onStart);
var j = 0.0;
var f = 0.0;
var k = 0.0;

var port = 6;
var slot = 2;
var red, green, blue;
function loop() {
  for (var i = 1; i < 16; i++) {
    red = 32 * (1 + Math.sin(((i / 2.0) + (j / 4.0))));
    green = 32 * (1 + Math.sin(((i / 1.0) + (f / 9.0) + 2.1)));
    blue = 32 * (1 + Math.sin(((i / 3.0) + (k / 14.0) + 4.2)));
    bot.rgbledDisplay(port, slot, i, red, green, blue);
  }
  j += Math.random();
  f += Math.random();
  k += Math.random();
  bot.rgbledShow(port, slot);
}
function onStart() {
  bot.rgbledDisplay(port, slot, 0, 0, 0, 0);
  bot.rgbledShow(port, slot);
  setInterval(loop, 40);
}
