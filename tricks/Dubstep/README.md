## Dubstep
js
 
#Description
移除 'WUB' 詞彙

    songDecoder("WUBWEWUBAREWUBWUBTHEWUBCHAMPIONSWUBMYWUBFRIENDWUB")
    // =>  WE ARE THE CHAMPIONS MY FRIEND


##Solutions

my

    function songDecoder(song){
        return song.replace(/(WUB)+/g," ").trim()
    }

another

    function songDecoder(song){
        return song.split('WUB').filter(Boolean).join(' ');
    }

