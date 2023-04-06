class WorldClock {
  constructor() {
    this.day;
    this.hour;
    this.min;
    this.sec;
    this.city;
    this.timeZone = 'Europe/London';
    this.timeZoneData;
    this.temp
    this.date = new Date();
  }

  async getData() {
    this.timeZoneData = fetch('https://api.api-ninjas.com/v1/worldtime?city=' + this.city, {
      method: 'GET',
      headers: { 
        'X-Api-Key': '18rBryBJKd4zxoN6l6Wtsg==J8oIDsXjakyL46bk'
      },
      contentType: 'application/json'})
      .then(resp => resp.json())
      .then(data => {
        if (data.error) {
          userInput.placeholder = 'Could not find that city'
          return
        } else {
          userInput.placeholder = 'Search'
          this.day = Number(data.day),
          this.hour = Number(data.hour),
          this.min = Number(data.minute),
          this.sec = Number(data.second),
          this.timeZone = data.timezone
        };
      })
    this.timeDifferenceCalc();
    this.getWeather();
    //this.updateWorldClockDisplay();
    this.startInterval();
  };

  async getWeather() {

    this.weatherRequest = fetch(`https://goweather.herokuapp.com/weather/` + this.city)
      .then(response => response.json())
      .then(data => this.temp = data.temperature)
      .catch(error => console.error(error));

    this.updateWorldClockDisplay();
    
  };

  timeDifferenceCalc() {
    this.getEnglishDate = new Date();
    this.dateDifference = this.getEnglishDate.getDate()
    this.gmtTime = this.getEnglishDate.getHours()
    this.userChoiceDay = this.day
    this.userChoiceHour = this.hour
    this.timeDifferenceOutput;

    if (this.timeZone == 'Europe/London') {
      this.timeDifferenceOutput = 'Local time zone';
    } else if (this.dateDifference == this.day && this.userChoiceHour == this.gmtTime) {
      this.timeDifferenceOutput = 'Same as local time'
    } else if (this.dateDifference == this.day) {
      this.timeDifferenceOutput = this.gmtTime - this.userChoiceHour
    } else if (this.dateDifference < this.day) {
      this.userChoiceHour += 24
      this.timeDifferenceOutput = this.gmtTime - this.userChoiceHour
    } else if (this.dateDifference > this.day) {
      this.gmtTime += 24
      this.timeDifferenceOutput = this.gmtTime - this.userChoiceHour
    }

    this.updateWorldClockDisplay();
  };

  onLoad() {
    this.hour = this.date.getHours();
    this.min = this.date.getMinutes();
    this.sec = this.date.getSeconds();
    this.city = 'London'

    this.getWeather();
    this.timeDifferenceCalc();
    this.startInterval();
  };

  updateWorldClockDisplay() {
    timeOutput.textContent = `
    ${this.hour.toString().padStart(2, '0')}:${
      this.min.toString().padStart(2, '0')}:${
      this.sec.toString().padStart(2, '0')}`;

    timeTitle.textContent = this.timeZone;

    weatherOutput.textContent = this.temp;

    if (this.timeDifferenceOutput == 'Local time zone') {
      timeDifference.textContent = 'Local time zone'
    } else if (this.timeDifferenceOutput == 'Same as local time') {
      timeDifference.textContent = 'Same as local time'
    } else if (this.timeDifferenceOutput < 0) {
      timeDifference.textContent = `${Math.abs(this.timeDifferenceOutput)} hours ahead`
    } else if (this.timeDifferenceOutput > 0) {
      timeDifference.textContent = `${this.timeDifferenceOutput} hours behind`
    } 
  };

  startInterval() {
    this.interval = setInterval(() => {
      if (this.hour > 22 && this.min > 58 && this.sec > 58){
        this.hour = 0;
        this.min = 0;
        this.sec = 0;
        this.updateWorldClockDisplay();
      } else if (this.min > 58 && this.sec > 58) {
        this.hour ++;
        this.min = 0;
        this.sec = 0;
        this.updateWorldClockDisplay();
      } else if (this.sec > 58) {
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
const timeDifference = document.querySelector('.time-difference')
const weatherOutput = document.querySelector('.weather')

searchBtn.addEventListener('click', () => {
  if (userInput.value == worldClock.city) {
    userInput.value = ''
    return
  }

  worldClock.city = userInput.value;
  userInput.value = ''
  userInput.placeholder = 'Searching...'
  worldClock.stopInterval();
  worldClock.getData();
});

userInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    if (userInput.value == worldClock.city) {
      userInput.value = ''
      return
    }
  
    worldClock.city = userInput.value;
    userInput.value = ''
    userInput.placeholder = 'Searching...'
    worldClock.stopInterval();
    worldClock.getData();
  }
});

worldClock.onLoad();