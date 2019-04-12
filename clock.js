const Utilities = require('./utilities.js');
const gpio = require('onoff').Gpio;
const Time = require('./time.js');

const COMMON_ON = 0;
const COMMON_OFF = 1;

const SLEEP_TIME = 5;

class Clock {
  constructor() {
    // define segment pins
    this.segA = new gpio(2, 'out');
    this.segB = new gpio(3, 'out');
    this.segC = new gpio(4, 'out');
    this.segD = new gpio(5, 'out');
    this.segE = new gpio(6, 'out');
    this.segF = new gpio(7, 'out');
    this.segG = new gpio(8, 'out');

    // define common pins
    this.com1 = new gpio(9, 'out');
    this.com2 = new gpio(10, 'out');
    this.com3 = new gpio(11, 'out');
    this.com4 = new gpio(12, 'out');
    
    this.time = null;
    this.disable();
  }
  
  disable() {
    this.enabled = false;
  }
  
  enable() {
    this.enabled = true;
    this._startDisplay();
  }
  
  async _startDisplay() {
    while(this.enabled) {
      this._updateTime();
      const timeArr = [
        Number.parseInt(this.time.timeString.charAt(0)), 
        Number.parseInt(this.time.timeString.charAt(1)), 
        Number.parseInt(this.time.timeString.charAt(2)), 
        Number.parseInt(this.time.timeString.charAt(3))
      ];
      await this._displayClock(timeArr);
    }
    if (!this.enabled) {
      this._disableAll();
    }
  }
  
  _updateTime() {
    const timeStr = Utilities.timeString(new Date());
    this.time = new Time(timeStr);
  }
  
  _display(number, display) {
    this._disableAll();
    this._setNumber(number);
    this._setDisplay(display);
  }
  
  async _displayClock(timeArr) {
    for (let i = 1; i <= 4; i++) {
      this._display(timeArr[i-1], i);
      await Utilities.sleep(SLEEP_TIME);
    }
  }
  
  _disableAll() {
    this.com1.writeSync(COMMON_OFF);
    this.com2.writeSync(COMMON_OFF);
    this.com3.writeSync(COMMON_OFF);
    this.com4.writeSync(COMMON_OFF);
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
