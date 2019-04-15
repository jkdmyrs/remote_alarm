const _apiURL = 'http://192.168.86.26:8080/';

function setStatusText(statusText) {
  $('#remote_alarm_status').html(statusText + '.');
}

function setAlarm() {
  const time = $("#time_input").val();
  $.post(_apiURL + 'time/' + time, (data) => {
    setStatusText(data);
    $("#time_input").val("");
  });
}

function disableAlarm() {
  $.post(_apiURL + 'stop', (data) => {
    setStatusText(data);
  })
}

// set on-click handlers
$('#time_button').click(setAlarm);
$('#stop_button').click(disableAlarm);

// initialize the status text
function getStatus() {
  $.get(_apiURL, (data) => {
    setStatusText(data);
  });
}
getStatus();