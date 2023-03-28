class Clock {
  constructor() {
    this.months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    this.weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];  
    this.date = new Date();
  }
  
  //Gets the current time and returns formated as hh:mm:ss
  time() {
    this.hour = (this.date.getHours() < 10 ? '0' : '') + this.date.getHours();
    this.min = (this.date.getMinutes() < 10 ? '0' : '') + this.date.getMinutes();
    this.sec = (this.date.getSeconds() < 10 ? '0' : '') + this.date.getSeconds();
    return `${this.hour}:${this.min}:${this.sec}`;
  };

  //Gets the current date and returns formatted as Weekday | DD Month, YYYY | GMT
  longDateFormat() {
    this.dayName = this.weekdays[this.date.getDay()];
    this.monthDay = this.date.getDate();
    this.month = this.months[this.date.getMonth()];
    this.year = this.date.getFullYear();
    return `${this.dayName} | ${this.monthDay} ${this.month} ${this.year} | GMT`;
  };

  //updates the webpage to reflect the time and longDateFormat method results
  updateDisplay() {
    this.date = new Date();
    timeDisplay.textContent = clock.time();
    dateDisplay.textContent = clock.longDateFormat();
  };
}

//gets the span elements from the html file
const timeDisplay = document.querySelector('.time');
const dateDisplay = document.querySelector('.date');
const clock = new Clock();

//calls the updateDisplay method every second so that the webpage keeps updating with the current time
const interval = setInterval(() => clock.updateDisplay(),1000);
clock.updateDisplay();