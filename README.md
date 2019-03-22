# Node For MegaPi
## How To Use
 * Compile and upload the Firmware to your MegaPi ( https://github.com/Makeblock-Official/FirmwareForMegaPi )
 * On your Raspberry Pi, 
 ```
 npm install megapi
 ```
 * Insert the initial code for starting MegaPi first.
```
var MegaPi = require("megapi").MegaPi;
var bot = new MegaPi("/dev/ttyAMA0", onStart); //"/dev/ttyAMA0" for rpi2, "/dev/ttyAMA0" for rpi3
function onStart(){
  //start your code
  setTimeout(loop,500);
}
var level = 0;
function loop(){
  bot.digitalWrite(13, level);
  level = 1-level;
  setTimeout(loop,500);
}
 ```
 * node your code

## Node API
 * Start
 	* **MegaPi**( serialport, **function** onStart)
 	
 * GPIO
 	* **digitalWrite**( pin, level )
 	* **pwmWrite**( pin, pwm )
 	* **digitalRead**( pin, **function** onResult )
 	* **analogRead**( pin, **function** onResult )
 	
 * Motion
	* DC Motor
	  * **dcMotorRun**( port, speed )
	* Servo Motor
	  * **servoRun**( port, slot, angle )
	* Encoder Motor
	  * **encoderMotorRun**( port, speed )
	  * **encoderMotorMove**( port, speed, distance, **function** onFinish )
	  * **encoderMotorMoveTo**( port, speed, position, **function** onFinish )
	* Stepper Motor
	  * **stepperMotorSetting**( port, microsteps, acceleration )
	  * **stepperMotorRun**( port, speed )
	  * **stepperMotorMove**( port, speed, distance, **function** onFinish )
	  * **stepperMotorMoveTo**( port, speed, position, **function** onFinish )
	  
 * Sensors
 	* Ultrasonic Sensor
 	  * **ultrasonicSensorRead** ( port, **function** onResult ) 
 	* LineFollow Sensor
 	  * **lineFollowerRead** ( port, **function** onResult ) 
 	* Light Sensor
 	  * **lightSensorRead** ( port, **function** onResult ) 
 	* Sound Sensor
 	  * **soundSensorRead** ( port, **function** onResult ) 
 	* Temperature Sensor
 	  * **temperatureRead** ( port, **function** onResult ) 
 	* PIR Motion Sensor
 	  * **pirMotionSensorRead** ( port, **function** onResult ) 
 	* Touch Sensor
 	  * **touchSensorRead** ( port, **function** onResult ) 
 	* LimitSwitch
 	  * **limitSwitchRead** ( port, slot, **function** onResult ) 
 	* Humiture Sensor
 	  * **humitureSensorRead** ( port, type, **function** onResult ) 
 	* Gas Sensor
 	  * **gasSensorRead** ( port, **function** onResult )
 	* Flame Sensor
 	  * **flameSensorRead** ( port, **function** onResult ) 
 	* Button
 	  * **buttonRead** ( port, **function** onResult ) 
 	* Potentiometer
 	  * **potentiometerRead** ( port, **function** onResult )
 	* Joystick
 	  * **joystickRead** ( port, axis, **function** onResult )
 	* 3-Axis Accelerometer and Gyro Sensor
 	  * **gyroRead** ( axis, **function** onResult )
 	* Compass
 	  * **compassRead** ( **function** onResult )
 	
 * Display
 	* RGB Led
 	  * **rgbledDisplay** ( port, slot, index, r, g, b )
 	  * **rgbledShow** ( port, slot )
 	* 7-segment Display
 	  * **sevenSegmentDisplay** ( port, value )
 	* Led Matrix Display
 	  * **ledMatrixMessage** ( port, x, y, msg )
 	  * **ledMatrixDisplay** ( port, x, y, buffer )
 	* Serial LCD Display
 	  * **lcdDisplay** ( string )
 	  
 * Others
 	* DSLR Shutter
	  * **shutterOn** ( port )
	  * **shutterOff** ( port )
	  * **focusOn** ( port )
	  * **focusOff** ( port )

## Examples

```
https://github.com/Makeblock-official/NodeForMegaPi/tree/master/examples
```

###Learn more from Makeblock official website: www.makeblock.com
