## Vigenère cipher
js
 
### Description

[維吉尼亞密碼](https://zh.wikipedia.org/wiki/%E7%BB%B4%E5%90%89%E5%B0%BC%E4%BA%9A%E5%AF%86%E7%A0%81)

在一個[凱撒密碼](https://zh.wikipedia.org/wiki/%E5%87%B1%E6%92%92%E5%AF%86%E7%A2%BC)中，字母表中的每一字母都會作一定的偏移，例如偏移量為3時，A就轉換為了D、B轉換為了E……而維吉尼亞密碼則是由一些偏移量不同的愷撒密碼組成。

為了生成密碼，需要使用表格法。這一表格包括了26行字母表，每一行都由前一行向左偏移一位得到。具體使用哪一行字母表進行編譯是基於密鑰進行的，在過程中會不斷地變換。

Example

    var alphabet = 'abcdefghijklmnopqrstuvwxyz';
    var key = 'password';

    // creates a cipher helper with each letter substituted
    // by the corresponding character in the key
    var c = new VigenèreCipher(key, alphabet);

    c.encode('codewars'); // returns 'rovwsoiv'
    c.decode('laxxhsj');  // returns 'waffles'


### Solutions

My

    function VigenèreCipher(key, abc) {
        const abc_ary = [...abc]
        const abc_length = abc_ary.length
        const key_ary = [...key]
        this.encode = function (str) {
            const rs_ary = [];
            [...str].map(function (x, index) {
                // repeat the key
                let keyIndex = index % key_ary.length
                
                // start index
                let st = abc_ary.indexOf(x)
                
                // not match
                if (st === -1) {
                    rs_ary.push(x)
                    return ;
                }
                
                // shift index
                let sf = abc_ary.indexOf(key_ary[keyIndex])
                
                // find index in the map
                rs_ary.push(abc_ary[ (st + sf ) % abc_length])
            
            })
            
            return rs_ary.join('');
            
        };
        this.decode = function (str) {
            const rs_ary = [];
            [...str].map(function (x, index) {
                // repeat the key
                let keyIndex = index % key_ary.length
                
                // check exists 
                let xIndex = abc_ary.indexOf(x)
                
                // not match
                if (xIndex === -1) {
                    rs_ary.push(x)
                    return ;
                }
                
                // shift index
                let sf = abc_ary.indexOf(key_ary[keyIndex])
                
                // after shift index
                let af = abc_ary.indexOf(xIndex)
                
                // find index in the map
                if (xIndex < sf) {
                    xIndex = xIndex + abc_length
                }
                rs_ary.push(abc_ary[ (xIndex -  sf )])
            
            })
            
            return rs_ary.join('');
        };
    }





