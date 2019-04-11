const gpio = require('onoff').Gpio;

// define segment pins
const segA = new gpio(2, 'out');
const segB = new gpio(3, 'out');
const segC = new gpio(4, 'out');
const segD = new gpio(5, 'out');
const segE = new gpio(6, 'out');
const segF = new gpio(7, 'out');
const segG = new gpio(8, 'out');

// define common pins
const com1 = new gpio(9, 'out');
const com2 = new gpio(10, 'out');
const com3 = new gpio(11, 'out');
const com4 = new gpio(12, 'out');

const ON = 0;
const OFF = 1;

setInterval(() => {
	if (com1.readSync() == ON) {
		com1.writeSync(OFF);
		com2.writeSync(ON);
		com3.writeSync(OFF);
		com4.writeSync(OFF);

		segA.writeSync(1);
		segB.writeSync(1);
		segC.writeSync(1);
		segD.writeSync(0);
		segE.writeSync(0);
		segF.writeSync(1);
		segG.writeSync(1);
	} else {
		com1.writeSync(ON);
		com2.writeSync(OFF);
		com3.writeSync(OFF);
		com4.writeSync(OFF);

		segA.writeSync(1);
		segB.writeSync(1);
		segC.writeSync(1);
		segD.writeSync(0);
		segE.writeSync(0);
		segF.writeSync(1);
		segG.writeSync(1);			
	}	
}, 10);
