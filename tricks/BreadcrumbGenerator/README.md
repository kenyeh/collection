## Breadcrumb Generator
js
 
#Description
轉換成 麵包導航條

    generateBC("mysite.com/pictures/holidays.html", " : ") == '<a href="/">HOME</a> : <a href="/pictures/">PICTURES</a> : <span class="active">HOLIDAYS</span>'
    generateBC("www.codewars.com/users/GiacomoSorbi", " / ") == '<a href="/">HOME</a> / <a href="/users/">USERS</a> / <span class="active">GIACOMOSORBI</span>'
    generateBC("www.microsoft.com/docs/index.htm", " * ") == '<a href="/">HOME</a> * <span class="active">DOCS</span>'

超過三十個字數時候要簡化
very-long-url-to-make-a-silly-yet-meaningful-example ＝> VLUMSYME

並且要過濾無效字
["the","of","in","from","by","with","and", "or", "for", "to", "at", "a"]


    generateBC("mysite.com/very-long-url-to-make-a-silly-yet-meaningful-example/example.htm", " > ") == '<a href="/">HOME</a> > <a href="/very-long-url-to-make-a-silly-yet-meaningful-example/">VLUMSYME</a> > <span class="active">EXAMPLE</span>'
    generateBC("www.very-long-site_name-to-make-a-silly-yet-meaningful-example.com/users/giacomo-sorbi", " + ") == '<a href="/">HOME</a> + <a href="/users/">USERS</a> + <span class="active">GIACOMO SORBI</span>'


##Solutions

my

    function generateBC(url, separator) {
        //your code here
        
        // remove https http ? #
        url = url.split("https://")[1] || url;
        url = url.split("http://")[1] || url;
        url = url.split("?")[0];
        url = url.split("#")[0];

        
        // split 
        var split_ary = url.split("/");
        
        // use separator 
        var lvLink = "\/";
        var rs_ary = [];
        
        var titleFixed = function (str) {
            var filterWords = ["the","of","in","from","by","with","and", "or", "for", "to", "at", "a"]
            
            if (str.length > 30) {
                var str_ary = str.split("-");
                var new_ary = []
                str_ary = str_ary.forEach(function(item, index) {
                    if (filterWords.indexOf(item) === -1) {
                    new_ary.push([...item][0]);
                    }
                })
            
                str = new_ary.join('');
            } else {
                str = str.replace(/-/g, ' ')
            }
            
            return str.toUpperCase();
        }
        
        var bulid = function (title) {
            _html = '<a href="' + lvLink + '">' + titleFixed(title) + '</a>'
            
            rs_ary.push(_html);
        }
        
        // has no subtitle
        if (split_ary.length <= 2 ) {
            if (split_ary.length == 1) {
                return '<span class="active">HOME</span>';
            } else if (split_ary[1].indexOf('index') >= 0 || split_ary[1] == '') {
                return '<span class="active">HOME</span>';
            }
        }
        
        var theLastEl = '';
        split_ary.forEach((element, index) => {
            if ( (index + 1) ==  split_ary.length) {

            // the last is not a link
            var last_tag = element.split('.')[0] || element
            if (last_tag === 'index') {
                last_tag = theLastEl
                rs_ary.pop();
            }
            rs_ary.push('<span class="active">' + titleFixed(last_tag) + '</span>');
            
            } else if (index === 0) {
                // the first is home
                bulid('HOME');
            } else {
                theLastEl = element;
                lvLink += element + "\/";
                
                bulid(element);
            }
        })
        
        
        return (rs_ary.join(separator));
    
    }

best

    function generateBC(url, separator) {
        var arr = url.replace(/((\/index)?\.(html?|(ph|as)p))|(\?.+|#.+|https?:\/\/|\/$)/g, '').split('/'), link='';
        return arr.map(function(v, i, a) {
            if(a.length === 1) {
                return '<span class="active">HOME</span>'
            } else if(i === a.length -1) {
                return '<span class="active">'+ acronymize(v) +'</span>';   
            } else if(i===0) {
                return '<a href="/">HOME</a>';      
            } else {
                link = link ? link + '/' + v : v; 
                return '<a href="/'+ link +'/">'+ acronymize(v) +'</a>';
            }
        }).join(separator);
    }

    function acronymize(str) {
        var removeList = ["the","of","in","from","by","with","and", "or", "for", "to", "at", "a"],
            re = new RegExp("^(" + removeList.join('|') + ")$"), newStr = '';
        if(str.length > 30) {
            str.split('-').forEach(v => !re.test(v) ? newStr += v[0] : undefined);
            return newStr.toUpperCase();
        } else {
            return str.replace(/-/g, ' ').toUpperCase();;
        }
    }

