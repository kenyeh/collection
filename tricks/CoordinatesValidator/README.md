## Breadcrumb Generator
js
 
#Description
判斷有效 座標
經度 -180 ~ 180
緯度 -90 ~ 90

Here are some valid coordinates:

- -23, 25
- 24.53525235, 23.45235
- 04, -23.234235
- 43.91343345, 143
- 4, -3

And some invalid ones:
- 23.234, - 23.4234
- 2342.43536, 34.324236
- N23.43345, E32.6457
- 99.234, 12.324
- 6.325624, 43.34345.345
- 0, 1,2
- 0.342q0832, 1.2324


##Solutions

my

    function isValidCoordinates(coordinates){
        var spiltData = coordinates.split(',');
        var reguNumber = /^\s*(\-|\+\S$)?\d+(\.\d+)?$/;

        if (spiltData.length > 2) {
            return false;
        }
        
        if (!reguNumber.test(spiltData[0]) || !reguNumber.test(spiltData[1])) {
            return false;
        }
        
        var Latitude = Number(spiltData[0]) ;
        var Longitude = Number(spiltData[1]);
        
        if ( Latitude > 90 || Latitude < -90 ||  Longitude > 180 || Longitude < -180) {
            return false;
        }
        
        return true;
    }

best

    function isValidCoordinates(coordinates){
        var match = coordinates.match(/^[-]?(\d+(?:\.\d+)?), [-]?(\d+(?:\.\d+)?)$/);
        if (!match) { return false; }
        var lat = Math.abs(parseFloat(match[1]));
        var lng = Math.abs(parseFloat(match[2]));
        return lat >= 0 && lat <= 90 && lng >= 0 && lng <= 180;
    }

