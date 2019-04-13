class Utilities {
  static sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static timeString(date) {
    let hour = date.getHours();
    let isAM = true;
    if (hour > 12) {
      hour = hour - 12;
      isAM = false;
    } else if (hour == 0) {
      hour = 12;
    }
    let minute = date.getMinutes();
    return `${hour.toString().padStart(2, '0')}${minute.toString().padStart(2, '0')}${isAM ? 'a' : 'p'}`;
  }

  static formatTimeString(timeStr) {
    const hour = Number.parseInt(timeStr.substring(0, 2));
    const minutes = Number.parseInt(timeStr.substring(2, 4));
    const isAM = timeStr.substring(4) == 'a' ? true : false;
    return `${hour}:${minutes.toString().padStart(2, '0')} ${isAM ? 'AM' : 'PM'}`
  }
  
  static timeArray(date) {
    let hours = date.getHours();
    if (hours == 0) hours = 12;
    if (hours > 12) hours = hours - 12;
    const minutes = date.getMinutes();
    const arr = [];
    if (hours.toString().length == 2) {
      arr[0] = Number.parseInt(hours.toString().charAt(0));
      arr[1] = Number.parseInt(hours.toString().charAt(1));
    } else {
      arr[0] = 0;
      arr[1] = hours;
    }
    if (minutes.toString().length == 2) {
      arr[2] = Number.parseInt(minutes.toString().charAt(0));
      arr[3] = Number.parseInt(minutes.toString().charAt(1));
    } else {
      arr[2] = 0;
      arr[3] = minutes;
    }
    return arr;
  }
}

module.exports = Utilities;
