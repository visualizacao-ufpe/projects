var jsonfile = require('jsonfile') // "jsonfile" library
jsonfile.spaces = 2; // setting JSON file identation
var readJsonPath = "./Projeto/json/Base_Artist_20_Musics_Feature.json" // setting JSON load file path
var writeJsonPath = "./Projeto/json/Artists_Links.json" // setting JSON write file path

jsonfile.readFile(readJsonPath, function(err, readData) {
    //console.log(err);
    // Varre cada artista (nó)
    var nodes = [];
    var links = [];
    var noTargets = []
    for (var i = 0; i < readData.artists_20_musics.length; i ++) {
        var node = {
            'name': readData.artists_20_musics[i].name,
            'id': readData.artists_20_musics[i].id,
            'group': Math.ceil(10 * readData.artists_20_musics[i].position / 100)
        }
        nodes.push(node);
        var sourceID = readData.artists_20_musics[i].id;
        var sourceName = readData.artists_20_musics[i].name;
        var possibleTargets = readData.artists_20_musics[i].related_artists;
        var matches = 0;
        // Varre cada artista relacionado
        for (var j = 0; j < possibleTargets.length; j++) {
            //console.log(possibleTargets);
            // Varra cada artista para comparar com os artistas relacionados
            for(var k = 0; k < readData.artists_20_musics.length; k++) {
                if(possibleTargets[j].id === readData.artists_20_musics[k].id) {
                    //matches += 1;
                    var targetID = readData.artists_20_musics[k].id;
                    var targetName = readData.artists_20_musics[k].name;
                    // Calculte weight of edges
                    var value = 0;

                    var sumAS = 0,
                        sumDS = 0,
                        sumES = 0,
                        sumIS = 0,
                        sumVS = 0;

                    var sumAT = 0,
                        sumDT = 0,
                        sumET = 0,
                        sumIT = 0,
                        sumVT = 0;

                    var limit = readData.artists_20_musics[i].musics.length > readData.artists_20_musics[k].musics.length ? 
                        readData.artists_20_musics[k].musics.length : readData.artists_20_musics[i].musics.length
                    for(var l = 0; l < limit; l++) {
                        sumAS += readData.artists_20_musics[i].musics[l]["acousticness"]
                        sumDS += readData.artists_20_musics[i].musics[l]["danceability"]
                        sumES += readData.artists_20_musics[i].musics[l]["energy"]
                        sumIS += readData.artists_20_musics[i].musics[l]["instrumentalness"]
                        sumVS += readData.artists_20_musics[i].musics[l]["valence"]

                        sumAT += readData.artists_20_musics[k].musics[l]["acousticness"]
                        sumDT += readData.artists_20_musics[k].musics[l]["danceability"]
                        sumET += readData.artists_20_musics[k].musics[l]["energy"]
                        sumIT += readData.artists_20_musics[k].musics[l]["instrumentalness"]
                        sumVT += readData.artists_20_musics[k].musics[l]["valence"]
                    }
                    var avgAS = sumAS/limit,
                        avgDS = sumDS/limit,
                        avgES = sumES/limit,
                        avgIS = sumIS/limit,
                        avgVS = sumVS/limit;

                    var avgAT = sumAT/limit,
                        avgDT = sumDT/limit,
                        avgET = sumET/limit,
                        avgIT = sumIT/limit,
                        avgVT = sumVT/limit;

                    var difA = Math.abs(avgAS - avgAT),
                        difD = Math.abs(avgDS - avgDT),
                        difE = Math.abs(avgES - avgET),
                        difI = Math.abs(avgIS - avgIT),
                        difV = Math.abs(avgVS - avgVT);

                    var difSum = difA + difD + difE + difI + difV

                    value = Math.ceil(difSum * 10);

                    var link = {
                        'source': sourceID,
                        'target': targetID,
                        'value': value
                    }
                    //console.log("Source artist: " + link.source.name + " | Target artist: " + link.target.name);
                    links.push(link);
                }
            } 
        }
        //if(matches == 0) { noTargets.push(node) };
    }
    var writeData = {
        'nodes': nodes,
        'links': links
    }
    /*
    for(var j = 0; j < noTargets.length; j++) {
        for (var i = 0; i < writeData.links.length; i++) {
            if(noTargets[j].id === writeData.links[i].target.id) {
                console.log(noTargets[j].name + " is targeted by " + writeData.links[i].source.name)
            }
        }
    }
    */
    jsonfile.writeFile(writeJsonPath, writeData, function(err) {
        //console.log(err);
    })
})