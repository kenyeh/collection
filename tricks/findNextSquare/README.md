## 找下一個正方形
js
 
#Description

    findNextSquare(121) --> returns 144
    findNextSquare(625) --> returns 676
    findNextSquare(114) --> returns -1 since 114 is not a perfect


##Solutions

my

    function findNextSquare(sq) {
        let sqrtNum = Math.sqrt(sq)
        return Number.isInteger(sqrtNum) ? Math.pow(sqrtNum + 1, 2) : -1
    }

best

    function findNextSquare(sq) {
        return Math.sqrt(sq)%1? -1 : Math.pow(Math.sqrt(sq)+1,2);
    }

