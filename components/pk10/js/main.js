$(function(){
    var userData = {}
    /* 
    userData:
    days => 签到 天数列表
    money => 投注金额
    longestDays => 连续投注了几日
    gameState => 游戏状态
                0:未开始
                1:开始报名
                2:已报名
                3:游戏结束
    */
    $('.signup-body').children().css('display','none')
    
    $.ajax({
        url: 'userData.json',
        dataType: 'JSON',
        cache: false,
        type: 'get',
        success: function (data) {
            if (data.state == 1) {
                userData = data

                showAnimation.call(this, data)
                var $signup = $('.signup-body')

                $signup.children().css('display','none')
                if (data.gameState == 0) {
                    $signup.children('.notyet').css('display','block')
                } else if (data.gameState == 1) {
                    $signup.children('.btn-signup').css('display','block')
                } else if (data.gameState == 2) {
                    $signup.children('.btn-signuped').css('display','block')
                } else {
                    $signup.children('.over').css('display','block')
                }
            } else {
                // fail
                console.log(data.msg);
            }
        }
    });
    

    var numberAnimation = function (elId, showNum) {
        var $el = $('#' + elId)
        var aryNum = showNum.toString().split('').reverse()
        var numLength = aryNum.length
        // console.log('numLength', numLength)

        var initHtml = ''

        for (var i = 0 ; i < numLength; i++) {
            initHtml += "<span class='num-text text-none'></span>"
        }
        $el.append(initHtml)
        var $numbers = $el.find('.num-text')
        // console.log('$numbers', $numbers)

        /* for 1 ~ showNum
        for (var i = 1 ; i <= parseInt(showNum); i++) {
            (function(n){
                
                var showBitsNumber = function (n) {
                    var num_bits = n.toString().split('').reverse()
                    console.log('num_bits', num_bits)
                    for (var j = 0 ; j < num_bits.length; j++) {
                        
                        console.log('j', j)
                        console.log(num_bits[j])
                        $numbers.eq(numLength - 1 - j).removeClass().addClass('num-text text-' + num_bits[j])
                    }
                }
                
                var time = setTimeout(function() {
                    console.log('n', n)
                    showBitsNumber(n)
                }, 10 * (n + 1));
            })(i)
        }
        */
        

        for (var j = 0 ; j < numLength; j++) {
            var this_n = aryNum[j]
            if (this_n === '.') {
                $numbers.eq(numLength - 1 - j).removeClass().addClass('num-text text-dot')
            } else {
                for (var i = 0 ; i <= parseInt(this_n); i++) {

                    (function(n, el){
                        var time = setTimeout(function() {
                            // console.log(n)
                            el.removeClass().addClass('num-text text-' + n)
                        }, (100 * (n + 1 + j)));
                    })(i, $numbers.eq(numLength - 1 - j))
                    
                }
            }
            
        }
    }

    var progressAnimation = function (data, callback) {
        $progress = $('.progress')
        
        $.each(data, function( index, value ) {
            $progress = $progress.queue('showing', function(next){
                $progressItem = $progress.find('.bar-' + (index + 1))

                if (index == (data.length - 1)) {
                    next = callback
                }

                if(value){
                    if (index == 2 || index == 5) {
                        $progressItem.find('.line').animate({width: '107px'},'fast',next);
                    } else {
                        $progressItem.find('.line').animate({width: '102px'},'fast',next);
                    }
                    
                } else {
                    $progressItem.find('.num').animate({opacity: 0.2},'fast',next);
                }

                
            })
        });


        //start queue
        $progress.dequeue('showing');
    }
    var flagAnimation = true;
    var showAnimation = function (userData, show) {
        
        if(!$.isEmptyObject(userData) && show) {
            console.log('showAnimation')
            console.log(userData)
            flagAnimation = false;
            progressAnimation(userData.days, function(){
                numberAnimation('money', userData.money)
                numberAnimation('longestDays', userData.longestDays)
            })
            
        }
        
    }
    
    //監聽scoll
    $(window).scroll(function(){
        var TopPx=$(window).scrollTop();
        var content2_p = $("#content2").offset().top - ($(window).height() / 4)

        //console.log(TopPx, content2_p)

        if (TopPx > content2_p) {
            // start show animation
            if (flagAnimation) {
                
                showAnimation(userData, 1)
            }
            
        }
    });

    // 报名
    $('#signup').click(function(){
        $.ajax({
            url: 'signup.json',
            dataType: 'JSON',
            cache: false,
            type: 'get',
            success: function (data) {
                if (data.state == 1) {
                    if (!data.check) {
                        // fail
                        $('.pop-block').fadeIn('fast')
                    }
                } else {
                    // fail
                    console.log(data.msg);
                }
            }
        });
    });

    $('.pop-close').click(function(){
        $('.pop-block').fadeOut('fast')
    });

    
});