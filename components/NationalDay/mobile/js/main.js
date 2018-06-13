var activity_1 = (function ($) {
    return {
        /* public fn */
        start: function (act_data) {
            var Link = "#";

            // 1:请报名 2:活动未开始已报名 3:活动开始已报名
            if (act_data.singup == 1) {
                // 活动1报名连结
                Link = "#1";
                $('.act1-singup').addClass('singup').prop("href", Link)
            }else if (act_data.singup == 2) {
                Link = "javascript:alert('已报名')";
                $('.act1-singup').addClass('singup-done').prop("href", Link)
            }else if (act_data.singup == 3) {
                // 投注连结
                Link = "#3";
                $('.act1-singup').addClass('singup-done-play').prop("href", Link)
            }

        }
    }
})(jQuery);


var activity_2 = (function ($) {
    var changeDate = function () {
        var today = new Date();
        var dd = today.getDate();

        $(".a1-show-date .today").text(dd)
    }
    var setCoin = function (get, money) {
        var $coin = $('.a1-get-prize .coin'),
            $money = $coin.find('.money'),
            $text = $coin.find('.show-text'),
            $msgMoney = $coin.find('.get-money')
            
        //get  0:资格不符  1:有资格
        if (get === 1) {
            // 有资格
            if (money > 0) {
                // 已领取
                $text.text('已领取')
                $money.text(money)
            } else {
                // 未领取
                $text.text('点我领取')
                $coin.one("click",function(){
                    // 领取
                    $.ajax({
                        url: 'getMoney.json',
                        dataType: 'JSON',
                        cache: false,
                        type: 'get',
                        success: function (data) {
                            if (data.state == 1) {
                                console.log('领取');
                                // 已领取
                                $text.text('已领取')
                                $money.text(data.getMoney)
                                $msgMoney.find(".text-money").text(data.getMoney);
                                $msgMoney.fadeIn('fast');
                                setTimeout(function(){
                                    $msgMoney.fadeOut('fast');
                                },2000)
                            } else {
                                // fail
                                console.log(data.msg);
                            }
                        }
                    });

                })
            }
        } else {
            // 资格不符
            $text.text('资格不符')
        }
    }

    return {
        /* public fn */
        start: function (act_data) {
            // show today date
            changeDate();

            // coin
            setCoin(act_data.ableToGetMoney, act_data.getMoney)
        },
        setSingup: function(singup,state) {
            // 活动2报名连结
            var singupLink = "#";
            // 投注连结
            var playLink = "#";
            var $btnSingup = $('.act2-singup')
            
            // 0:未报名 1:已报名

            if(state == 'over'){
                // 报名结束
                $btnSingup.addClass("singup-over").prop("href", "javascript:alert('报名结束')");
            } else if (singup == 0 && (state == 'notYet'  || state == 'during') ) {
                // 未报名
                $btnSingup.addClass('singup').prop("href", singupLink)
            } else if (singup == 1) {
                // 已报名
                if (state == 'notYet') {
                    // 活动未开始
                    $btnSingup.addClass('singup-done').prop("href", "javascript:alert('已报名')");
                } else if (state == 'during') {
                    // 活动中
                    $btnSingup.addClass('singup-done-play').prop("href", playLink)
                }

            }
        },
        setProgressBar : function (act_data) {

            var $progressBar = $(".a2-money-bar .bar-line-inside"),
                $userNum = $(".a2-money-bar .now-num"),
                $limitNum = $(".a2-money-bar .end-num"),
                percentNum = (Number(act_data.user_amount)/ Number(act_data.total_amount) * 100 ).toFixed(2)
        
            $limitNum.text(act_data.total_amount);
            $userNum.text(act_data.user_amount).css("left",Number(10 + (0.65 * percentNum)) + "vw");
            $progressBar.css("width",percentNum + "%")
            //console.log('act2 percentNum ',percentNum);
            
            $(".a2-show-money").text(act_data.deposit_money)

        },
        btnEnable : function () {
            // 投注连结
            var playLink = "#";
            // 充值连结
            var depositLink = "#";
            $(".act2-deposit").removeClass("unable").prop("href", depositLink).click(function(){
                // deposit ga
                ga('send', 'event', '活动页交互', window.location.pathname, '充值点击');
            });
            $(".act2-play").removeClass("unable").prop("href", playLink);

            $(".card2").css("opacity","1");
        }

    }
})(jQuery);

