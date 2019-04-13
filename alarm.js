const Time = require('./time.js');
const Utilities = require('./utilities.js');
const gpio = require('onoff').Gpio;

class Alarm {

  constructor() {
    this.time = null;
    this.alarmID = null;
    this.isAlarmOn = false;
    this.alarmOut = new gpio(21, 'out');
    this.alarmOut.writeSync(0);
  }

  setAlarm(time) {
    this.time = time;
    this._startAlarm();
    console.log(`Alarm set for ${Utilities.formatTimeString(this.time.timeString)}`);
  }

  stopAlarm() {
    this.isAlarmOn = false;
    clearInterval(this.alarmID);
    this.alarmOut.writeSync(0);
    this.time = null;
    console.log("Alarm stopped");
  }

  _startAlarm() {
    this.alarmID = setInterval(() => {
      this._checkAlarm();
    }, 500);
  }

  _checkAlarm() {
    if (!this.isAlarmOn) {
      this.isAlarmOn = this._checkAlarmTime();
    }
    if (this.isAlarmOn) {
      this._triggerAlarm();
    }
  }

  _checkAlarmTime() {
    let timeStr = Utilities.timeString(new Date());
    let curTime = new Time(timeStr);
    return this.time.compare(curTime);
  }

  _triggerAlarm() {
    clearInterval(this.alarmID);
    this.alarmOut.writeSync(1);
    console.log("Alarm triggered.");
  }
}

module.exports = Alarm;
