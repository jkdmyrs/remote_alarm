const Time = require('./time.js');
const Utilities = require('./utilities.js');
const gpio = require('onoff').Gpio;

class Alarm {

  constructor() {
    this.time = null;
    this.alarmId = null;
    this.isAlarmTriggered = false;
    this.isAlarmSet = false;
    this.alarmOut = new gpio(21, 'out');
    this.lightOut = new gpio(20, 'out');
    this.alarmOut.writeSync(0);
    this.lightOut.writeSync(0);
  }

  setAlarm(time) {
    clearInterval(this.alarmId);
    this.time = time;
    this.lightOut.writeSync(1);
    this._startAlarm();
    console.log(`Alarm set for ${Utilities.formatTimeString(this.time.timeString)}`);
  }

  stopAlarm() {
    clearInterval(this.alarmId);
    this.isAlarmTriggered = false;
    this.isAlarmSet = false;
    this.alarmOut.writeSync(0);
    this.lightOut.writeSync(0);
    console.log("Alarm stopped");
  }

  _startAlarm() {
    this.isAlarmSet = true;
    this.alarmId = setInterval(() => {
      this._checkAlarm();
    }, 500);
  }

  _checkAlarm() {
    if (this.isAlarmSet) {
      if (!this.isAlarmTriggered) {
        this.isAlarmTriggered = this._checkTime();
      }
      if (this.isAlarmTriggered) {
        this._triggerAlarm();
      }
    }
  }

  _checkTime() {
    let timeStr = Utilities.timeString(new Date());
    let curTime = new Time(timeStr);
    return this.time.compare(curTime);
  }

  _triggerAlarm() {
    clearInterval(this.alarmId);
    this.alarmOut.writeSync(1);
    console.log("Alarm triggered.");
  }
}

module.exports = Alarm;
