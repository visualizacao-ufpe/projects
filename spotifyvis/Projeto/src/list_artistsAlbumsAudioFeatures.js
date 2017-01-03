var jsonfile = require('jsonfile') // "jsonfile" library
jsonfile.spaces = 2; // setting JSON file identation
var readJsonPath = "./Projeto/json/artistsAlbumsAudioFeatures.json" // setting JSON load file path
//var writeJsonPath = "./Projeto/json/newartistsAlbumsAudioFeatures.json" // setting JSON write file path

jsonfile.readFile(readJsonPath, function(err, data) { 
    console.log(err);
    
    for(var i = 0; i < data.artists.length; i++) {
        var artist = data.artists[i];
        var artistPosition = artist['position'];
        console.log(artist.name + " @ " + artistPosition);
        for(var j = 0; j < artist.albums.length; j++) {
            var album = artist.albums[j];
            var year = album.released_date.split('-')[0];
            console.log('\t' + album.name + ' (' + year + ')');
            for(var k = 0; k < album.tracks.length; k++) {
                var track = album.tracks[k];
                var track_disc = track.disc_number;
                var track_number = track.track_number;
                var track_name = track.name;
                console.log('\t\t' + track_disc + '.' + track_number + '. ' + track.name);
            }
        }
    }
    /*
    for(var i = 0; i < data.artists.length; i++) {
        //var artist = data.artists[i];
        //console.log(artist.name);
        for(var j = 0; j < data.artists[i].albums.length; j++) {
            //var readAlbum = data.artists[i].albums[j];
            if(data.artists[i].albums[j].hasOwnProperty('release_date')) {
                var album = {
                    'name': data.artists[i].albums[j]['name'],
                    'id': data.artists[i].albums[j]['id'],
                    'released_date': data.artists[i].albums[j]['release_date'],
                    'tracks': data.artists[i].albums[j]['tracks']
                }
               data.artists[i].albums[j] = album;
            }
            //var year = album.release_date.split('-')[0];
            //console.log('\t' + album.name + ' (' + year + ')');
        }
    }
    
    data.artists.sort(dynamicSort('position'));
    jsonfile.writeFile(writeJsonPath, data, function(err) { 
        console.log(err);
    });
    */
});

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}