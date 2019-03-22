'use strict';

var SerialPort = require("serialport").SerialPort
var serialPort;
var buffer = [];
var selectors = {};
var isOpen = false;
var isParseStart = false;
var isParseStartIndex;
var self;
function MegaPi() {
  self = this;
  var port = (arguments[0] && (typeof arguments[0] == "string")) ? arguments[0] : "/dev/ttyS0";
  var onStart = (arguments[0] && (typeof arguments[0] != "string")) ? arguments[0] : (arguments[1] ? arguments[1] : function () { });
  serialPort = new SerialPort(port, {
    baudrate: 115200
  });
  serialPort.on("open", function () {
    isOpen = true;
    if (onStart) {
      onStart();
    }
    serialPort.on('data', function (data) {
      var readBuffer = new Uint8Array(data);
      for (var i = 0; i < readBuffer.length; i++) {
        buffer.push(readBuffer[i]);
        var len = buffer.length;
        if (len >= 2) {
          if (buffer[len - 1] == 0x55 && buffer[len - 2] == 0xff) {
            isParseStart = true;
            isParseStartIndex = len - 2;
          }
          if (buffer[len - 1] == 0xa && buffer[len - 2] == 0xd && isParseStart == true) {
            isParseStart = false;
            var position = isParseStartIndex + 2;
            var extId = buffer[position];
            position += 1;
            var type = buffer[position];
            var value = 0;
            position += 1;//# 1 byte 2 float 3 short 4 len+string 5 double 6 long

            switch (type) {
              case 1:
                value = buffer[position];
                break;
              case 2:
                value = getFloatFromBytes([buffer[position], buffer[position + 1], buffer[position + 2], buffer[position + 3]]);
                break;
              case 3:
                value = getShortFromBytes([buffer[position], buffer[position + 1]]);
                break;
              case 6:
                value = getLongFromBytes([buffer[position], buffer[position + 1], buffer[position + 2], buffer[position + 3]]);
                break;
            }
            if (type <= 6) {
              responseValue(extId, value);
            }
            buffer = [];
          }
        }
      }
    });
  });
}
MegaPi.prototype.megapi = function () {

}
function onResult(err, results) {
  //console.log(err,results);
}
function responseValue(extId, value) {
  if (selectors["callback_" + extId]) {
    selectors["callback_" + extId](value);
  }
}
function write(buffer) {
  if (isOpen) {
    var buf = new Buffer([0xff, 0x55, buffer.length + 1].concat(buffer).concat([0xa]));
    serialPort.write(buf, onResult);
  }
}
MegaPi.prototype.digitalWrite = function (pin, level) {
  var id = 0;
  var action = 2;
  var device = 0x1e;
  write([id, action, device, pin, level]);
}
MegaPi.prototype.pwmWrite = function (pin, pwm) {
  var id = 0;
  var action = 2;
  var device = 0x20;
  write([id, action, device, pin, pwm]);
}
MegaPi.prototype.digitalRead = function (pin, callback) {
  var id = pin;
  var action = 1;
  var device = 0x1e;
  selectors["callback_" + id] = callback;
  write([id, action, device, pin]);
}
MegaPi.prototype.analogRead = function (pin, callback) {
  var id = pin + 54;
  var action = 1;
  var device = 0x1f;
  selectors["callback_" + id] = callback;
  write([id, action, device, pin + 54]);
}
MegaPi.prototype.ultrasonicSensorRead = function (port, callback) {
  var action = 1;
  var device = 1;
  var id = ((port << 4) + device) & 0xff;
  selectors["callback_" + id] = callback;
  write([id, action, device, port]);
}
MegaPi.prototype.lightSensorRead = function (port, callback) {
  var action = 1;
  var device = 3;
  var id = ((port << 4) + device) & 0xff;
  selectors["callback_" + id] = callback;
  write([id, action, device, port]);
}
MegaPi.prototype.soundSensorRead = function (port, callback) {
  var action = 1;
  var device = 7;
  var id = ((port << 4) + device) & 0xff;
  selectors["callback_" + id] = callback;
  write([id, action, device, port]);
}
MegaPi.prototype.pirMotionSensorRead = function (port, callback) {
  var action = 1;
  var device = 15;
  var id = ((port << 4) + device) & 0xff;
  selectors["callback_" + id] = callback;
  write([id, action, device, port]);
}
MegaPi.prototype.potentiometerRead = function (port, callback) {
  var action = 1;
  var device = 4;
  var id = ((port << 4) + device) & 0xff;
  selectors["callback_" + id] = callback;
  write([id, action, device, port]);
}
MegaPi.prototype.lineFollowerRead = function (port, callback) {
  var action = 1;
  var device = 17;
  var id = ((port << 4) + device) & 0xff;
  selectors["callback_" + id] = callback;
  write([id, action, device, port]);
}
MegaPi.prototype.limitSwitchRead = function (port, callback) {
  var action = 1;
  var device = 21;
  var id = ((port << 4) + device) & 0xff;
  selectors["callback_" + id] = callback;
  write([id, action, device, port]);
}
MegaPi.prototype.temperatureRead = function (port, slot, callback) {
  var action = 1;
  var device = 2;
  var id = ((port << 4) + device) & 0xff;
  selectors["callback_" + id] = callback;
  write([id, action, device, port, slot]);
}
MegaPi.prototype.touchSensorRead = function (port, callback) {
  var action = 1;
  var device = 15;
  var id = ((port << 4) + device) & 0xff;
  selectors["callback_" + id] = callback;
  write([id, action, device, port]);
}
MegaPi.prototype.humitureSensorRead = function (port, type, callback) {
  var action = 1;
  var device = 23;
  var id = ((port << 4) + device) & 0xff;
  selectors["callback_" + id] = callback;
  write([id, action, device, port, type]);
}
MegaPi.prototype.joystickRead = function (port, axis, callback) {
  var action = 1;
  var device = 5;
  var id = ((port << 4) + device) & 0xff;
  selectors["callback_" + id] = callback;
  write([id, action, device, port, axis]);
}
MegaPi.prototype.gasSensorRead = function (port, callback) {
  var action = 1;
  var device = 25;
  var id = ((port << 4) + device) & 0xff;
  selectors["callback_" + id] = callback;
  write([id, action, device, port]);
}
MegaPi.prototype.buttonRead = function (port, callback) {
  var action = 1;
  var device = 22;
  var id = ((port << 4) + device) & 0xff;
  selectors["callback_" + id] = callback;
  write([id, action, device, port]);
}
MegaPi.prototype.gyroRead = function (port, axis, callback) {
  var action = 1;
  var device = 6;
  var id = ((port + axis << 4) + device) & 0xff;
  selectors["callback_" + id] = callback;
  write([id, action, device, port, axis]);
}
MegaPi.prototype.dcMotorRun = function (port, speed) {
  var id = 0;
  var action = 2;
  var device = 0xa;
  var spd = getBytesFromShort(speed);
  write([id, action, device, port].concat(spd));
}
MegaPi.prototype.dcMotorStop = function (port) {
  self.dcMotorRun(port, 0);
}
MegaPi.prototype.servoRun = function (port, slot, angle) {
  var id = 0;
  var action = 2;
  var device = 11;
  write([id, action, device, port, slot, angle]);
}
MegaPi.prototype.encoderMotorRun = function (slot, speed) {
  var id = 0;
  var action = 2;
  var device = 61;
  var spd = getBytesFromShort(speed);
  write([id, action, device, 0, slot, 1].concat(spd));
}
MegaPi.prototype.encoderMotorMove = function (slot, speed, distance, callback) {
  var action = 2;
  var device = 61;
  var spd = getBytesFromShort(speed);
  var dist = getBytesFromLong(distance);
  var id = ((slot << 4) + device) & 0xff;
  selectors["callback_" + id] = callback;
  write([id, action, device, 0, slot, 2].concat(spd).concat(dist));
}
MegaPi.prototype.encoderMotorMoveTo = function (slot, speed, position, callback) {
  var action = 2;
  var device = 61;
  var spd = getBytesFromShort(speed);
  var pst = getBytesFromLong(position);
  var id = ((slot << 4) + device) & 0xff;
  selectors["callback_" + id] = callback;
  write([id, action, device, 0, slot, 3].concat(spd).concat(pst));
}
MegaPi.prototype.encoderMotorPosition = function (slot, callback) {
  var id = 0;
  var action = 1;
  var device = 61;
  var id = (((slot + action) << 4) + device) & 0xff;
  selectors["callback_" + id] = callback;
  write([id, action, device, 0, slot, 1]);
}
MegaPi.prototype.encoderMotorSpeed = function (slot, callback) {
  var id = 0;
  var action = 1;
  var device = 61;
  var id = (((slot + action) << 4) + device) & 0xff;
  selectors["callback_" + id] = callback;
  write([id, action, device, 0, slot, 2]);
}

