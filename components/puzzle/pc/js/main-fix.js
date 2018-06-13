var app = (function($) {
    // set var
    var Signup = 0;
    var step = 0;
    var PuzzleOrders = new Array('p1','p5','p2','p3','p4');
    

    var getData = function(callback) {
        $.ajax({
            url: 'data.json',
            dataType: 'json',
            cache: false,
            contentType: "application/json; charset=utf-8",
            success:function(data) {
                callback(data);
            },error: function(msg) {
                alert(msg);
            }
        });
    }
    
    
    var dataInit = function(data) {
        step = data['mission'];
        Signup = data['signup'];
        
        
        /** show datas **/
        isSignup()
        ShowPuzzle()
    
    }
    
    /**  some fn  do something **/
    var isSignup = function() {
        if(Signup)
        {
            console.log(Signup);
            $(".SignUpbtn").html("").css("background","url(images/btn-signuped.png)no-repeat");
        }
    }
    
    var ShowPuzzle = function() {
        if (step == 0) return 
        
        for(var i=1;i<=step;i++)
        {
            var p_id=PuzzleOrders[i-1];
            $(".pf."+p_id+",.pb."+p_id).show();
            $(".dot."+p_id).hide();
        }

        if(step==5)
        {
            $(".pf,.pb").hide();
            $(".phone_body").css("background","url(images/full.png)no-repeat left top");
        }
    }




    return {
        /* public fn */
        start: function() {
            getData(function (data) {
                if(data['isSuccess']) {
                    dataInit(data['data'])
                }

            });
        }
    }




})(jQuery);

/** start **/
app.start();