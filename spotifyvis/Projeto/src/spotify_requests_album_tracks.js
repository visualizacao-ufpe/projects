var request = require('request'); // "request" library
var jsonfile = require('jsonfile') // "jsonfile" library
jsonfile.spaces = 2; // setting JSON file identation
var readJsonPath = "./Projeto/json/talkingheadsAlbums.json" // setting JSON load file path
var writeJsonPath = "./Projeto/json/talkingheadsAlbums.json" // setting JSON write file path

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

var position = 7;

jsonfile.readFile(readJsonPath, function(err, readData) {
  //console.log(readData);
  var currentAlbum = readData.albums[position].id;
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        // Use the access token to access the Spotify Web API
        var token = body.access_token;
        var market = 'BR';
        var limit = 50;
        var options = {    
          url: 'https://api.spotify.com/v1/albums/' + currentAlbum + '/tracks?market=' + market + '&limit=' + limit,
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
    var tracks = [];
    for (var i = 0; i < writeData.items.length; i++){
        var track = {
            'name' : writeData.items[i].name,
            'id' : writeData.items[i].id,
            'disc_number' : writeData.items[i].disc_number,
            'track_number' : writeData.items[i].track_number
        }
        tracks.push(track);
    }
    readData.albums[position]['tracks'] = tracks;
    createJSON(readData);
}

function createJSON(data) {
  jsonfile.writeFile(writeJsonPath, data, function(err) {
          console.log(data);
          console.error(err);
    });
}