var OPACITY = 0.5;

var loaded = false;
var loadedData;
var selectedRect;
var selectedData;

function isInsideRect(coords, rect) {
    var minLng = rect[0][0] <= rect[1][0] ? rect[0][0] : rect[1][0],
            minLat = rect[0][1] <= rect[1][1] ? rect[0][1] : rect[1][1],
            maxLng = rect[0][0] <= rect[1][0] ? rect[1][0] : rect[0][0],
            maxLat = rect[0][1] <= rect[1][1] ? rect[1][1] : rect[0][1];
        
        return coords[0][0] >= minLng && coords[2][0] <= maxLng && coords[0][1] >= minLat && coords[2][1] <= maxLat;
}

function filterPoints(points, rect) {
    if (points) {
        selectedRect = points.filter(function(d) {
            return isInsideRect(d.geometry.coordinates[0], rect);
        });
    }

    selectedData = loadedData.filter(function(d) {
        var coords = [ [d.region.lng_min, d.region.lat_min], [], [d.region.lng_max, d.region.lat_max] ];
        return isInsideRect(coords, rect);
    });
}