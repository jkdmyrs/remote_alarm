const gpio = require('onoff').Gpio;
const Utilities = require('./utilities.js');

const COMMON_ON = 0;
const COMMON_OFF = 1;

class Clock {
  constructor() {
    // define segment pins
    this.segA = new gpio(22, 'out');
    this.segB = new gpio(2, 'out');
    this.segC = new gpio(4, 'out');
    this.segD = new gpio(17, 'out');
    this.segE = new gpio(27, 'out');
    this.segF = new gpio(3, 'out');
    this.segG = new gpio(10, 'out');
    this.segColon = new gpio(13, 'out');

    // define common pins
    this.com1 = new gpio(9, 'out');
    this.com2 = new gpio(11, 'out');
    this.com3 = new gpio(5, 'out');
    this.com4 = new gpio(6, 'out');
    
    this._start();
  }

  async _start() {
    let i = 0;
    setInterval(() => {
      const arr = Utilities.timeArray(new Date());
      this._display(i+1, arr[i]);
      i++;
      if (i>3) i=0;  
    });
  }

  _display(display, number) {
    this._disable();
    this._setDisplay(display);
    if (display == 1 && number == 0) {
      this._disable();
    } else {
      this._setNumber(number);
    }
    if (display == 2) {
      this._enableColon();
    }
  }
  
  _enableColon() {
    this.segColon.writeSync(1);
  }

  _disable() {
    this.segA.writeSync(0);
    this.segB.writeSync(0);
    this.segC.writeSync(0);
    this.segD.writeSync(0);
    this.segE.writeSync(0);
    this.segF.writeSync(0);
    this.segG.writeSync(0);
    this.segColon.writeSync(0);
  }

  _setNumber(number) {
    switch (number) {
      case 0:
        this.segA.writeSync(1);
        this.segB.writeSync(1);
        this.segC.writeSync(1);
        this.segD.writeSync(1);
        this.segE.writeSync(1);
        this.segF.writeSync(1);
        this.segG.writeSync(0);
        break;
      case 1:
        this.segA.writeSync(0);
        this.segB.writeSync(1);
        this.segC.writeSync(1);
        this.segD.writeSync(0);
        this.segE.writeSync(0);
        this.segF.writeSync(0);
        this.segG.writeSync(0);
        break;
      case 2:
        this.segA.writeSync(1);
        this.segB.writeSync(1);
        this.segC.writeSync(0);
        this.segD.writeSync(1);
        this.segE.writeSync(1);
        this.segF.writeSync(0);
        this.segG.writeSync(1);
        break;
      case 3:
        this.segA.writeSync(1);
        this.segB.writeSync(1);
        this.segC.writeSync(1);
        this.segD.writeSync(1);
        this.segE.writeSync(0);
        this.segF.writeSync(0);
        this.segG.writeSync(1);
        break;
      case 4:
        this.segA.writeSync(0);
        this.segB.writeSync(1);
        this.segC.writeSync(1);
        this.segD.writeSync(0);
        this.segE.writeSync(0);
        this.segF.writeSync(1);
        this.segG.writeSync(1);
        break;
      case 5:
        this.segA.writeSync(1);
        this.segB.writeSync(0);
        this.segC.writeSync(1);
        this.segD.writeSync(1);
        this.segE.writeSync(0);
        this.segF.writeSync(1);
        this.segG.writeSync(1);
        break;
      case 6:
        this.segA.writeSync(1);
        this.segB.writeSync(0);
        this.segC.writeSync(1);
        this.segD.writeSync(1);
        this.segE.writeSync(1);
        this.segF.writeSync(1);
        this.segG.writeSync(1);
        break;
      case 7:
        this.segA.writeSync(1);
        this.segB.writeSync(1);
        this.segC.writeSync(1);
        this.segD.writeSync(0);
        this.segE.writeSync(0);
        this.segF.writeSync(0);
        this.segG.writeSync(0);
        break;
      case 8:
        this.segA.writeSync(1);
        this.segB.writeSync(1);
        this.segC.writeSync(1);
        this.segD.writeSync(1);
        this.segE.writeSync(1);
        this.segF.writeSync(1);
        this.segG.writeSync(1);
        break;
      case 9:
        this.segA.writeSync(1);
        this.segB.writeSync(1);
        this.segC.writeSync(1);
        this.segD.writeSync(0);
        this.segE.writeSync(0);
        this.segF.writeSync(1);
        this.segG.writeSync(1);
        break;
      default:
        break;
    }
  }

  _setDisplay(display) {
    switch (display) {
      case 1:
        this.com1.writeSync(COMMON_ON);
        this.com2.writeSync(COMMON_OFF);
        this.com3.writeSync(COMMON_OFF);
        this.com4.writeSync(COMMON_OFF);
        break;
      case 2:
        this.com1.writeSync(COMMON_OFF);
        this.com2.writeSync(COMMON_ON);
        this.com3.writeSync(COMMON_OFF);
        this.com4.writeSync(COMMON_OFF);
        break;
      case 3:
        this.com1.writeSync(COMMON_OFF);
        this.com2.writeSync(COMMON_OFF);
        this.com3.writeSync(COMMON_ON);
        this.com4.writeSync(COMMON_OFF);
        break;
      case 4:
        this.com1.writeSync(COMMON_OFF);
        this.com2.writeSync(COMMON_OFF);
        this.com3.writeSync(COMMON_OFF);
        this.com4.writeSync(COMMON_ON);
        break;
      default:
        break;
    }
  }
  
}

module.exports = Clock;
