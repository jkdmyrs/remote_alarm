const express = require('express');
const cors = require('cors');
const Time = require('./time.js');
const Alarm = require('./alarm.js');
const Utilities = require('./utilities.js');
const Clock = require('./clock.js');

const app = express();
const port = 8080;

app.use(cors());

const alarm = new Alarm();
const clock = new Clock();

app.get('/', (req, res) => {
  if (alarm.isAlarmSet) {
    res.send(`Alarm set for ${Utilities.formatTimeString(alarm.time.timeString)}`);
  } else {
    res.send("Alarm not set");
  }
})

app.post('/time/:time', (req, res) => {
  let time;
  try {
    time = new Time(req.params.time);
    alarm.setAlarm(time);
    res.redirect('../../');
  } catch (e) {
    console.log(e);
    res.send("Invalid Time");
  }
});

app.post('/stop', (req, res) => {
  let canDisable = false;
  if (alarm.isAlarmTriggered) {
    const authHeader = req.headers["authorization"];
    if (authHeader == "a13761dd1a4d4289802922ae114f51bb") {
      canDisable = true;
    }
  } else {
    canDisable = true;
  }
  
  if (canDisable) {
    alarm.stopAlarm();
  }
  res.redirect('../');
})

app.listen(port, () => console.log(`App running on port ${port}`));
