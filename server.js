const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));
console.log(__dirname)

app.get('/', (req,res) => {
  res.render('index.ejs');
});

app.get('/stopwatch', (req,res) => {
  res.render('stopwatch.ejs');
});

app.get('/timersetup', (req,res) => {
  res.render('timersetup.ejs');
});

app.get('/timer', (req,res) => {
  res.render('timer.ejs');
});


app.get('/worldclock', (req,res) => {
  res.render('worldclock.ejs');
});

app.listen(3000);