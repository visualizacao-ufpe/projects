var request = require('request'); // "request" library
var jsonfile = require('jsonfile') // "jsonfile" library
jsonfile.spaces = 2; // setting JSON file identation
var readJsonPath = "./Projeto/json/Base_Artist_20_Musics_Feature.json" // setting JSON load file path
var writeJsonPath = "./Projeto/json/Base_Artist_20_Musics_Feature.json" // setting JSON write file path

var client_id = 'dc13fba2787b4e0cb75e5e1ab8ce02c1'; // Your client id
var client_secret = 'ebb24dac379746d7a1fa4d9aaf27702e'; // Your secret

// Requesting authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

var position = 98;

jsonfile.readFile(readJsonPath, function(err, readData) {
    //console.log(readData);
    var currentArtist = readData.artists_20_musics[position].id;
    console.log("Retrieving related artists for " + readData.artists_20_musics[position].name)
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        // Use the access token to access the Spotify Web API
        var token = body.access_token;
        var options = {    
          url: 'https://api.spotify.com/v1/artists/' + currentArtist +'/related-artists',
          headers: {
            'Authorization': 'Bearer ' + token
          },
          json: true
        };
        request.get(options, function(error, response, body) {
          //console.log(body);
          setUpJSON(readData, body);
        });
      }
    });
})


function setUpJSON(readData, writeData) {
    var related_artists = [];
    console.log("Retrieved a total of " + writeData.artists.length + " artists");
    for (var i = 0; i < writeData.artists.length; i++){
        var relatedArtist = {
            'name' : writeData.artists[i].name,
            'id' : writeData.artists[i].id,
        }
        console.log("Retrieved " + relatedArtist.name)
        related_artists.push(relatedArtist);
        
    }
    readData.artists_20_musics[position]['related_artists'] = related_artists;
    createJSON(readData);
}

function createJSON(data) {
  jsonfile.writeFile(writeJsonPath, data, function(err) {
          //console.log(data);
          console.error(err);
    });
}
