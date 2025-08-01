# Clock App

**Description:** Clock App is a local web application built with JavaScript and Express, showcasing various time-related functionalities such as digital clocks, stopwatches, timers, and a world clock. The app allows users to interact with different time-related features and provides information about weather conditions in various cities worldwide.

## Overview

The Clock App project demonstrates the implementation of a comprehensive time-telling platform using JavaScript and Express. Unit testing using Jest and end-to-end testin with PLaywright and TypeScript have been used to ensure high quality, reliable software.

## Features

- **Digital Clock:** Displays the current local time.
- **Stopwatch:** Provides stopwatch functionality with start, stop, and reset options.
- **Timer:** Allows users to set countdown timers.
- **World Clock:**
  - Enables users to search for cities worldwide and view their local time.
  - Presents weather conditions for selected cities.
  - Indicates the time difference from the user's current location.

## Testing

- Test cases in Excel, check [this Google Sheets document](https://docs.google.com/spreadsheets/d/1IDsBZjnm13Ysvrefxdw6lQETGhbwEpq07cq6NVfk_jM/edit?usp=sharing).
- Intergrated pipeline with GitHub actions
- Automation Summaries:
  - Jest, check [this screenshot](https://drive.google.com/file/d/130Jvf4OeI-K5ZJpRxCwsJtwQjBNy81r5/view?usp=sharing).
  - Playwright, check [this screenshot](https://drive.google.com/file/d/1mOFvBz99-hzzDvEVfcuTxMns0zG6U7BT/view?usp=sharing).  
## Technology Stack

- JavaScript
- Express.js
- HTML/CSS
- Playwright (for end-to-end testing)
- Jest (for unit testing)

## How to Use

Clone the repository:
git clone https://github.com/yourusername/clock-app.git  

Navigate to the app's directory:

cd clock-app
Install dependencies:

npm install
Start the server:

npm start
Open your browser and visit http://localhost:3000 to view the app.

Testing
The Clock App project emphasizes testing to ensure the reliability and functionality of its features. We employ both unit tests with Jest for backend functionalities and end-to-end tests using Playwright with TypeScript for frontend interactions.

**Unit Testing**  
Run unit tests:  
npm test  

**End-to-End Testing**  
Run end-to-end tests:  
npx playwright test
or use the bash scripts attached
