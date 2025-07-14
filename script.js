let startTime, updatedTime, difference, timerInterval;
let running = false;
let laps = [];

const display = document.getElementById("display");
const lapsList = document.getElementById("laps");

function updateDisplay() {
  let time = new Date(difference);
  let minutes = time.getUTCMinutes().toString().padStart(2, "0");
  let seconds = time.getUTCSeconds().toString().padStart(2, "0");
  let milliseconds = Math.floor(time.getUTCMilliseconds() / 10).toString().padStart(2, "0");
  display.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

document.getElementById("start").onclick = function () {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    timerInterval = setInterval(function () {
      difference = new Date().getTime() - startTime;
      updateDisplay();
    }, 10);
    running = true;
  }
};

document.getElementById("pause").onclick = function () {
  if (running) {
    clearInterval(timerInterval);
    running = false;
  }
};

document.getElementById("reset").onclick = function () {
  clearInterval(timerInterval);
  running = false;
  difference = 0;
  updateDisplay();
  laps = [];
  lapsList.innerHTML = "";
};

document.getElementById("lap").onclick = function () {
  if (running) {
    let lapTime = display.textContent;
    laps.push(lapTime);
    let lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${laps.length}: ${lapTime}`;
    lapsList.appendChild(lapItem);
  }
};