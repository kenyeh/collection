import zrender from "zrender";

var Component = function () {
    /**
     * @type {module:zrender/container/Group}
     * @readOnly
     */
    this.group = new zrender.Group();
    this.type = 'line'
};

Component.prototype = {
    constructor: Component,
    render: function (charts) {
        this.group.removeAll();
        var h = charts._zr.getHeight()
        var padding = 20

        this.buildData(charts).forEach((value,index,arr)=>{
            this.group.add(value)
        })
        this.group.attr('position',[20,h-padding])
        charts._zr.add(this.group)
    },
    update: function(charts,time){

    },
    buildData: function(charts){
        var result = []

        var n = charts.YPayoutEnd < 1e3 ? 100 : Math.max(100, Math.floor(2 / charts.XScale));
        for (var r = charts.XTimeBeg; r < (charts.currentTime - n); r += n) {
            var tickEl = new zrender.Line({
                style: {
                    lineWidth: 3
                },
                shape: {
                    x1: charts.trX(r) ,
                    y1: charts.trY(100 * charts.calculateBust(r)),
                    x2: charts.trX(r+n),
                    y2: charts.trY(100 * charts.calculateBust(r+n))
                },
                z2: 2
            });
            result.push(tickEl);
        }

        return result
    }
};
var component = new Component()

export default component