$(function () {
    var getData = function () {
        $.ajax({
            url: 'data.json',
            dataType: 'JSON',
            cache: false,
            type: 'get',
            success: function (data) {
                if (data.isSuccess === 1) {
                    btnState(data.state)
                } else {
                    // fail
                    console.log(data.msg);
                }
            }
        });
    }

    var btnState = function (state) {
        // state:
        // 0 => 已结束
        // 1 => 报名
        // 2 => 已报名 前往投注
        // 3 => 已报名 尚未开始
        // 4 => 已报名 尚未开始 有日期
        var $btn = $('.btn-actions .btn');

        switch (state) {
            case 0:
                $btn.removeAttr('class').attr('class', 'btn finished');
                break;
            case 1:
                $btn.removeAttr('class').attr('class', 'btn signup');
                $('.btn-actions .btn.signup').on("click", function () {
                    getData()
                })
                break;
            case 2:
                $btn.removeAttr('class').attr('class', 'btn play');
                $('.btn-actions .btn.play').on("click", function () {
                    // play link
                    var play_link = '/'
                    var win = window.open(play_link, '_blank');
                    win.focus();
                })
                break;
            case 3:
                $btn.removeAttr('class').attr('class', 'btn notyet');
                break;
            case 4:
                $btn.removeAttr('class').attr('class', 'btn notyet starting-time');
                break;
            default:
                $btn.removeAttr('class').attr('class', 'btn finished');
        }
    }

    // init
    getData();
})