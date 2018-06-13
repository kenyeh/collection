$(function(){
    $.ajax({
        url: 'data.json',
        dataType: 'JSON',
        cache: false,
        type: 'get',
        success: function (data) {
            if (data.isSuccess === 1) {
                btnState(data.state)
                numberState(data.yourNumber, data.f3dNumber)
            } else {
                // fail
                console.log(data.msg);
            }
        }
    });

    var btnState = function (state) {
        // state:
        // 0 => 尚未开始
        // 1 => 抽号
        // 2 => 抽号已结束
        var $btn = $('.btn-action');
        if (state === 0) {
            $btn.prop('disabled', true).text('抽号尚未开始')
        } else if (state === 1) {
            $btn.prop('disabled', false).text('获取添运号')
        } else {
            $btn.prop('disabled', true).text('抽号已结束')
        }
    }
    var numberState = function (your, f3d) {
        showingNumber($('.your-numbers .numbers'), your)
        showingNumber($('.f3d-numbers .numbers'), f3d)

        if (your !== "") {
            $('.btn-action').prop('disabled', true).text('已领取')
            if (your === f3d) {
                // win
                $('.f3d-numbers, .your-numbers').find('.numbers').addClass('win');
                $('.modal').addClass('win')
                    .find('.message')
                    .html('<p>幸运之星,恭喜您获得一部iPhone X,</p><p>请记得填写领奖资料哦!</p>')
                    .end().show()
            }
        }

    }
    var showingNumber = function ($el , numbers) {
        var ary_numbers = numbers.toString().split("")
        if (numbers !== "") {
            $el.addClass('got-num').find('.number').each(function (index,element) {
                $(element).text(ary_numbers[index])
            });
        }
    }

    $(".modal-close").click(function () {
        $(".modal").fadeOut('fast')
    });
    $(".modal-content").click(function (e) {
        e.stopPropagation()
    });

    $('.btn-action').click(function () {
        $.ajax({
            url: 'getNumber.json',
            dataType: 'JSON',
            cache: false,
            type: 'get',
            success: function (data) {
                if (data.isSuccess === 1) {
                    // result:
                    // 1 => 领取
                    // 2 => 未达
                    // 3 => 达上限
                    if (data.result === 1 && data.number !== "") {
                        showingNumber($('.your-numbers .numbers'), data.number)
                        $('.btn-action').prop('disabled', true).text('已领取')
                    } else if (data.result === 2) {
                        $('.modal')
                            .addClass('notEnough')
                            .find('.message')
                            .html('<p>APP投注销量满1000元才可以参加喔!</p>')
                            .end().show()
                    } else {
                        $('.modal')
                            .find('.message')
                            .html('<p>慢了一步!<br>本次号码已发放完毕！</p>')
                            .end().show()
                    }
                } else {
                    // fail
                    console.log(data.msg);
                }
            }
        });
    })
})