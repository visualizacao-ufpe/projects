var request = require('request'); // "request" library
var jsonfile = require('jsonfile') // "jsonfile" library
jsonfile.spaces = 2; // setting JSON file identation
var readJsonPath = "./Projeto/json/Base_Artist_TopMusic_Feature.json" // setting JSON load file path
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

var position = 98;

jsonfile.readFile(readJsonPath, function(err, readData) {
  //console.log(readData);
  var currentArtist = readData.artists[position].id;
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        // Use the access token to access the Spotify Web API
        var token = body.access_token;
        var album_type = 'album';
        var market = 'BR';
        var limit = 50;
        var offset = 0;
        var options = {    
          url: 'https://api.spotify.com/v1/artists/' + currentArtist +'/albums?' + 'album_type=' + album_type + '&market=' + market + '&limit=' + limit + '&offset=' + offset,
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
    var albums = [];
    for (var i = writeData.items.length - 1; i >= 0; i--) {
        var album = {
            'name' : writeData.items[i].name,
            'id' : writeData.items[i].id
        }
        albums.push(album);
    }
    var artist = {
        'name' : readData.artists[position]['name'],
        'id' : readData.artists[position]['id'],
        'position' : readData.artists[position]['position'],
        'albums' : albums
    }
    createJSON(artist);
}

function createJSON(data) {
  jsonfile.writeFile(writeJsonPath, data, function(err) {
          console.log(data);
          console.error(err);
    });
}