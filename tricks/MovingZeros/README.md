## Moving Zeros To The End
js
 
#Description

    moveZeros([false,1,0,1,2,0,1,3,"a"]) // returns[false,1,1,2,1,3,"a",0,0]


##Solutions

my

    var moveZeros = function (arr) {
        const filter0 = arr.filter(x=>x!==0)
        const filterNot0 = arr.filter(x=>x===0)
        
        return [...filter0, ...filterNot0]
    }

best

    var moveZeros = function (arr) {
        return arr.filter(function(x) {return x !== 0}).concat(arr.filter(function(x) {return x === 0;}));
    }