var activity_3 = (function ($) {
    var countNextTime = function (nextTime) {
            var n  = new Date();
            var now  = new Date(2017,10,n.getDate(),n.getHours(),n.getMinutes(),n.getSeconds());
            var next  = new Date(2017,10,nextTime.day,nextTime.hh,0,0);
            var diff = (next - now) / 1000;

            console.log(2017,10,n.getDate(),n.getHours(),n.getMinutes(),n.getSeconds());
            console.log(2017,10,nextTime.day,nextTime.hh,0,0);

            var sh,
                sm,
                ss;

            var $timeCounter = $('.time-counter')

            console.log(diff);

            var timer = setInterval(function(){
                if(diff == 0) {
                    clearInterval(timer)
                    // to play
                    setPlay();
                    return ;
                }
                diff -= 1

                sh = Math.floor(diff / 3600), // 小时数
                sm = Math.floor(diff % 3600 / 60), // 分钟数
                ss = diff % 3600 % 60;
            
                sh = sh < 10 ? '0' + sh : '' + sh;
                sm = sm < 10 ? '0' + sm : '' + sm;
                ss = ss < 10 ? '0' + ss : '' + ss;

                //console.log(sh,sm,ss)
                $timeCounter.text(sh + ':' + sm + ':' + ss)

            },1000)

        },
        setPlay = function() {
            var $wheelcCenter = $('.wheel-game .wheel-center');
            var nextGameSet = function(){

                $wheelcCenter.find('.center-text').text('敬请期待');
                $wheelcCenter.css("cursor","auto");
                $wheelcCenter.off('click');

                var n  = new Date();
                if(n.getHours() >= 22) {
                    // next day
                    countNextTime({
                        day: n.getDate() + 1,
                        hh: 10
                    })

                    setPrize(1)

                } else {
                    countNextTime({
                        day: n.getDate(),
                        hh: n.getHours() + 1
                    })

                    if(n.getHours() == 16) {
                        setPrize(2)
                    }
                }
            };
            var checkGameOverTime = function() {

                var t = setInterval(function(){
                    var n  = new Date();
                    
                    if(n.getMinutes() >= 10){
                        // game over
                        nextGameSet();
                        clearInterval(t)
                    }
                },1000)
            }
            
            $wheelcCenter.css("cursor","pointer")
            $wheelcCenter.find('.center-text').text('立即抽奖');

            // check game over time
            checkGameOverTime()

            $wheelcCenter.one("click",function(){
                console.log('get the prize')

                $(".wheel").removeClass('run').addClass('go');
                $wheelcCenter.find('.center-text').text('开奖中');

                
                $.ajax({
                    url: 'getPrize.json',
                    dataType: 'JSON',
                    cache: false,
                    type: 'get',
                    success: function (data) {
                        if (data.state == 1) {
                            // showing prize
                            console.log('prizeID:',data.getPrizeID);
                            var PrizeID = data.getPrizeID;
                            //console.log(prizeList);
                            var the_deg = (((360 / prizeList.length) * (PrizeID)));

                            setTimeout(function(){
                                // slow down
                                console.log('slow down');
                                $(".wheel").removeClass('go');
                                $(".wheel").animateRotate((360 + the_deg), 1500, "easeOutSine", function(){
                                    console.log('end'); //this is supposed to be the DOM node, but it isn't
                                    console.log('you got the ', prizeList[PrizeID])
                                    var $msg = $('.get-message'),
                                        prizeName = prizeList[PrizeID];

                                    
                                    $('.light').fadeIn();

                                    // set msg
                                    if(prizeName.indexOf('感谢') >= 0) {
                                        $msg.find('.thanks').show();
                                        $msg.find('.win').hide();
                                    } else if (prizeName.indexOf('游戏币') >= 0) {
                                        $msg.find('.thanks').hide();
                                        $msg.find('.win').show();
                                        $msg.find('.win .gift-name').text(prizeName)
                                        $msg.find('.win .gift-link-msg').hide()
                                    } else {
                                        $msg.find('.thanks').hide();
                                        $msg.find('.win').show();
                                        $msg.find('.win .gift-name').text(prizeName)
                                        $msg.find('.win .gift-link-msg').show()
                                    }

                                    $msg.fadeIn('fast',function(){
                                        setTimeout(function(){
                                            $msg.fadeOut();
                                            $('.light').fadeOut();

                                            console.log('rotate ',(360 + the_deg) ,720);
                                            $(".wheel").animateRotate(720, 15000, "linear", function(){
                                                console.log('animate done');
                                                $(".wheel").css({
                                                    'transform' : 'rotate(0deg)'			
                                                }).addClass('run')
                                            },(360 + the_deg))

                                            

                                            // next game set
                                            nextGameSet()
                                            
                                        },5000)
                                    })

                                    
                                });

                            },2000);

                        } else {
                            // fail
                            alert(data.msg)
                            window.location.reload()
                            console.log(data.msg);
                        }
                    }
                });
                
            });
        },
        prizeList = [],
        setPrize = function(id) {
            console.log('setPrize',id)
            var prizeSetingID = id,
                prizes = {
                    prize1: [
                        '感谢',
                        '感谢',
                        '20元话费',
                        '感谢',
                        '10元话费',
                        '感谢',
                        '感谢',
                        '感谢',
                        '18元游戏币',
                        '感谢',
                        '5元话费',
                        '感谢'
                    ],
                    prize2: [
                        '周生生5克金牌',
                        '星巴克月饼',
                        '索尼充电宝',
                        '30元话费',
                        '20元话费',
                        '18元游戏币',
                        '10元话费',
                        '8元游戏币',
                        '5元话费',
                        '感謝',
                        '188元游戏币',
                        '扫地机器人'
                    ]
                };

            // fixed cheange bug
            $('.time1-text,.time2-text').stop()

            if(id == 2) {
                prizeList = prizes.prize2
                $('.time1-text').fadeOut('fast',function(){
                    $('.time2-text').fadeIn('fast');
                });
                $('.wheel').fadeOut('fast',function(){
                    $(this).css("background-image", "url(../images/act3-wheel-2.png)").fadeIn('fast');
                });  
            } else {
                prizeList = prizes.prize1;
                $('.time2-text').fadeOut('fast',function(){
                    $('.time1-text').fadeIn('fast');
                });
                $('.wheel').fadeOut('fast',function(){
                    $(this).css("background-image", "url(../images/act3-wheel-1.png)");
                    $(this).fadeIn('fast');
                });
            }
        };

    
    // animate Rotate
    $.fn.animateRotate = function(angle, duration, easing, complete, start = 0) {
        var args = $.speed(duration, easing, complete);
        var step = args.step;
        return this.each(function(i, e) {
            args.step = function(now) {
                $.style(e, 'transform', 'rotate(' + now + 'deg)');
                if (step) return step.apply(this, arguments);
            };
    
            $({deg: start}).animate({deg: angle}, args);
        });
    };
    

    return {
        /* public fn */
        initGame: function (gameState) {
            
            var now  = new Date();
            var time_10am = new Date(now.getFullYear(),now.getMonth(),now.getDate(),10,0,0);
            var time_17pm = new Date(now.getFullYear(),now.getMonth(),now.getDate(),16,10,0);
            var time_22pm = new Date(now.getFullYear(),now.getMonth(),now.getDate(),22,10,0);
            var day = now.getDate();
            var hh = now.getHours();
            var mm = now.getMinutes();

            $(".wheel").addClass('run')
            
            // prize
            if (time_17pm <= now && now < time_22pm ) {
                console.log('17:00 至 22:10');
                // 17:00 至 23:00
                setPrize(2)
            } else {
                setPrize(1)
            }
            
            if (time_10am > now || now >= time_22pm ) {
                // 22 ~ 10
                // next time 
                // day+1 : 10 : 00
                if( hh >= 22 ) {
                    now.setDate(day + 1);
                    day = now.getDate();
                }
                console.log('22pm ~ 10am ',day,':',10);
                
                countNextTime({
                    day: day,
                    hh: 10
                })

                setPrize(1)
                

            } else {
                
                if( mm < 10){
                    //0:尚未领取 1:领取
                    if(gameState){
                        console.log('played ',day,':',hh );
                        if (hh == 16 ) {
                            setPrize(2)
                            countNextTime({
                                day: day,
                                hh: hh+1
                            })
                        } else if (hh == 22) {
                            console.log('hh == 22');
                            setPrize(1)
                            now.setDate(day + 1);
                            day = now.getDate();
                            countNextTime({
                                day: day,
                                hh: 10
                            })
                        } else {
                            countNextTime({
                                day: day,
                                hh: hh+1
                            })
                        }


                        
                    } else {
                        console.log('playing time');
                        setPlay();
                    }
                    

                } else {
                    console.log('next ',day,':',hh+1);

                    countNextTime({
                        day: day,
                        hh: hh+1
                    })
                }


                
            }

            console.log(prizeList);
        }
    }
})(jQuery);



