import { Time } from './time.ts';
import { Alarm } from './alarm.ts';
import { app, get } from 'https://denopkg.com/syumai/dinatra/mod.ts';

let alarm: Alarm;

app(
  get('/', ({ params }) => {
    let time: Time;
    try {
      time = new Time(params.time);
      alarm = new Alarm(time);
    }
    catch {
      return "Invalid Time";
    }

    const amStr: string = time.isAM ? "AM" : "PM";
    return [200, "Alarm set for " + time.hour + ":" + time.minute.toString().padStart(2, '0') + " " + amStr + "."];
  }),
  get('/stop', () => {
    alarm.stopAlarm();
    return "Alarm not set.";
  })
);