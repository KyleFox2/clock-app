// import TimerSetup from '/timerSetup.js';
class TimerRunner {
  constructor() {
    this.hour = localStorage.getItem('hour');
    this.min = localStorage.getItem('min');
    this.sec = localStorage.getItem('sec');
  }

  //sets the timer interval by decreasing every second and updates the display
  setNegativeInterval() {
    this.negativeInterval = setInterval(() => {
      if(this.hour == 0 && this.min == 0 && this.sec == 0) {
        this.stopNegativeInterval();
      } else if(this.min < 1 && this.sec < 1) {
        this.hour --;
        this.min = 59;
        this.sec = 59;
        this.updateTimerDisplay();
      } else if(this.sec < 1) {
        this.min --;
        this.sec--;
        this.sec = 59;
        this.updateTimerDisplay();
      } else {
        this.sec --;
        this.updateTimerDisplay();
      };
    }, 1000);
  };
  
  //pauses the interval
  stopNegativeInterval() {
    clearInterval(this.negativeInterval);
  };

  //reloads the page which restarts the timer with original selected values as these are stored locally
  restartTimer() {
    location.reload();
  }

  //updates the display with the formatted timer results
  updateTimerDisplay() {
    output.textContent = `
    ${this.hour.toString().padStart(2, '0')}:${
      this.min.toString().padStart(2, '0')}:${
      this.sec.toString().padStart(2, '0')}`
  };
};

const timerRunner = new TimerRunner;

//timer runner DOM elements
const output = document.getElementById('output');
const stopStart = document.getElementById('stop-start');
const restart = document.getElementById('restart');
const deleteTimer = document.getElementById('delete');
const timerRunnerContainer = document.querySelector('.container');

//pauses/starts the timer 
stopStart.addEventListener('click', () => {
  if(stopStart.textContent === 'Stop'){
    timerRunner.stopNegativeInterval();
    stopStart.textContent = 'Start';
  } else {
    stopStart.textContent = 'Stop';
    timerRunner.setNegativeInterval();
  };
});

//deletes the users input from local storage and take them back to the setup screen
deleteTimer.addEventListener('click', () => {
  localStorage.clear();
})

//calls the restartTimer when the restart button is selected
restart.addEventListener('click', () => {
  timerRunner.restartTimer();
})

//starts the timer and updates the display on page load
window.addEventListener('load', () => {
  timerRunner.updateTimerDisplay();
  timerRunner.setNegativeInterval();
})