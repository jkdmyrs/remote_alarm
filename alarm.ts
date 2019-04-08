import { Time } from './time.ts';

export class Alarm {
  public interval: number;
  public time: Time;
  public isAlarm: boolean;

  constructor(time: Time) {
    this.isAlarm = false;
    this.time = time;
    this.startInterval();
    const amStr: string = time.isAM ? "AM" : "PM";
    console.log("Alarm set for " + this.time.hour + ":" + this.time.minute.toString().padStart(2, '0') + " " + amStr + ".");
  }

  public stopInterval(): void {
    clearInterval(this.interval);
  }

  public stopAlarm(): void {
    console.log("Alarm stopped");
  }

  private startInterval(): void {
    this.interval = setInterval(() => {
      if (!this.isAlarm) {
        this.isAlarm = this.shouldTriggerAlarm();
      } else {
        this.triggerAlarm();
      }
    }, 900);
  }

  private shouldTriggerAlarm(): boolean {
    const date: Date = new Date();
    let hour = date.getHours();
    const minute = date.getMinutes();
    let isAM: boolean = true;
    if (hour > 12) {
      hour = hour - 12;
      isAM = false;
    }
    else if (hour == 0) {
      hour = 12;
    }
    if (this.time.minute == minute && this.time.hour == hour && this.time.isAM == isAM) {
      return true;
    }
    return false;
  }

  private triggerAlarm(): void {
    console.log("alarm");
    this.stopInterval();
  }
}
