export default class Clock {
  constructor(timeDisplay, dateDisplay) {
    this.timeDisplay = timeDisplay;
    this.dateDisplay = dateDisplay;
    this.monthsList = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    this.daysList = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];  
    this.date = new Date();
    this.startInterval()
  }
  
  //gets the current time and returns formated as hh:mm:ss
  time() {
    this.hour = (this.date.getHours() < 10 ? '0' : '') + this.date.getHours();
    this.min = (this.date.getMinutes() < 10 ? '0' : '') + this.date.getMinutes();
    this.sec = (this.date.getSeconds() < 10 ? '0' : '') + this.date.getSeconds();
    return `${this.hour}:${this.min}:${this.sec}`;
  };

  //gets the current date and returns formatted as Weekday | DD Month, YYYY | GMT
  longDateFormat() {
    this.dayName = this.daysList[this.date.getDay()];
    this.monthDay = this.date.getDate();
    this.month = this.monthsList[this.date.getMonth()];
    this.year = this.date.getFullYear();
    return `${this.dayName} | ${this.monthDay} ${this.month} ${this.year} | GMT`;
  };

  //updates the webpage to reflect the time and longDateFormat method results
  updateDisplay() {
    this.date = new Date();
    this.timeDisplay.textContent = this.time();
    this.dateDisplay.textContent = this.longDateFormat();
  };

  //calls the updateDisplay method every second so that the webpage keeps updating with the current time
  startInterval() {
    this.updateDisplay()
    setInterval(() => this.updateDisplay(),1000);
  }
}