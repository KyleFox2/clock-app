import Clock from '/digitalclock.js'

//gets the span elements from the index.html file and initializes the Clock class
const timeDisplay = document.querySelector('.time');
const dateDisplay = document.querySelector('.date');

const clock = new Clock(timeDisplay, dateDisplay);