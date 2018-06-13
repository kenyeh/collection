/**
 * Rank list
 */
$(function () {
    var updateTimeStamp = 1566227730000
    var updateNextTime = function (timeStamp) {
        var showTime = new Date(timeStamp);
        updateTimeStamp = timeStamp

        var sh = showTime.getHours()
        var sm = showTime.getMinutes()
        sh = sh < 10 ? '0' + sh : '' + sh;
        sm = sm < 10 ? '0' + sm : '' + sm;

        // console.log(sh, sm )
        $('.rank-list-update-time .time').text(sh + ':' + sm)
    }
    

    var makeList = function (list) {
        var htmlList = [];

        for (var i = 0; i < list.length; i++) {
            var _html = ""
            _html += '<div class="rank-row ' + (list[i].self == 1 ? 'self' : '') + '">';
            _html += '<div class="row-no"><span class="icon">' + (i + 1) + '</span></div>';
            _html += '<div class="row-name">' + list[i].name + '</div>';
            _html += '<div class="row-amount">' + list[i].amount + '</div>';
            _html += '</div>';

            htmlList.push(_html)
        }

        $(".rank-list-body").html('').append(htmlList.join(''));

        /*
        * SimpleBar
        */
        var el = new SimpleBar($('#scroll')[0], {
            autoHide: false
        });
        el.getContentElement();

    }

    var getListData = function () {
        console.log('reflashing')

        $.ajax({
            url: 'ListData.json',
            dataType: 'JSON',
            cache: false,
            type: 'get',
            success: function (rs) {
                if (rs.isSuccess == 1) {
                    updateNextTime(rs.updateTimeStamp)
                    makeList(rs.list)
                } else {
                    // fail
                    console.log(rs.msg);
                }
            }
        });
    }
    getListData()
    var reflashingTimer = setInterval(function () {
        var nowTimeStamp = Date.now()
        var nextTimeStamp = updateTimeStamp

        // console.log(nowTimeStamp+">="+nextTimeStamp)
        if (nowTimeStamp >= nextTimeStamp) {
            getListData()
        }
    }, 1000)
})

$(function () {
    /*
     * signup
     */

    $.ajax({
        url: 'userData.json',
        dataType: 'JSON',
        cache: false,
        type: 'get',
        success: function (rs) {
            if (rs.isSuccess == 1) {
                userData = rs.data

                if (userData.status == 1) {
                    //初始化成功
                    if (userData.activityStatus == 5) {
                        //預熱
                        //-20_"已報名" ,-22_"尚未報名", -23_"LV.51以上(含)自動報名"
                        if (userData.signStatus == -20 || userData.signStatus == -23) {
                            $('.signup-btns .btns').hide().filter(".btn-signup-done").show()

                        } else if (userData.signStatus == -22) {
                            $('.signup-btns .btns').hide().filter(".btn-signup").show()
                        } else {
                            alert("取得报名状态错误！");
                        }
                    } else if (userData.activityStatus == 3) {
                        //活動進行中
                        //-20_"已報名" ,-22_"尚未報名", -23_"LV.51以上(含)自動報名"
                        if (userData.signStatus == -20 || userData.signStatus == -23) {
                            $('.signup-btns .btns').hide().filter(".btn-play").show()

                        } else if (userData.signStatus == -22) {
                            $('.signup-btns .btns').hide().filter(".btn-signup").show()

                        } else {
                            alert("取得报名状态错误！");
                        }

                        //抽獎
                        if (userData.win === '') {
                            $('.lucky-draw .btns').hide().filter(".btn-get").show()
                        } else {
                            $('.lucky-draw .btns').hide().filter(".btn-get-disable").show()
                        }

                    } else {
                        alert("活动状态错误！");
                    }
                } else if (userData.status == -4) {
                    alert("活动尚未开始！");
                } else if (userData.status == -5) {
                    $('.signup-btns .btns').hide().filter(".btn-finished").show()
                    //alert("本次活动已经结束！");
                } else {
                    alert("取得活动资讯发生错误！");
                }
            } else {
                // fail
                console.log(rs.msg);
            }
        }
    });

    $("#signup").click(function(){
        // signup ...
        
    })

})

/**
 * win 
 */
$(function(){
    $(".modal,.btn-close").click(function () {
        $('.modal').fadeOut('fast')
    });
    $(".modal-content").click(function (e) {
        e.stopPropagation()
    });


    $("#luckyDraw").click(function(){
        $('.lucky-draw .btns').hide().filter(".btn-get-disable").show()

        $.ajax({
            url: 'win.json',
            dataType: 'JSON',
            cache: false,
            type: 'get',
            success: function (rs) {
                if (rs.isSuccess == 1) {
                    $(".modal .modal-content .message .win-money").text(rs.data.win);
                    $(".modal").show()
                } else {
                    // fail
                    console.log(rs.msg);
                }
            }
        });

    })

    
})