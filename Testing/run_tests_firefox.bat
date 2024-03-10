@echo off
echo Starting local server...

rem Navigates to the directory where the server is located
cd C:\Users\kyles\Documents\Projects\clock-app

rem Start the local server
start npm start

rem Wait for a 5 seconds to allow the server to start
timeout /t 5

echo Running Playwright tests...

rem Navigates to the directory where the tests are located
cd C:\Users\kyles\Documents\Projects\clock-app\testing

rem Run Playwright tests in firefox
npx playwright test --project=firefox

rem Opens test report
npx playwright show-report