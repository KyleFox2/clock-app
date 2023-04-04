class WorldClock {
  constructor() {
    this.hour = 23;
    this.min = 59;
    this.sec = 56;
    this.city;
    this.timezone = 'Europe/London';
    this.timeZoneData;
    this.date = new Date();
  }

  async getData() {
    this.timeZoneData = await fetch('https://api.api-ninjas.com/v1/worldtime?city=' + this.city, {
      method: 'GET',
      headers: { 
        'X-Api-Key': '18rBryBJKd4zxoN6l6Wtsg==J8oIDsXjakyL46bk'
      },
      contentType: 'application/json'})
      .then(resp => resp.json())
      .then(data => {
        if(data.error) {
          userInput.placeholder = 'Could not find that city'
          return
        } else {
          userInput.placeholder = 'Search'
          this.hour = Number(data.hour),
          this.min = Number(data.minute),
          this.sec = Number(data.second),
          this.timezone = data.timezone
        };
      })

    this.updateWorldClockDisplay();
    this.startInterval();
  };

  onLoad() {
    this.hour = this.date.getHours();
    this.min = this.date.getMinutes();
    this.sec = this.date.getSeconds() ;

    this.updateWorldClockDisplay();
    this.startInterval();
  };

  timeDifference() {

  }

  updateWorldClockDisplay() {
    timeOutput.textContent = `
    ${this.hour.toString().padStart(2, '0')}:${
      this.min.toString().padStart(2, '0')}:${
      this.sec.toString().padStart(2, '0')}`;

    timeTitle.textContent = this.timezone;
  };

  startInterval() {
    this.interval = setInterval(() => {
      if(this.hour > 22 && this.min > 58 && this.sec > 58){
        this.hour = 0;
        this.min = 0;
        this.sec = 0;
        this.updateWorldClockDisplay();
      } else if(this.min > 58 && this.sec > 58) {
        this.hour ++;
        this.min = 0;
        this.sec = 0;
        this.updateWorldClockDisplay();
      } else if(this.sec > 58) {
        this.min ++;
        this.sec = 0;
        this.updateWorldClockDisplay();
      } else {
        this.sec ++;
        this.updateWorldClockDisplay();
      };
    },1000);
  };

  stopInterval() {
    clearInterval(this.interval);
  };
};

//initialises the WorldClock class
const worldClock = new WorldClock;

//worldclock DOM elements
const searchBtn = document.querySelector('.search-btn');
const userInput = document.querySelector('input');
const timeOutput = document.querySelector('.timezone-output')
const timeTitle = document.querySelector('.timezone-title')

searchBtn.addEventListener('click', () => {
  if(userInput.value == worldClock.city) {
    userInput.value = ''
    return
  }

  worldClock.city = userInput.value;
  userInput.value = ''
  userInput.placeholder = 'Searching...'
  worldClock.stopInterval();
  worldClock.getData();

});

worldClock.onLoad();
