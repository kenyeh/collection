## Extract the domain name from a URL
js
 
### Description

    domainName("http://github.com/carbonfive/raygun") == "github" 
    domainName("http://www.zombie-bites.com") == "zombie-bites"
    domainName("https://www.cnet.com") == "cnet"



### Solutions

My

    function domainName(url){
        return url.replace(/(^\w*\:\/\/)|(^www\.)/, '').replace(/^www\./, '').split('.')[0]
    }

Clever

    function domainName(url){
        url = url.replace("https://", '');
        url = url.replace("http://", '');
        url = url.replace("www.", '');
        return url.split('.')[0];
    };



