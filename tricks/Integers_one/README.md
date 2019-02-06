## Integers: Recreation One
js
 
### Description

Divisors of 42 are : 1, 2, 3, 6, 7, 14, 21, 42. These divisors squared are: 1, 4, 9, 36, 49, 196, 441, 1764. The sum of the squared divisors is 2500 which is 50 * 50, a square!

Given two integers m, n (1 <= m <= n) we want to find all integers between m and n whose sum of squared divisors is itself a square. 42 is such a number.

The result will be an array of arrays or of tuples (in C an array of Pair) or a string, each subarray having two elements, first the number whose squared divisors is a square and then the sum of the squared divisors.

n 到 m 之間 找出某個數所有因數平方 相加 會等於一個 正方形面積 並列出 [某數 , 正方形面積]


    list_squared(1, 250) --> [[1, 1], [42, 2500], [246, 84100]]
    list_squared(42, 250) --> [[42, 2500], [246, 84100]]




### Solutions

My

    function listSquared(m, n) {
        const result = []
        
        for (let i = m; i <= n; i++) {
        
            let total_pow = 0
            
            for (let j = 1; j <= (Math.floor(Math.sqrt(i))); j++) {

                if (i % j === 0 && j !== i/j) {
                    total_pow = total_pow + Math.pow(j, 2) + Math.pow(i/j, 2)
                } else if (i === 1) {
                    total_pow = 1
                }
            }

            if (Number.isInteger(Math.sqrt(total_pow))) {
                result.push([i, total_pow])
            }
            
            
        }

        return result
    
    }

Clever

    function listSquared(m, n) {
        var arr = [];
        for (var i = m; i <= n; i++){
            var temp = 0;
            for (var j = 1; j <= i; j++) {
                if ( i % j == 0) temp += j*j;  
            };
            if ( Math.sqrt(temp) % 1 == 0) arr.push([i, temp]);
        };
        return arr;
    }



