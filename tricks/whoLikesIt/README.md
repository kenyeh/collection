## Who likes it?
js
 
### Description

    likes [] // must be "no one likes this"
    likes ["Peter"] // must be "Peter likes this"
    likes ["Jacob", "Alex"] // must be "Jacob and Alex like this"
    likes ["Max", "John", "Mark"] // must be "Max, John and Mark like this"
    likes ["Alex", "Jacob", "Mark", "Max"] // must be "Alex, Jacob and 2 others like this"



### Solutions

My

    function likes(names) {
        // TODO
        const namesLength = names.length
        if (namesLength === 0) {
            return 'no one likes this'
        } else if (namesLength === 1) {
            return names[0] + ' likes this'
        } else if (namesLength === 2) {
            return names.join(' and ') + ' like this'
        } else if (namesLength === 3) {
            return names[0] + ', ' + names[1] + ' and ' + names[2] + ' like this'
        } else if (namesLength > 3) {
            return names[0] + ', ' + names[1] + ' and ' + (namesLength - 2) + ' others like this'
        }
    }

Clever

    function likes (names) {
        var templates = [
            'no one likes this',
            '{name} likes this',
            '{name} and {name} like this',
            '{name}, {name} and {name} like this',
            '{name}, {name} and {n} others like this'
        ];
        var idx = Math.min(names.length, 4);
        
        return templates[idx].replace(/{name}|{n}/g, function (val) {
            return val === '{name}' ? names.shift() : names.length;
        });
    }

