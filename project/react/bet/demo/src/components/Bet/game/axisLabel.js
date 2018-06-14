import zrender from "zrender";

var Component = function () {
    /**
     * @type {module:zrender/container/Group}
     * @readOnly
     */
    this.group = new zrender.Group();
    this.type = 'axis-label'
    this.views = []
};

Component.prototype = {
    constructor: Component,
    init: function () {},
    render: function (charts) {
        this.group.removeAll();
        var time = Math.max(1000,charts.currentTime)
        this.buildLabel(charts,time).forEach((value,index,arr)=>{
            this.group.add(value)

        })
        this.group.attr('position',[20,0])
        charts._zr.add(this.group)
    },
    buildLabel: function(charts,time){
        var result = []
        var w = charts._zr.getWidth()
        var h = charts._zr.getHeight()
        var padding = 20
        var length = 10
        var unit = Math.pow(10,(time+'').length-4)

        for(var i = 0; i < length; i++){
            var now = Number(time)<1e4?1e4:time
            var x = (w-padding*2)*(i+1)/10*(unit/(now/1e4))

            var tickEl = new zrender.Line({
                shape: {
                    x1: x ,
                    y1: h-padding,
                    x2: x,
                    y2: h-padding-5
                },
                z2: 2
            });
            var label = new zrender.Text({
                style:{
                    text: (i+1)*unit,
                    fontSize: 12,
                    textAlign: 'center',
                    textVerticalAlign: 'top',
                },
                position:[x,h-padding+5],
                z: 2
            })
            result.push(tickEl);
            result.push(label);
        }
        return result
    }
};
var component = new Component()

export default component
