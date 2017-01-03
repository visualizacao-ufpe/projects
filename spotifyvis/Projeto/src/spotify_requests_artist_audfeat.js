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


jsonfile.readFile(readJsonPath, function(err, readData) {
  //console.log(data);
  // Getting all track ids from an artist
  var tracksIds = "";
  for (var i = 0; i < readData.artists_20_musics[77].musics.length; i++) {
    //console.log(readData.artists_20_musics[77].musics[i].id);
    tracksIds += readData.artists_20_musics[77].musics[i].id + ",";
  }
  // Requesting an object to the Spotify Web API
  console.log(tracksIds);
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // Use the access token to access the Spotify Web API
      var token = body.access_token;
      var options = {
        url: 'https://api.spotify.com/v1/audio-features/?ids=' + tracksIds,
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        console.log(body);
        // Writting requested object to a JSON file
        setUpJSON(readData, body);
      });
    }
  });  
});

function setUpJSON(readData, writeData) {
    for (var i = 0; i < readData.artists_20_musics[77].musics.length; i++) {
      for (var j = 0; j < writeData.audio_features.length; j++) {
        if(readData.artists_20_musics[77].musics[i].id == writeData.audio_features[j].id) {
          var audioinfo = {
            'name' : readData.artists_20_musics[77].musics[i].name,
            'id' : readData.artists_20_musics[77].musics[i].id,
            'danceability' : writeData.audio_features[j].danceability,
            'energy' : writeData.audio_features[j].energy,
            'key' : writeData.audio_features[j].key,
            'loudness' : writeData.audio_features[j].loudness,
            'mode' : writeData.audio_features[j].mode,
            'speechiness' : writeData.audio_features[j].speechiness,
            'acousticness' : writeData.audio_features[j].acousticness,
            'instrumentalness' : writeData.audio_features[j].instrumentalness,
            'liveness' : writeData.audio_features[j].liveness,
            'valence' : writeData.audio_features[j].valence,
            'tempo' : writeData.audio_features[j].tempo,
            'duration_ms' : writeData.audio_features[j].duration_ms,
            'time_signature' : writeData.audio_features[j].time_signature
          }
          readData.artists_20_musics[77].musics[i] = audioinfo;
        }
      }
    }  
    createJSON(readData);
}

function createJSON(data) {
  jsonfile.writeFile(writeJsonPath, data, function(err) {
          console.log(data);
          console.error(err);
    });
}