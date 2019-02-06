## Title Case
js
 
### Description
參數2 需要小寫的字
如果為整句第一個字 還是需要大寫

    titleCase('a clash of KINGS', 'a an the of') // should return: 'A Clash of Kings'
    titleCase('THE WIND IN THE WILLOWS', 'The In') // should return: 'The Wind in the Willows'
    titleCase('the quick brown fox') // should return: 'The Quick Brown Fox'



### Solutions

My

    function titleCase(title, minorWords) {
    
        const title_ary = title !== '' && title ? title.split(' ') : [] ;
        const minor_ary = minorWords !== ''  && minorWords ? minorWords.toLowerCase().split(' ') : [] ;
        
        const str_ary = []
        
        if (title_ary.length === 0) {
            return '';
        }
        
        title_ary.forEach(function (word, index) {
            let [first, ...rest] = [...word];
            let check_minor_indexOf = minor_ary.indexOf(word.toLowerCase())
            
            if (index === 0 || check_minor_indexOf === -1) {
            
                first = first.toUpperCase();
                rest = Array.from(rest, (n) => n.toLowerCase())
            
            } else {
                [first, ...rest] = [...minor_ary[check_minor_indexOf]];
            }
            
            str_ary.push([...first, ...rest].join(''))
        });
        

        
        return str_ary.join(' ');
    }

best

    function titleCase(title, minorWords) {
        var minorWords = typeof minorWords !== "undefined" ? minorWords.toLowerCase().split(' ') : [];
        return title.toLowerCase().split(' ').map(function(v, i) {
            if(v != "" && ( (minorWords.indexOf(v) === -1) || i == 0)) {
                v = v.split('');
                v[0] = v[0].toUpperCase();
                v = v.join('');
            }
            return v;
        }).join(' ');
    }



