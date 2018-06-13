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

        //判斷報名
        signup=data['signup']
        if(signup)
        {
            $(".SignUpbtn").css("background","url(images/btn-signuped.png)no-repeat;").html("");
        }

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
            $(".phone_body").css("background","url(images/full.png)no-repeat left top");
        }
    }

});
/*取得資料 且頁面載入成功*/
$(window).load(function() {

    if (mis_step==0) return 


    //var data_step = local_data('get','step',mis_step)
    var data_step = $.LocalData('get','step',mis_step);
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

                //local_data('set','step',mis_step)
                $.LocalData('set','step',mis_step);
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


    })