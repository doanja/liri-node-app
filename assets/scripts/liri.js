require('dotenv').config();

const keys = require('./keys.js');
const moment = require('moment');
const axios = require('axios');
const Spotify = require('node-spotify-api');

console.log(keys.bit.id);
console.log(keys.omdb.id);

const lookupCommand = arguments => {
  switch (arguments[2]) {
    case 'concert-this':
      // check to see if artist was provided in the arguments
      if (!arguments[3]) {
        console.log('Enter an artist...');
        break;
      }
      // return venue information for the band
      return getBandsInTown(formatArgs(0));

    case 'spotify-this-song':
      // check to see if song was provided in the arguments
      if (!arguments[3]) {
        return getSpotifySong('The+Sign');
      }
      // return the song information
      return getSpotifySong(formatArgs(1));

    case 'movie-this':
      // check to see if song was provided in the arguments
      if (!arguments[3]) {
        console.log('Enter a movie name...');
      }
      return getMovie(formatArgs(0));

    case 'do-what-it-says':
      return num1 / num2;

    default:
      console.log('enter a valid command...');
      break;
  }
};

/**
 * function to replace stringify the rest of the arguments and replaces
 * the commas with + or a space
 * @param {number} num the number that indicates which case to replace commas with
 * @param {array} arguments the arguments passed in from process.argv
 */
const formatArgs = (num, arguments = process.argv) => {
  // create a copy of arguments
  const copyOfArgs = [...arguments];

  // removed the first three arguments
  copyOfArgs.splice(0, 3);

  switch (num) {
    case 0:
      // return a string with all the commas replaced with +
      return copyOfArgs.toString().replace(/,/g, '+');
    case 1:
      // return a string with all the commas replaced with +
      return copyOfArgs.toString().replace(/,/g, ' ');
  }
};

/**
 * function used to get venue information
 * @param {string} query the artist to be queried
 * @param {number} id the api id
 */
const getBandsInTown = (query, id = keys.bit.id) => {
  axios
    .get('https://rest.bandsintown.com/artists/' + query + '/events?app_id=' + id)
    .then(res => {
      if (!res.data.length) {
        console.log('No venue found for artist ' + query);
      } else {
        res.data.forEach(value => {
          console.log('Venue Name:', value.venue.name);
          console.log('Venue Located In:', value.venue.city);
          console.log('Event Date:', moment(value.datetime).format('MM/DD/YYYY'));
          console.log('--------------------------------------------------');
        });
      }
    })
    .catch(error => {
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

/**
 * function used to get song information
 * @param {string} query the artist to be queried
 * @param {number} id the api id
 * @param {*} secret the api secret
 */
const getSpotifySong = (query, id = keys.spotify.id, secret = keys.spotify.secret) => {
  const spotify = new Spotify({
    id: id,
    secret: secret
  });

  spotify
    .search({ type: 'track', query: query })
    .then(res => {
      if (!res.tracks.items.length) {
        console.log('No matching songs found for ', query);
      } else {
        res.tracks.items.forEach(track => {
          console.log('Artist:', track.artists[0].name);
          console.log('Song:', track.name);
          console.log('Preview:', track.preview_url);
          console.log('Album:', track.album.name);
          console.log('--------------------------------------------------');
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

/**
 * function used to get movie information
 * @param {string} query the artist to be queried
 * @param {number} id the api id
 */
const getMovie = (query, id = keys.omdb.id) => {
  axios
    .get('http://www.omdbapi.com/?apikey=' + id + '&t=' + query)
    .then(res => {
      if ((res.data.Response = 'False')) {
        console.log('No movie found with name', query);
      } else {
        console.log('Title :', res.data.Title);
        console.log('Year :', res.data.Year);
        console.log('IMDB Rating :', res.data.Ratings[0].Value);
        console.log('Rotten Tomatoes Rating :', res.data.Ratings.length <= 1 ? 'N/A' : res.data.Ratings[1].Value);
        console.log('Country :', res.data.Country);
        console.log('Language :', res.data.Language);
        console.log('Plot :', res.data.Plot);
        console.log('Actors :', res.data.Actors);
      }
      // console.log(res.data.Response = 'False');
    })
    .catch(error => {
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
