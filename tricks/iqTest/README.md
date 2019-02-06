## IQ Test
js
 
### Description

    iqTest("2 4 7 8 10") => 3 // Third number is odd, while the rest of the numbers are even

    iqTest("1 2 1 1") => 2 // Second number is even, while the rest of the numbers are odd


### Solutions

my

    function iqTest(numbers){
        let data = [
            {
                num: 0,
                index: 0
            },
            {
                num: 0,
                index: 0
            }
        ]
        numbers.split(' ').forEach((item, index) => {
            data[item % 2].num += 1
            data[item % 2].index = index + 1
        })
        
        return data[0].num === 1 ? data[0].index : data[1].index
    }

best

    function iqTest(numbers){
        numbers = numbers.split(" ").map(function(el){return parseInt(el)});
        
        var odd = numbers.filter(function(el){ return el % 2 === 1});
        var even = numbers.filter(function(el){ return el % 2 === 0});
        
        return odd.length < even.length ? (numbers.indexOf(odd[0]) + 1) : (numbers.indexOf(even[0]) + 1);
    }

