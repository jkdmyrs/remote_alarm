class Time {
  constructor(timeStr) {
    if (timeStr.length == 4) {
      this.hour = Number.parseInt(timeStr.substring(0, 1));
      this.minute = Number.parseInt(timeStr.substring(1, 3));
      this.isAM = timeStr.substring(3) == 'a' ? true : false;
    } else if (timeStr.length == 5) {
      this.hour = Number.parseInt(timeStr.substring(0, 2));
      this.minute = Number.parseInt(timeStr.substring(2, 4));
      this.isAM = timeStr.substring(4) == 'a' ? true : false;
    } else {
      throw this._error(timeStr);
    }

    if (this.minute < 0 || this.minute > 59 || this.hour < 1 || this.hour > 12) {
      throw this._error(timeStr);
    }
  }

  _error(timeStr) {
    return "Error - Cannot create Time. Invalid time: " + timeStr;
  }

  compare(time) {
    return this.hour == time.hour && this.minute == time.minute && this.isAM == time.isAM;
  }

  get timeString() {
    return `${this.hour.toString().padStart(2,'0')}${this.minute.toString().padStart(2, '0')}${this.isAM ? "a" : "p"}`;
  }
}

module.exports = Time;
