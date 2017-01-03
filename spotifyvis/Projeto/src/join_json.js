var jsonfile = require('jsonfile') // "jsonfile" library
jsonfile.spaces = 2; // setting JSON file identation
var readJsonPath1 = "./Projeto/json/Base_Artist_20_Musics_Feature.json" // setting JSON load file path
var readJsonPath2 = "./Projeto/json/Artists_Links.json" // setting JSON load file path
var writeJsonPath = "./Projeto/json/Artists_Links.json" // setting JSON write file path

jsonfile.readFile(readJsonPath1, function(err1, dataOne) { 
    jsonfile.readFile(readJsonPath2, function(err2, dataTwo) { 
        setUpJSON(dataOne, dataTwo);
    }); 
});

function setUpJSON(readDataOne, readDataTwo) {
    //var related_artists = [];
    //console.log("Retrieved a total of " + writeData.artists.length + " artists");
    for (var i = 0; i < readDataOne.artists_20_musics.length; i++) {
        for(var j = 0; j < readDataTwo.nodes.length; j++) {
            if(readDataOne.artists_20_musics[i].id == readDataTwo.nodes[j].id) {
                delete readDataTwo.nodes[j].genres;
                readDataTwo.nodes[j]['position'] = readDataOne.artists_20_musics[i].position;
                readDataTwo.nodes[j]['genres'] = readDataOne.artists_20_musics[i].genres;
                readDataTwo.nodes[j]['related_artists'] = readDataOne.artists_20_musics[i].related_artists;
                readDataTwo.nodes[j]['musics'] = readDataOne.artists_20_musics[i].musics;
            }
        } 
    }
    createJSON(readDataTwo);
}

function createJSON(data) {
  jsonfile.writeFile(writeJsonPath, data, function(err) {
          //console.log(data);
          console.error(err);
    });
}