require('dotenv').config();

const keys = require('./keys.js');
const moment = require('moment');
const axios = require('axios');

// var spotify = new Spotify(keys.spotify);
console.log(keys.BIT.id);

const lookupCommand = arguments => {
  switch (arguments[2]) {
    case 'concert-this':
      // check to see if artist was provided in the arguments
      if (!arguments[3]) {
        console.log('Enter an artist...');
        break;
      }
      // return venue information for the band
      return getBandsInTown(arguments[3]);

    case 'spotify-this-song':
      return getSpotifySong(arguments[3]);

    case 'movie-this':
      return num1 * num2;

    case 'do-what-it-says':
      return num1 / num2;

    default:
      console.log('enter a valid command...');
      break;
  }
};

const getBandsInTown = (artist = 'celine+dion', id = keys.BIT.id) => {
  axios
    .get('https://rest.bandsintown.com/artists/' + artist + '/events?app_id=' + id)
    .then(function(res) {
      if (!res.data.length) {
        console.log('No venue found for artist ' + artist);
      } else {
        res.data.forEach(value => {
          console.log('Venue Name:', value.venue.name);
          console.log('Venue Located In:', value.venue.city);
          console.log('Event Date:', moment(value.datetime).format('MM/DD/YYYY'));
          console.log('--------------------------------------------------');
        });
      }
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
};

const getSpotifySong = (song, id) => {
  axios
    .get('https://rest.bandsintown.com/artists/' + song + '/events?app_id=' + id)
    .then(function(res) {
      if (!res.data.length) {
        console.log('No venue found for artist ' + artist);
      } else {
        res.data.forEach(value => {
          console.log('Venue Name:', value.venue.name);
          console.log('Venue Located In:', value.venue.city);
          console.log('Event Date:', moment(value.datetime).format('MM/DD/YYYY'));
          console.log('--------------------------------------------------');
        });
      }
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
};

// console.log(lookupCommand(process.argv));
console.log(keys.spotify.id);
