## 水仙花數
js
 
#Description
一個N位非負整數，其各位數字的N次方和等於該數本身。

     1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153

     1^4 + 6^4 + 3^4 + 4^4 = 1 + 1296 + 81 + 256 = 1634


##Solutions

my

    function narcissistic( value ) {
        const vAry = [...value.toString()]
        const vLength = vAry.length
        
        return vAry.reduce((acc, curr) => {
            return +acc + Math.pow(+curr,vLength)
        }, 0) === value
    
    }

best

    function narcissistic( value ) {
        return ('' + value).split('').reduce(function(p, c){
            return p + Math.pow(c, ('' + value).length)
            }, 0) == value;
    }

