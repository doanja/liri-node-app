require('dotenv').config();

const keys = require('./keys.js');
const fetch = require('node-fetch');
const moment = require('moment');
const axios = require('axios');

// var spotify = new Spotify(keys.spotify);

// console.log(keys.BIT.id);

const lookupCommand = arguments => {
  if (!arguments[3]) {
    return 'NaN';
  } else {
    switch (arguments[2]) {
      case 'concert-this':
        // console.log('concert-this is called');
        return getBandsInTown2(arguments[3]);

      case 'spotify-this-song':
        return num1 - num2;

      case 'movie-this':
        return num1 * num2;

      case 'do-what-it-says':
        return num1 / num2;

      default:
        console.log('enter a valid command...');
        break;
    }
  }
};

const getBandsInTown = (artist = 'celion+dion', key = keys.BIT.id) => {
  const url = 'https://rest.bandsintown.com/artists/' + artist + '/events?app_id=' + key;

  fetch(url, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      // check if response is null and clg
      if (data) {
        console.log('No venue found...');
      } else {
        Object.values(data).forEach(value => {
          console.log('Venue Name:', value.venue.name);
          console.log('Venue Located In:', value.venue.city);
          console.log('Event Date:', moment(value.datetime).format('MM/DD/YYYY'));
          console.log('--------------------------------------------------');
        });
      }
    })
    .catch(err => {
      console.log('error :', err);
    });
};

const getBandsInTown2 = () => {
  axios
    .get('https://rest.bandsintown.com/artists/celine+dion/events?app_id=codingbootcamp')
    .then(function(data) {
      Object.values(data).forEach(value => {
        console.log('Venue Name:', value.venue);
        // console.log('Venue Located In:', value.venue.city);
        // console.log('Event Date:', moment(value.datetime).format('MM/DD/YYYY'));
        // console.log('--------------------------------------------------');
        console.log(value);
      });
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

console.log(lookupCommand(process.argv));
