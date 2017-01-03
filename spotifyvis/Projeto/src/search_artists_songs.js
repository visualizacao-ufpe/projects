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

var artist_id = "7fIvjotigTGWqjIz6EP1i4";

jsonfile.readFile(readJsonPath, function(err, readData) {


    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        // Use the access token to access the Spotify Web API
        var token = body.access_token;
        var type = "track";
        var q = "artist:\"four%20tops\"";
        var market = "BR";
        var limit = 50;
        var options = {    
          url: 'https://api.spotify.com/v1/search?q=' + q + '&type=' + type + '&market=' + market + '&limit=' + limit,
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
    var musics = [];
    for (var i = 0; i < writeData.tracks.items.length; i++) {
        var music = {
            'name': writeData.tracks.items[i].name,
            'id': writeData.tracks.items[i].id
        }
        musics.push(music);
    }
    readData.artists_20_musics[77].musics = musics;
    createJSON(readData);
}

function createJSON(data) {
  jsonfile.writeFile(writeJsonPath, data, function(err) {
          //console.log(data);
          console.error(err);
    });
}