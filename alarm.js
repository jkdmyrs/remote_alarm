const Time = require('./time.js');

class Alarm {

  constructor() {
    this.time = null;
    this.alarmID = null;
    this.isAlarmOn = false;
  }

  setAlarm(time) {
    this.time = time;
    this.alarmID = setInterval(() => {
      if (!this.isAlarmOn) {
        this.isAlarmOn = this.checkAlarmTime();
      }
      if (this.isAlarmOn) {
        this.triggerAlarm();
      }
    }, 500);
    console.log(`Alarm set for ${this.time.timeString}`);
  }

  checkAlarmTime() {
    const curDate = new Date();
    let hour = curDate.getHours();
    let isAM = true;
    if (hour > 12) {
      hour = hour - 12;
      isAM = false;
    } else if (hour == 0) {
      hour = 12;
    }
    let minute = curDate.getMinutes();
    let timeStr = `${hour.toString()}${minute.toString()}${isAM ? 'a' : 'p'}`;
    let curTime = new Time(timeStr);
    return this.time.compare(curTime);
  }

  triggerAlarm() {
    clearInterval(this.alarmID);
    console.log("Alarm triggered.");
  }

  stopAlarm() {
    this.time = null;
    this.isAlarmOn = false;
    console.log("Alarm stopped");
  }
}

module.exports = Alarm;