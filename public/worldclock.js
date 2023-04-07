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

  //gets the timezone data for the users city choice
  async getData() {
    this.timeZoneData = await fetch('https://api.api-ninjas.com/v1/worldtime?city=' + this.city, {
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
    this.startInterval();
  };

  //gets the weather for the users chosen city
  getWeather() {
    this.weatherRequest = fetch(`https://goweather.herokuapp.com/weather/` + this.city, {
      mode: 'no-cors'
    })
    .then(response => response.json())
    .then(data => this.temp = data.temperature)
    .catch(error => console.error(error));

    this.updateWorldClockDisplay(); 
  };

  //calculates the time difference between the users local time and the inputed city
  timeDifferenceCalc() {
    this.getLocalDateInformation = new Date();

    this.localDate = this.getLocalDateInformation.getDate()
    this.localTime = this.getLocalDateInformation.getHours()
    this.timeDifference;

    if (this.timeZone == 'Europe/London') {
      this.timeDifference = 'Local time zone';
    } else if (this.localDate == this.day && this.hour == this.localTime) {
      this.timeDifference = 'Same as local time'
    } else if (this.localDate == this.day) {
      this.timeDifference = this.localTime - this.hour
    } else if (this.localDate < this.day) {
      this.hour += 24
      this.timeDifference = this.localTime - this.hour
    } else if (this.localDate > this.day) {
      this.localTime += 24
      this.timeDifference = this.localTime - this.hour
      console.log(timeDifference)
    }

    this.updateWorldClockDisplay();
  };

  //starts the the timer on page load for the users local time
  onLoad() {
    this.hour = this.date.getHours();
    this.min = this.date.getMinutes();
    this.sec = this.date.getSeconds();
    this.city = 'London'

    this.getWeather();
    this.timeDifferenceCalc();
    this.startInterval();
  };

  //updates the page with all the information required for the world clock
  updateWorldClockDisplay() {
    timeOutput.textContent = `
    ${this.hour.toString().padStart(2, '0')}:${
      this.min.toString().padStart(2, '0')}:${
      this.sec.toString().padStart(2, '0')}`;

    timeTitle.textContent = this.timeZone;

    weatherOutput.textContent = this.temp;

    if (this.timeDifference == 'Local time zone') {
      timeDifferenceOutput.textContent = 'Local time zone'
    } else if (this.timeDifference == 'Same as local time') {
      timeDifferenceOutput.textContent = 'Same as local time'
    } else if (this.timeDifference < 0) {
      timeDifferenceOutput.textContent = `${Math.abs(this.timeDifference)} hours ahead`
    } else if (this.timeDifference > 0) {
      timeDifferenceOutput.textContent = `${this.timeDifference} hours behind`
    } 
  };

  //starts the digital clock timer and increments it every second
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
const timeDifferenceOutput = document.querySelector('.time-difference')
const weatherOutput = document.querySelector('.weather')

//gets the data and updates the page when user clicks the search button
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

//gets the data and updates the page when user clicks the enter key
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

//starts the local clock when the page loads
worldClock.onLoad();