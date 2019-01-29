## Moving Zeros To The End
js
 
#Description
序列累加
如結果為負數 視為0 求總和

    maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4])
    // should be 6



##Solutions

my

    var maxSequence = function(arr){
        let maxNum = 0
        let thisNum = 0
        
        for (let i = 0; i < arr.length; i++) {
            thisNum = thisNum + arr[i]
            if (thisNum > maxNum) {
                maxNum = thisNum
            } else if (thisNum < 0) {
                thisNum = 0
            }
        }
        
        return maxNum
    }

clever

    var maxSequence = function(arr){
        var min = 0, ans = 0, i, sum = 0;
        for (i = 0; i < arr.length; ++i) {
            sum += arr[i];
            min = Math.min(sum, min);
            ans = Math.max(ans, sum - min);
        }
        return ans;
    }

