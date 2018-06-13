/*
* if Client can't use localStorage , let it use cookie 
*
* $.LocalData( [action] , [data_name] , [data_value])
*
* action    => 'get' or 'set'
* data_name => key name
* data_value => value
*
*/
(function($) {
    $.LocalData = function(action ,data_name ,data_value) {

        if(('localStorage' in window && window['localStorage'] !== null) && typeof(Storage) !== "undefined") {
            this.CheckLocalStorage = true;
        }

        if(action == 'set') {
            if (this.CheckLocalStorage) {
                localStorage.setItem(data_name, data_value);
            } else {
                this.setCookie(data_name,data_value,'365');
            }
        } else if (action == 'get') {
            if (this.CheckLocalStorage) {
                return localStorage.getItem(data_name)
            } else {
                return this.getCookie(data_name)
            }
        } else 
        {
            $.error( '\'' + action + '\' is a illegal parameter')
        }

    }


    $.LocalData.CheckLocalStorage = false;

    //設定 cookie
    $.LocalData.setCookie = function(cookieName, cookieValue, exdays) {
        if (document.cookie.indexOf(cookieName) >= 0) {
            var expD = new Date();
            expD.setTime(expD.getTime() + (-1*24*60*60*1000));
            var uexpires = "expires="+expD.toUTCString();
            document.cookie = cookieName + "=" + cookieValue + "; " + uexpires; 
        } 
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cookieName + "=" + cookieValue + "; " + expires;  
    }

    //讀取 cookie
    $.LocalData.getCookie = function (cookieName) {
        var name = cookieName + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
        }
        return "";
    }
})(jQuery);