$(function () {

    // pop rules
    $(".btn-open-rule").click(function(){
        var ruleId = $(this).attr("rule")
        var rule_blocks = $(".pop-block").find(".pop-main .rules");
        var rule_block = rule_blocks.filter(".rule" + ruleId)

        var scroll_top = $(window).scrollTop();
        $('.pop-block .pop-content').css("top",(scroll_top + 50) + "px")

        rule_blocks.hide();
        rule_block.show(function(){
            $(".pop-block").fadeIn('fast')
        });
    });
    $(".pop-close").click(function(){
        $(".pop-block").fadeOut('fast')
    });
    $(".pop-block").click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $(this).fadeOut('fast')
    });
    $('.pop-block .pop-content').click(function(e){
        e.stopPropagation();
    })



    // act2 taps
    $(".taps-btn").click(function () {
        var _this = $(this),
            tapId = _this.attr('tapId'),
            _this_act = _this.find('.btn-act')

        if (!_this_act.is(":visible")) {
            //tap
            $(".taps-btn .btn-act").fadeOut('fast')
            _this_act.fadeIn('fast');
            //tap-block
            $('.act2-tap-block>div').fadeOut('fast')
            $('.tapbody-' + tapId).fadeIn('fast');
            //button
            $('.act2-btns').hide()
            $('.act2-btns.act2-btn-a' + tapId).show()

        }
    });

    var checkActivityDate = function(start_date, end_date, over_date) {
        var q = new Date();
        var m = q.getMonth();
        var d = q.getDate();
        var y = q.getFullYear();
        var today = new Date(y,m,d);
        
        var startDate = new Date(start_date);
        var endDate = new Date(end_date);
        var overDate = over_date ? new Date(over_date) : '';

        //console.log(today,startDate,endDate);
        if(startDate <= today && today <= endDate){
            console.log('during');
            return "during";
        } else if(today < startDate) {
            console.log('notYet');
            return "notYet";
        } else if(endDate < today  && today < overDate) {
            console.log('over');
            return "over";
        } else if(endDate < today) {
            console.log('passed');
            return "passed";
        }
    }

    // set activity time
    var activity1_time = {
            startDate: '2017-09-18',
            endDate: '2017-09-30'
        },
        activity2_time = {
            startDate: '2017-09-25',
            endDate: '2017-09-30',
            overDate: '2017-10-08'
        },
        activity3_time = {
            startDate: '2017-10-01',
            endDate: '2017-10-08'
        };


    // init user data

    var userData = {}

    $.ajax({
        url: 'userData.json',
        dataType: 'JSON',
        cache: false,
        type: 'get',
        success: function (data) {
            if (data.state == 1) {
                // 活动状态
                var act1_state = checkActivityDate(
                        activity1_time.startDate,
                        activity1_time.endDate
                    ),
                    act2_state = checkActivityDate(
                        activity2_time.startDate,
                        activity2_time.endDate,
                        activity2_time.overDate
                    ),
                    act3_state = checkActivityDate(
                        activity3_time.startDate,
                        activity3_time.endDate
                    )


                // success
                console.log('get user data')
                userData = data

                console.log(userData);

                // act 1 
                if (act1_state == 'notYet' || act1_state == 'during') {
                    // act1 start
                    activity_1.start({
                        singup: userData.act1_singup
                    })
                }

                // act 2
                // 第二重 ProgressBar
                activity_2.setProgressBar({
                    deposit_money: userData.deposit_money,
                    user_amount: userData.act2_user_amount,
                    total_amount: userData.act2_total_amount
                })
                $('.tapbody-2').hide();

                if (act2_state == 'during') {
                    // 第一重 start
                    activity_2.start({
                        singup: userData.act2_singup,
                        ableToGetMoney: userData.act2_ableToGetMoney,
                        getMoney: userData.act2_getMoney
                    })

                    activity_2.btnEnable();

                } else if (act2_state == 'over' || act2_state == 'passed') {
                    if(act2_state == 'over') {
                        activity_2.btnEnable();
                    }

                    //tap
                    $(".taps-btn .btn-act").fadeOut('fast')
                    $(".taps-btn.btn2 .btn-act").fadeIn('fast');
                    //tap-block
                    $('.act2-tap-block>div').fadeOut('fast')
                    $('.tapbody-2').fadeIn('fast');
                    //button
                    $('.act2-btns').hide()
                    $('.act2-btns.act2-btn-a2').show()

                    $('.a1-get-prize .coin').find('.show-text').text('活动结束')

                    $(".a2-title").removeClass("state1").addClass('state2');
                }
                
                // act2 Singup
                activity_2.setSingup(userData.act2_singup,act2_state);



                //act3 
                if (act3_state == 'during') {
                    // timer and game set
                    activity_3.initGame(userData.act3_game_state);

                    $(".card3").css("opacity","1");
                } else if(act3_state == 'passed') {
                    $('.wheel-center .center-text').text('活动结束')
                }
                
                
            } else {
                // fail
                console.log(data.msg);
            }
        }
    });

});