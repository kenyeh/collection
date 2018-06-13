//資料方法
function local_data(action,data_name,data_value)
{
  var lS=false
  if(('localStorage' in window && window['localStorage']!== null) && typeof(Storage) !== "undefined")
  {
    lS=true
  }

  if(action=='set')
  {
    if(lS)
    {
      localStorage.setItem(data_name, data_value);
    }else{
      setCookie(data_name,data_value,'365');
    }


  }else if(action=='get')
  {
    if(lS)
    {
      return localStorage.getItem(data_name)
    }else{
      return getCookie(data_name)
    }
  }

  //設定 cookie
  function setCookie(cookieName, cookieValue, exdays) {
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
  function getCookie(cookieName) {
    var name = cookieName + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
  }
}