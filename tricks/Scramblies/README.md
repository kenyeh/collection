## Scramblies
js
 
### Description
確認 s1 內容有 s2

Input strings s1 and s2 are null terminated.


    scramble('rkqodlw', 'world') ==> True
    scramble('cedewaraaossoqqyt', 'codewars') ==> True
    scramble('katas', 'steak') ==> False



### Solutions

my

    function scramble(str1, str2) {
        const countObj = {}
        const ary1 = [...str1]
        const ary2 = [...str2]
        
        ary1.forEach( a => {
        countObj[a] = (countObj[a] || 0 ) + 1
        })
        
        return ary2.every( a => countObj[a]--)
    }

another

    function scramble(str1, str2) {
        let occurences = str1.split("").reduce((arr, cur) => { arr[cur] ? arr[cur]++ : arr[cur] = 1; return arr; }, {});
        return str2.split("").every((character) => --occurences[character] >= 0);
    }

