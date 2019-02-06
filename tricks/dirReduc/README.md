## 簡化路徑
js
 
### Description
簡單說 就是消除 彼此相反路徑
>這邊有個備註
>
>   ["NORTH", "WEST", "SOUTH", "EAST"]
>
>這個並不會消除，須保留 (估計每次移動距離不見得一樣)



    dirReduc(["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"]) => ["WEST"]
    dirReduc(["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH"]) => []



### Solutions

my

    function dirReduc(arr){
        const mapData = {
            NORTH: "SOUTH",
            SOUTH: "NORTH",
            EAST: "WEST",
            WEST: "EAST"
        }
        
        const newArr = arr.reduce( (accumulator, currentValue) => {
            if (mapData[currentValue] === accumulator[accumulator.length - 1]) {
                accumulator.pop()
            } else {
                accumulator.push(currentValue)
            }
            return accumulator
        }, [])
        
        return newArr
    }

Clever (神解)

    function dirReduc(arr) {
        var str = arr.join(''), pattern = /NORTHSOUTH|EASTWEST|SOUTHNORTH|WESTEAST/;
        while (pattern.test(str)) str = str.replace(pattern,'');
        return str.match(/(NORTH|SOUTH|EAST|WEST)/g)||[];
    }

