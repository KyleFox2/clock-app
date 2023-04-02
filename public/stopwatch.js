class Stopwatch {
  constructor(timeOutput) {
    this.timeOutput = timeOutput;
    this.min = 0;
    this.sec = 0;
    this.msec = 0;
  };

  //updates the button text and styling and call the start/stop methods
  stopwatchStatus() {
    switch(startStopBtn.textContent) {
      case 'Start':
        this.startStopwatch();
        startStopBtn.textContent = 'Stop';
        startStopBtn.style.backgroundColor = 'rgb(255, 0, 0,0.3)'
        break;
      case 'Stop':
        this.stopStopwatch();
        startStopBtn.textContent = 'Start';
        startStopBtn.style.backgroundColor = 'transparent';
        break;
    };
  };
  
  //creates an interval to increment the stopwatch every millisecond and splits into min, sec and msec
  startStopwatch() {
    this.interval = setInterval(() => {
      if(this.sec > 59) {
        this.min ++;
        this.sec = 0;
        this.msec = 0;
      } else if(this.msec > 99) {
        this.msec = 0;
        this.sec ++;
      };
      this.updateDisplay();
      this.msec ++;
    }, 10);
  };

  //pauses the interval
  stopStopwatch() {
    clearInterval(this.interval);
  };

  //resets the stopwatch to its original state
  resetStopwatch() {
    this.stopStopwatch();
    this.timeOutput.textContent = '00:00.00';
    startStopBtn.textContent = 'Start';
    startStopBtn.style.backgroundColor = 'transparent';

    this.min = 0;
    this.sec = 0;
    this.msec = 0;
  };

  //updates the display with the current time of the stopwatch and formats the output into 00:00.00
  updateDisplay() {
    this.formatedMin = this.min.toString().padStart(2, '0');
    this.formatedSec = this.sec.toString().padStart(2, '0');
    this.formatedMsec = this.msec.toString().padStart(2, '0');

    this.timeOutput.textContent = `${this.formatedMin}:${this.formatedSec}.${this.formatedMsec}`;
  };
};

//gets access to the buttons on the stopwatch html file
const startStopBtn = document.getElementById('start-stop');
const resetBtn = document.getElementById('reset');
const timeOutput = document.querySelector('.time');

//initializes the stopwatch object
const stopwatch = new Stopwatch(timeOutput, startStopBtn);

//calls the stopwatchStatus when the user clicks the start-stop button
startStopBtn.addEventListener('click', () => {
  stopwatch.stopwatchStatus();
});

//calls the resetStopwatch method to reset the stopwatch to its default state
reset.addEventListener('click', () => {
  stopwatch.resetStopwatch();
});
