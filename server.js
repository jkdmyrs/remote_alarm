const express = require('express');
const Time = require('../time.js/index.js');
const Alarm = require('./alarm.js/index.js');
const app = express();
const port = 8080;

const alarm = new Alarm();

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
    console.log(time.timeString);
    alarm.setAlarm(time);
    res.send(`Alarm set for ${time.timeString}`);
  } catch (e) {
    console.log(e);
    res.send("Invalid Time");
  }
});

app.get('/stop', (req, res) => {
  alarm.stopAlarm();
  res.send("Alarm disabled.");
})

app.listen(port, () => console.log(`App running on port ${port}`));