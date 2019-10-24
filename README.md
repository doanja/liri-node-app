# liri-node-app

Liri-node-app is a command line node app that takes in parameters and gives the users data on concerts, songs, and movies.

## Usage

1. Download or clone the repository
2. Add your API keys to ./assets/scripts/.env
3. Run
   ```
   npm install
   ```
4. Navigate to ./assets/scripts/liri.js in the terminal
5. Run the app using:
   ```
   node liri.js parameters
   ```
6. The parameters are:

   ```
    concert-this <artist/band name here>

    spotify-this-song <song name here>

    movie-this <movie name here>

    do-what-it-says
   ```

## Example Output

1. concert-this

   ![concert-this-image](assets/images/concert-this.png?raw=true 'concert-this-image')

2. spotify-this-song
   ![spotify-this-song-image](assets/images/spotify-this-song.png?raw=true 'spotify-this-song-image')

3. movie-this
   ![movie-this-image](assets/images/movie-this.png?raw=true 'movie-this-image')

4. do-what-it-says
   ![do-what-it-says-image](assets/images/do-what-it-says.png?raw=true 'do-what-it-says-image')

## Built With

- node.js
- axios
- dotenv
- moment
- node-spotify-api

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/doanja/Recipe-Sluts/blob/master/LICENSE) file for details
