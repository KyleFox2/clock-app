class TimerSetup {
  constructor() {
    this.up = '↑';
    this.down = '↓';
    this.hour = 0;
    this.min = 0;
    this.sec = 0;
  };

  //increases/decreases the hour column depending on the user input and formats accordingly 
  setTimerHour(userChoice) {
    if(userChoice === this.up && this.hour < 99) {
      this.hour ++
      this.updateSetupDisplay()
    } else if(userChoice === this.down && this.hour > 0) {
      this.hour --
      this.updateSetupDisplay()
    };
  };

  //increases/decreases the minute column depending on the user input and formats accordingly 
  setTimerMin(userChoice) {
    if(userChoice === this.up && this.min < 59) {
      this.min ++
      this.updateSetupDisplay()
    } else if(userChoice === this.down && this.min > 0) {
      this.min --
      this.updateSetupDisplay()
    };
  };

    //increases/decreases the second column depending on the user input and formats accordingly 
  setTimerSec(userChoice) {
    if(userChoice === this.up && this.sec < 59) {
      this.sec ++
      this.updateSetupDisplay()
    } else if(userChoice === this.down && this.sec > 0) {
      this.sec --
      this.updateSetupDisplay()
    };
  };

  //updates the display with the users input and formats to 00:00:00
  updateSetupDisplay() {
    this.formattedHour = this.hour.toString().padStart(2, '0');
    this.formattedMin = this.min.toString().padStart(2, '0');
    this.formattedSec = this.sec.toString().padStart(2, '0');

    hourOutput.textContent = this.formattedHour;
    minOutput.textContent = this.formattedMin;
    secOutput.textContent = this.formattedSec;
  };

  //saves the user input to local storage
  startTimer() {
    localStorage.setItem('hour', this.hour);
    localStorage.setItem('min', this.min);
    localStorage.setItem('sec', this.sec);
  };
};

const timerSetup = new TimerSetup;

//timer setup DOM elements
const hourOutput = document.getElementById('hourOutput');
const minOutput = document.getElementById('minOutput');
const secOutput = document.getElementById('secOutput');
const link = document.getElementById('link');
const timerBtns = Array.from(document.querySelectorAll('button'));

//loops through the buttons and determines the user input and calls the corresponding method
timerBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    const userChoiceParentElement = e.target.parentElement.id
    const userChoice = e.target.textContent

    if(userChoice === 'Start'){
      return
    } else if(userChoiceParentElement === 'hour') {
      timerSetup.setTimerHour(userChoice);
    } else if(userChoiceParentElement === 'min') {
      timerSetup.setTimerMin(userChoice);
    } else if(userChoiceParentElement === 'sec') {
      timerSetup.setTimerSec(userChoice);
    };
  });
});

//prevents progression if 00:00:00 is selected and takes the user to the timer if they're input is valid (not zero)
link.addEventListener('click', (event) => {
    if(timerSetup.hour == 0 && timerSetup.min == 0 && timerSetup.sec == 0) {
      localStorage.clear();
      event.preventDefault();
    } else {
      timerSetup.startTimer();
    };
});