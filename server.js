const express = require('express');
const Time = require('./time.js');
const Alarm = require('./alarm.js');
const Utilities = require('./utilities.js');
const Clock = require('./clock.js');

const app = express();
const port = 8080;

const alarm = new Alarm();
const clock = new Clock();

app.get('/', (req, res) => {
  if (alarm.isAlarmSet) {
    res.send(`Alarm set for ${Utilities.formatTimeString(alarm.time.timeString)} \n`);
  } else {
    res.send("Alarm not set \n");
  }
})

app.get('/time/:time', (req, res) => {
  let time;
  try {
    time = new Time(req.params.time);
    alarm.setAlarm(time);
    res.redirect('../../');
  } catch (e) {
    console.log(e);
    res.send("Invalid Time \n");
  }
});

app.get('/stop', (req, res) => {
  alarm.stopAlarm();
  res.redirect('../');
})

app.listen(port, () => console.log(`App running on port ${port}`));
