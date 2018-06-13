var mis_step;
var load_flag=false;
$(function(){
  

  //讀取數值
  $.ajax({
    url: 'data.json',
    dataType: 'json',
    cache: false,
    contentType: "application/json; charset=utf-8",
    success:function(data) {
      var puzzle_data = data;
      //console.log(rich_data);
      init_data(puzzle_data);
      
      load_flag=true;
    },error: function(msg) {
      alert(msg);
    }
  });

  function init_data(data)
  {
    mis_step=data['mission']
    
    show_puzzle(mis_step)
    
  }

  function show_puzzle(step)
  {
    /*設定順序*/
    var ini_ary=new Array('p1','p5','p2','p3','p4');
    
    /* 0 離開*/
    if (step==0) return 
    
    
    for(var i=1;i<=step;i++)
    {
      var p_id=ini_ary[i-1];
      $(".pf."+p_id+",.pb."+p_id).show();
      $(".dot."+p_id).hide();
    }
    
    if(step==5)
    {
      $(".pf,.pb").hide();
      $(".phone_body").css("background","url(images/full.png)no-repeat center top");
      $(".phone_body").css("background-size","90% auto");
    }
  }
  
});
/*取得資料 且頁面載入成功*/
$(window).load(function() {
    
    if (mis_step==0) return 
    
    var data_step=local_data('get','step',mis_step)
    console.log(data_step)
    
    var chk_alert=setInterval(function(){
      
      if(load_flag)
      {
        /*提醒*/
        var mis_money=new Array('','28','58','288','888','5888');
        var mis_step_string=new Array('','一','二','三','四','五');

        if(mis_step!=data_step)
        {
          if(mis_step>=5)
          {
            alert('恭喜您完成所有任务，获得奖金'+mis_money[mis_step]+'元，累积奖金'+count(mis_step)+'元！明日平台公告将公布前三位获得iPhone7用户名单！');
          }else
          {
            alert('恭喜您完成任务'+mis_step_string[mis_step]+'，可获得'+mis_money[mis_step]+'元奖金。累积奖金'+count(mis_step)+'元！');
          }
          
          local_data('set','step',mis_step)
        }

        
        window.clearInterval(chk_alert)
      }
      
      function count(step)
      {
        var count_n=0;
        for(var i=1;i<=step;i++)
        {
          count_n=count_n+parseInt(mis_money[i])
        }
        
        return count_n
      }
      
    },1000)
    
    //資料方法
    function local_data(action,data_name,data_value)
    {
      var lS=false
      if(('localStorage' in window && window['localStorage']!== null) && typeof(Storage) !== "undefined")
      {
        lS=true
        console.log("lS")
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
})