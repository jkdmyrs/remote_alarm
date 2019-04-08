export class Time {
  public hour: number;
  public minute: number;
  public isAM: boolean;

  constructor(time: string) {
    if (time.length == 4) {
      this.hour = Number.parseInt(time.substring(0, 1));
      this.minute = Number.parseInt(time.substring(1, 3));
      this.isAM = time.substring(3) == 'a' ? true : false;
    } else if (time.length == 5) {
      this.hour = Number.parseInt(time.substring(0, 2));
      this.minute = Number.parseInt(time.substring(2, 4));
      this.isAM = time.substring(4) == 'a' ? true : false;
    } else {
      throw "Error - Invalid Time";
    }

    if (this.minute < 0 || this.minute > 59 || this.hour < 1 || this.hour > 12) {
      throw "Error - Invalid Time";
    }
  }
}