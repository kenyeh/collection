## Sum Strings as Numbers
js
 
#Description
字串相加
看起來很間單 其實很複雜

主要問題在於 位數過多的特例
如 '712569312664357328695151392' '8100824045303269669937'


    sumStrings('1','2') // => '3'



##Solutions

my

    function sumStrings(a,b) { 
        a = a.replace(/\b(0+)/gi,'')
        b = b.replace(/\b(0+)/gi,'')


        const ary_a = [...a].reverse()
        const ary_b = [...b].reverse()
        const length_a = ary_a.length
        const length_b = ary_b.length
        
        const ary_rs = []
        
        let totalLength = length_a >= length_b ? length_a : length_b
        let addOne = 0
        

        
        for (let i = 1 ; i <= totalLength ; i++) {
            let n_a = ary_a[i - 1] || '0'
            let n_b = ary_b[i - 1] || '0'
            
            
            let add_ab = (+n_a) + (+n_b) + addOne
            
            
            if (add_ab >= 10) {
                addOne = 1
                ary_rs.push(add_ab%10)
                
                if ( i === totalLength) {
                    totalLength += 1
                }
            } else {
                addOne = 0
                ary_rs.push(add_ab)
            }

            
        }
        
        return ary_rs.reverse().join('')
    
    }

best

    function scramble(str1, str2) {
        let occurences = str1.split("").reduce((arr, cur) => { arr[cur] ? arr[cur]++ : arr[cur] = 1; return arr; }, {});
        return str2.split("").every((character) => --occurences[character] >= 0);
    }

Clever

    function sumStrings(a, b) {
        var res = '', c = 0;
        a = a.split('');
        b = b.split('');
        while (a.length || b.length || c) {
            c += ~~a.pop() + ~~b.pop();
            res = c % 10 + res;
            c = c > 9;
        }
        return res.replace(/^0+/, '');
    }
