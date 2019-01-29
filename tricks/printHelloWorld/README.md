## Hello W... wait what?
js
 
#Description
Disallowed functionality:

    Strings
    Numbers
    Regular Expressions
    Functions named "Hello", "World", "HelloWorld" or anything similar.
    Object keys named "Hello", "World", "HelloWorld" or anything similar.

Without using the above, output the string "Hello World!" to prove that there is always a way.

在不能用
字串
數字
正則
物件和函數 都不能命名為 "HelloWorld" 相關

打印出 "HelloWorld"



##Solutions

my

    var helloWorld = function () {
        // Hello world!
        const word_H = (true+true+true+true+true+true+true).toString() + (true+true).toString()
        const word_e = (+true).toString() + (+false).toString() + (+true).toString()
        const word_l = (+true).toString() + (+false).toString() + (true+true+true+true+true+true+true+true).toString()
        const word_o = (+true).toString() + (+true).toString() + (+true).toString()
        const word_W = (true+true+true+true+true+true+true+true).toString() + (true+true+true+true+true+true+true).toString()
        const word_r = (+true).toString() + (+true).toString() + (true+true+true+true).toString()
        const word_d = (+true).toString() + (+false).toString() + (+false).toString()
        
        const speace = (true+true+true).toString() + (true+true).toString()
        const exclamation = (true+true+true).toString() + (true+true+true).toString()
        
        const rs = String.fromCharCode(word_H, word_e, word_l, word_l, word_o, speace, word_W, word_o, word_r, word_l, word_d, exclamation)

        return rs
    }

還有各種方式... [][(![]+[])....

