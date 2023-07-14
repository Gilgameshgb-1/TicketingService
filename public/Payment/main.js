// set timer duration in minutes
const timerDuration = 15;

// set timer interval in milliseconds
const timerInterval = 1000;

// set timer start time
let timerStartTime = Date.now();

// set timer end time
let timerEndTime = timerStartTime + timerDuration * 60 * 1000;

// set timer display element
const timerDisplay = document.getElementById("time");

// set progress bar element
const progressBar = document.getElementById("progress-bar");

// update timer display and progress bar
function updateTimer() {
  // get current time
  const currentTime = Date.now();

  // calculate time remaining in seconds
  let timeRemaining = Math.round((timerEndTime - currentTime) / 1000);

  // calculate minutes remaining
  const minutesRemaining = Math.floor(timeRemaining / 60);

  // calculate seconds remaining
  const secondsRemaining = timeRemaining % 60;

  // format time remaining string
  let timeRemainingString = "";
  if (minutesRemaining < 10) {
    timeRemainingString += "0";
  }
  timeRemainingString += minutesRemaining + ":";
  if (secondsRemaining < 10) {
    timeRemainingString += "0";
  }
  timeRemainingString += secondsRemaining;

  // update timer display
  timerDisplay.innerHTML = timeRemainingString;

  // update progress bar width
  const progressBarWidth =
    ((timerEndTime - currentTime) / (timerEndTime - timerStartTime)) * 100;
  progressBar.style.width = progressBarWidth + "%";
}

// start timer
setInterval(updateTimer, timerInterval);
