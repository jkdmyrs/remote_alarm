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
}

module.exports = Utilities;
