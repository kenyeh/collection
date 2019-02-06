## Sort the odd
js
 
### Description
偶數不動 只排序基數


    sortArray([5, 3, 2, 8, 1, 4]) == [1, 3, 2, 8, 5, 4]



### Solutions

my

    function sortArray(array) {
        // Return a sorted array.
        
        const aryKeysOdd = [...array.keys()].filter(x => array[x]%2)
        
        //   console.log(aryKeysOdd)
        
        const orderOddAry = aryKeysOdd.map((x) => array[x]).sort((a,b) => a - b)
        
        //   console.log(orderOddAry)
        
        aryKeysOdd.forEach((item, index)=> {
            array[item] = orderOddAry[index]
        })
        
        return array
    }

best

    function sortArray(array) {
        const odd = array.filter((x) => x % 2).sort((a,b) => a - b);
        return array.map((x) => x % 2 ? odd.shift() : x);
    }

