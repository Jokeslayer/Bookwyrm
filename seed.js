require('dotenv').config();
require('./config/database');

const Genre = require('./models/genre');

// For better organization, the seed data is being stored in a separate data.js module
const data = require('./data');

// await needs an async function - use an async IIFE!
(async function() {

  // This time, provide the array of promises in-line
  results = await Promise.all([
    Genre.create(data.genres),
  ]);
  console.log('Created genres:', results[0]);


  // Lastly, use process.exit() to "cleanly" shut down the Node program
  process.exit();
})();

