var request = require('request'); // "request" library
var jsonfile = require('jsonfile') // "jsonfile" library
jsonfile.spaces = 2; // setting JSON file identation
var readJsonPath = "./Projeto/json/Artists_Links.json" // setting JSON load file path
var writeJsonPath = "./Projeto/json/Artists_Links.json" // setting JSON write file path

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
    //console.log(readData);
    var artistsIds = "";
    for(var i = 50; i < 99; i++) {
        artistsIds += readData.nodes[i].id
        if(i != 98) {
            artistsIds += ",";
        }
    }
    console.log("Retrieving genre for the following artists " + artistsIds)
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        // Use the access token to access the Spotify Web API
        var token = body.access_token;
        var options = {    
          url: 'https://api.spotify.com/v1/artists?ids=' + artistsIds,
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
    for (var i = 0; i < writeData.artists.length; i++) {
        for (var j = 50; j < 99; j++) {
            if(writeData.artists[i].id == readData.nodes[j].id) {
              delete readData.nodes[j]['group'];
              readData.nodes[j]['genres'] = writeData.artists[i]['genres'];
            }
        }
    }
    createJSON(readData);
}

function createJSON(data) {
  jsonfile.writeFile(writeJsonPath, data, function(err) {
          //console.log(data);
          console.error(err);
    });
}
