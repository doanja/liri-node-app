require('dotenv').config();

const keys = require('./keys.js');
const moment = require('moment');
const axios = require('axios');
const Spotify = require('node-spotify-api');
const fs = require('fs');

// console.log(keys.bit.id);
// console.log(keys.omdb.id);

/**
 * function to take commands from process.env and does something..
 * @param {String} primaryArg the argument used to determine what this function will do
 * @param {array} secondaryArg the arguments that follows the primaryArg from process.args
 */
const lookupCommand = (primaryArg, secondaryArg) => {
  console.log('primaryArg (LOOKUPCOMMAND):', primaryArg);
  console.log('secondaryArg (LOOKUPCOMMAND):', secondaryArg);
  switch (primaryArg) {
    case 'concert-this':
      // check to see if artist was provided in the arguments
      if (!secondaryArg) {
        console.log('Enter an artist...');
        break;
      }
      // return venue information for the band
      return getBandsInTown(formatArgs(0, secondaryArg));

    case 'spotify-this-song':
      // check to see if song was provided in the arguments
      if (!secondaryArg) {
        return getSpotifySong('The+Sign');
      }
      // return the song information
      return getSpotifySong(formatArgs(1, secondaryArg));

    case 'movie-this':
      // check to see if song was provided in the arguments
      if (!secondaryArg) {
        console.log('Enter a movie name...');
      }
      return getMovie(formatArgs(0, secondaryArg));

    case 'do-what-it-says':
      getInputFromFile('../files/random.txt');
      break;
    default:
      console.log('Enter a valid command...');
      break;
  }
};

const removeFirstThreeArgs = (arguments = process.argv) => {
  // create a copy of arguments
  const copyOfArgs = [...arguments];

  // removed the first three arguments
  copyOfArgs.splice(0, 3);

  return copyOfArgs;
};

/**
 * function to replace stringify the rest of the arguments and replaces
 * the commas with + or a space
 * @param {number} num the number that indicates which case to replace commas with
 * @param {array} arguments the arguments passed in from process.argv
 */
const formatArgs = (num, arr) => {
  switch (num) {
    case 0:
      // return a string with all the commas replaced with +
      return arr.toString().replace(/,/g, '+');
    case 1:
      // return a string with all the commas replaced with +
      return arr.toString().replace(/,/g, ' ');
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
  console.log('query :', query);
  axios
    .get('http://www.omdbapi.com/?apikey=' + id + '&t=' + query)
    .then(res => {
      if (res.data.Response === 'False') {
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

const getInputFromFile = filename => {
  fs.readFile(filename, 'utf8', (error, data) => {
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    // Then split it by commas (to make it more readable)
    const dataArr = data.split(',');

    const primaryArg = dataArr[0].toString().trim();

    secondaryArg = [...dataArr]
      .splice(1, 1) // grab the second part of the array
      .toString() // turn arr into a string
      // .replace(/['"]+/g, '') // remove quotes
      .split(' '); // build array base on spaces (lookupCommand expects an arr for 2nd arg)
    console.log('dataArr[0] :', dataArr[0]);
    console.log('secondaryArg :', secondaryArg);

    return lookupCommand(primaryArg, secondaryArg);
  });
};

console.log(lookupCommand(process.argv[2], removeFirstThreeArgs()));
