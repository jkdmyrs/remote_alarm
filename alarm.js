const Time = require('./time.js');
const Utilities = require('./utilities.js');
const Clock = require('./clock.js');

class Alarm {

  constructor() {
    this.time = null;
    this.alarmID = null;
    this.isAlarmOn = false;
    this.clock = new Clock();
  }

  setAlarm(time) {
    this.time = time;
    this._startAlarm();
    console.log(`Alarm set for ${this.time.timeString}`);
  }
  
  stopAlarm() {
    this.time = null;
    this.isAlarmOn = false;
    this.clock.disable();
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
    this.clock.enable();
    console.log("Alarm triggered.");
  }

}

module.exports = Alarm;
