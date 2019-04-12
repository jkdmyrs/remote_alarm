const express = require('express');
const Time = require('./time.js');
const Alarm = require('./alarm.js');
const Clock = require('./clock.js');
const app = express();
const port = 8080;

const alarm = new Alarm();
let clock = new Clock();

app.get('/', (req, res) => {
  if (alarm.time != null) {
    res.send(`Alarm set for ${alarm.time.timeString}`);
  } else {
    res.send("Alarm not set.");
  }
})

app.get('/time/:time', (req, res) => {
  let time;
  try {
    time = new Time(req.params.time);
    alarm.setAlarm(time);
    res.send(`Alarm set for ${time.timeString}`);
    clock.enable();
  } catch (e) {
    console.log(e);
    res.send("Invalid Time");
  }
});

app.get('/stop', (req, res) => {
  alarm.stopAlarm();
  clock.disable();
  res.send("Alarm disabled.");
})

app.listen(port, () => console.log(`App running on port ${port}`));
