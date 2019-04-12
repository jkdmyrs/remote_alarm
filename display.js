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

const COMMON_ON = 0;
const COMMON_OFF = 1;

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function disable() {
	com1.writeSync(COMMON_OFF);
	com2.writeSync(COMMON_OFF);
	com3.writeSync(COMMON_OFF);
	com4.writeSync(COMMON_OFF);
}

function setNumber(number) {
	switch (number) {
		case 0:
			segA.writeSync(1);
			segB.writeSync(1);
			segC.writeSync(1);
			segD.writeSync(1);
			segE.writeSync(1);
			segF.writeSync(1);
			segG.writeSync(0);
			break;
		case 1:
			segA.writeSync(0);
			segB.writeSync(1);
			segC.writeSync(1);
			segD.writeSync(0);
			segE.writeSync(0);
			segF.writeSync(0);
			segG.writeSync(0);
			break;
		case 2:
			segA.writeSync(1);
			segB.writeSync(1);
			segC.writeSync(0);
			segD.writeSync(1);
			segE.writeSync(1);
			segF.writeSync(0);
			segG.writeSync(1);
			break;
		case 3:
			segA.writeSync(1);
			segB.writeSync(1);
			segC.writeSync(1);
			segD.writeSync(1);
			segE.writeSync(0);
			segF.writeSync(0);
			segG.writeSync(1);
			break;
		case 4:
			segA.writeSync(0);
			segB.writeSync(1);
			segC.writeSync(1);
			segD.writeSync(0);
			segE.writeSync(0);
			segF.writeSync(1);
			segG.writeSync(1);
			break;
		case 5:
			segA.writeSync(1);
			segB.writeSync(0);
			segC.writeSync(1);
			segD.writeSync(1);
			segE.writeSync(0);
			segF.writeSync(1);
			segG.writeSync(1);
			break;
		case 6:
			segA.writeSync(1);
			segB.writeSync(0);
			segC.writeSync(1);
			segD.writeSync(1);
			segE.writeSync(1);
			segF.writeSync(1);
			segG.writeSync(1);
			break;
		case 7:
			segA.writeSync(1);
			segB.writeSync(1);
			segC.writeSync(1);
			segD.writeSync(0);
			segE.writeSync(0);
			segF.writeSync(0);
			segG.writeSync(0);
			break;
		case 8:
			segA.writeSync(1);
			segB.writeSync(1);
			segC.writeSync(1);
			segD.writeSync(1);
			segE.writeSync(1);
			segF.writeSync(1);
			segG.writeSync(1);
			break;
		case 9:
			segA.writeSync(1);
			segB.writeSync(1);
			segC.writeSync(1);
			segD.writeSync(0);
			segE.writeSync(0);
			segF.writeSync(1);
			segG.writeSync(1);
			break;
		default:
			break;
	}
}

function setDisplay(display) {
	switch (display) {
		case 1:
			com1.writeSync(COMMON_ON);
			com2.writeSync(COMMON_OFF);
			com3.writeSync(COMMON_OFF);
			com4.writeSync(COMMON_OFF);
			break;
		case 2:
			com1.writeSync(COMMON_OFF);
			com2.writeSync(COMMON_ON);
			com3.writeSync(COMMON_OFF);
			com4.writeSync(COMMON_OFF);
			break;
		case 3:
			com1.writeSync(COMMON_OFF);
			com2.writeSync(COMMON_OFF);
			com3.writeSync(COMMON_ON);
			com4.writeSync(COMMON_OFF);
			break;
		case 4:
			com1.writeSync(COMMON_OFF);
			com2.writeSync(COMMON_OFF);
			com3.writeSync(COMMON_OFF);
			com4.writeSync(COMMON_ON);
			break;
		default:
			break;
	}
}

function display(display, number) {
	disable();
	setNumber(number);
	setDisplay(display);
}

async function show(num1, num2, num3, num4) {
	display(1, num1);
	await sleep(5);
	display(3, num3);
	await sleep(5);
	display(4, num4);
	await sleep(5);
	display(2, num2);
	await sleep(5);
}

async function main() {
	while(true) {
		await show(0,0,0,0);
	}
}

main();