MegaPi.prototype.stepperMotorRun = function (port, speed) {
  var id = 0;
  var action = 2;
  var device = 62;
  var spd = getBytesFromShort(speed);
  write([id, action, device, port, 1].concat(spd));
}
MegaPi.prototype.stepperMotorMove = function (port, speed, distance, callback) {
  var action = 2;
  var device = 62;
  var spd = getBytesFromShort(speed);
  var dist = getBytesFromLong(distance);
  var id = ((port << 4) + device) & 0xff;
  selectors["callback_" + id] = callback;
  write([id, action, device, port, 2].concat(spd).concat(dist));
}
MegaPi.prototype.stepperMotorMoveTo = function (port, speed, position, callback) {
  var action = 2;
  var device = 62;
  var spd = getBytesFromShort(speed);
  var pst = getBytesFromLong(position);
  var id = ((port << 4) + device) & 0xff;
  selectors["callback_" + id] = callback;
  write([id, action, device, port, 3].concat(spd).concat(pst));
}
MegaPi.prototype.stepperMotorSetting = function (port, microsteps, acceleration) {
  var action = 2;
  var device = 62;
  var acc = getBytesFromShort(acceleration);
  var id = 0;
  write([id, action, device, port, 4, microsteps].concat(acc));
}
MegaPi.prototype.stepperMotorPosition = function (port, callback) {
  var id = 0;
  var action = 1;
  var device = 62;
  var id = (((port + action) << 4) + device) & 0xff;
  selectors["callback_" + id] = callback;
  write([id, action, device, port, 1]);
}
MegaPi.prototype.stepperMotorSpeed = function (port, callback) {
  var id = 0;
  var action = 1;
  var device = 62;
  var id = (((port + action) << 4) + device) & 0xff;
  selectors["callback_" + id] = callback;
  write([id, action, device, port, 2]);
}

