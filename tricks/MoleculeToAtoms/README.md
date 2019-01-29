## Molecule to atoms
js
 
#Description
拆解元素

    var water = 'H2O';
    parseMolecule(water); // return {H: 2, O: 1}

    var magnesiumHydroxide = 'Mg(OH)2';
    parseMolecule(magnesiumHydroxide); // return {Mg: 1, O: 2, H: 2}

    var fremySalt = 'K4[ON(SO3)2]2';
    parseMolecule(fremySalt); // return {K: 4, O: 14, N: 2, S: 4}





##Solutions

my

    function parseMolecule(formula) {

        var filterStartSymbol = /[\[]|[\(]|[\{]/i;
        var filterEndSymbol = /[)]|[\]]|[}]/i;
        var matchEdnSymbol = {
            '(': ')',
            '[': ']',
            '{': '}'
        };
        
        
        var data_obj = {};
        
        var check_lowercase = function (str)   
        {          
            if (/^[a-z]+$/.test( str ))    
            {   
                return true;   
            }    
            
            return false;   
        }
        var check_uppercase = function (str)   
        {          
            if (/^[A-Z]+$/.test( str )) {   
                return true;   
            }    
            return false;   
        }
        var check_number = function (str) {          
            if (/^\d+$/.test(str)) {   
                return true;   
            }    
            
            return false;   
            
        } 
        
        var mergeData = function (newData) {
            var thisData = data_obj;
            
            Object.keys(newData).map(function(objectKey, index) {
                var item = newData[objectKey];
                
                if (thisData[objectKey]) {
                // exist
                thisData[objectKey] += item
                } else {
                // new item 
                
                thisData[objectKey] = item
                }
            });
            
            return thisData;
        }
        
        var parseElement = function (str , multiply) {
            var str_ary = [...str];
            var elementName = "";
            var elementNum = 1;
            var thisObj = {};
            var contentFlg = false;
            var contentStr = '';
            var tenTimesCount = 1;
            var contentNum = 1;// default
            var newName = '';
            var startSymbol = '';
            
            str_ary.forEach((char, index) => {
            
                if (matchEdnSymbol[startSymbol] === char) {
                    if (check_number(str_ary[index + 1])) {
                    contentNum = str_ary[index + 1] * multiply;
                    }

                    parseElement(contentStr, contentNum);
                    
                    // reset
                    contentStr = '';
                    startSymbol = '';
                    contentNum = 1;
                }
                
                // bulid content
                if (startSymbol !== '') {
                    contentStr += char;
                    return ;
                }
                
                if ( filterStartSymbol.test(char) ) {
                    // next bulid content
                    startSymbol = char ;
                }  else if (check_uppercase(char)) {
                    elementNum = 1;
                    elementName = char;
                    
                    if (thisObj[elementName]) {
                        thisObj[elementName] += elementNum * multiply;
                    } else {
                        thisObj[elementName] = elementNum * multiply;
                    }
                    
                } else if (check_lowercase(char)) {
                    // rename element 
                    // create new
                    newName = elementName + char;
                    if (thisObj[newName]) {
                        thisObj[newName] += 1 * multiply;
                    } else {
                        thisObj[newName] = 1 * multiply;
                    }
                    
                    // delete old
                    delete thisObj[elementName];
                    // replace name
                    elementName = newName;
                    
                } else if (check_number(char)) {
                    elementNum = +char;
                    
                    // item is a contentobj
                    if (filterEndSymbol.test(str_ary[index - 1]) && index !== 0) {
                        // skip
                    } else if (check_number(str_ary[index - 1]) && index !== 0) {
                        // numbers 
                        thisObj[elementName] = ( (thisObj[elementName] * 10) + elementNum ) * multiply
                    } else {
                        thisObj[elementName] = elementNum * multiply;
                    }
                    
                } 

            });
            
            // merge data 
            data_obj = mergeData(thisObj)
        }

        parseElement(formula, 1)
        
        return data_obj;
    }

Clever

    function parseMolecule(formula) {
        var group, tokens, tokenExp = /([{(\[]|[})\]]|[A-Z][a-z]?)(\d*)/g, stack = [[]];
        while (tokens = tokenExp.exec(formula)) {
            tokens[2] = tokens[2] || 1;
            if (/^[A-Z]/.test(tokens[1])) {
                while (tokens[2]--) stack.push(stack.pop().concat([tokens[1]]));
            } else if (/[{\(\[]/.test(tokens[1])) {
                stack.push([]);
            } else {
                group = stack.pop();
                while (tokens[2]--) stack.push(stack.pop().concat(group))
            }
        }
        return stack[0].reduce(function (count, x) {
            count[x] = (count[x] || 0) + 1;
            return count;
        }, {});
    }

