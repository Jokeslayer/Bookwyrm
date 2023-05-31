require('dotenv').config();
require('./config/database');

const Genre = require('./models/genre');

const data =[
    {genre: 'Horror'},
    {genre: 'High Fantasy'},
    {genre: 'Urban Fantasy'},
    {genre: 'LitRPG'},
    {genre: 'Xanxia'},
    {genre: 'Romance'},
    {genre: 'Young Adult'},
    {genre: 'Satire'},
    {genre: 'Non-Fiction'},
    {genre: 'Reference'},
    {genre: 'Sci-Fi'}
  ];
// await needs an async function - use an async IIFE!
(async function() {

  // This time, provide the array of promises in-line
  results = await Promise.all([
    Genre.create(data),
  ]);
  console.log('Created genres:', results[0]);


  // Lastly, use process.exit() to "cleanly" shut down the Node program
  process.exit();
})();