MegaPi.prototype.rgbledDisplay = function (port, slot, index, red, green, blue) {
  var id = 0;
  var action = 2;
  var device = 8;
  write([id, action, device, port, slot, index, parseInt(red), parseInt(green), parseInt(blue)]);
}
MegaPi.prototype.rgbledShow = function (port, slot) {
  var id = 0;
  var action = 2;
  var device = 8;
  write([id, action, device, port, slot]);
}
MegaPi.prototype.sevenSegmentDisplay = function (port, value) {
  var id = 0;
  var action = 2;
  var device = 9;
  var v = getBytesFromFloat(value);
  write([id, action, device, port].concat(v));
}
MegaPi.prototype.ledMatrixMessage = function (port, x, y, message) {
  var id = 0;
  var action = 2;
  var device = 41;
  var msg = [];
  for (var i = 0; i < message.length; i++) {
    msg[i] = message.charCodeAt(i);
  }
  msg.push(0);
  write([id, action, device, port, 1, x, 7 - y, message.length + 1].concat(msg));
}
MegaPi.prototype.ledMatrixDisplay = function (port, x, y, buffer) {
  var id = 0;
  var action = 2;
  var device = 41;
  write([id, action, device, port, 2, x, 7 - y].concat(buffer));
}
MegaPi.prototype.shutterDo = function (port, method) {
  var id = 0;
  var action = 2;
  var device = 20;
  write([id, action, device, port, method]);
}
var maxLinearSpeed = 200;
MegaPi.prototype.mecanumRun = function (xSpeed, ySpeed, aSpeed) {
  var spd1 = ySpeed - xSpeed + aSpeed;
  var spd2 = ySpeed + xSpeed - aSpeed;
  var spd3 = ySpeed - xSpeed - aSpeed;
  var spd4 = ySpeed + xSpeed + aSpeed;
  var max = Math.max(spd1, Math.max(spd2, Math.max(spd3, spd4)));
  if (max > maxLinearSpeed) {
    var per = maxLinearSpeed / max;
    spd1 *= per;
    spd2 *= per;
    spd3 *= per;
    spd4 *= per;
  }
  self.dcMotorRun(1, spd1);
  self.dcMotorRun(2, spd2);
  self.dcMotorRun(9, spd3);
  self.dcMotorRun(10, -spd4);
}
function getShortFromBytes(v) {
  var buf = new ArrayBuffer(2);
  var i = new Uint8Array(buf);
  i[0] = v[0];
  i[1] = v[1];
  var s = new Int16Array(buf);
  return s[0];
}
function getFloatFromBytes(v) {
  var buf = new ArrayBuffer(4);
  var i = new Uint8Array(buf);
  i[0] = v[0];
  i[1] = v[1];
  i[2] = v[2];
  i[3] = v[3];
  var f = new Float32Array(buf);
  return f[0];
}
function getLongFromBytes(v) {
  var buf = new ArrayBuffer(4);
  var i = new Uint8Array(buf);
  i[0] = v[0];
  i[1] = v[1];
  i[2] = v[2];
  i[3] = v[3];
  var l = new Int32Array(buf);
  return l[0];
}
function getBytesFromShort(v) {
  var buf = new ArrayBuffer(2);
  var s = new Int16Array(buf);
  s[0] = v;
  var i = new Uint8Array(buf);
  return [i[0], i[1]];
}
function getBytesFromFloat(v) {
  var buf = new ArrayBuffer(4);
  var f = new Float32Array(buf);
  f[0] = v;
  var i = new Uint8Array(buf);
  return [i[0], i[1], i[2], i[3]];
}
function getBytesFromLong(v) {
  var buf = new ArrayBuffer(4);
  var l = new Int32Array(buf);
  l[0] = v;
  var i = new Uint8Array(buf);
  return [i[0], i[1], i[2], i[3]];
}
exports.MegaPi = MegaPi;
