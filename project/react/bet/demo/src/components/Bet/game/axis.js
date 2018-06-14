import zrender from "zrender";

var Component = function () {
    /**
     * @type {module:zrender/container/Group}
     * @readOnly
     */
    this.group = new zrender.Group();
    this.type = 'axis'

};

Component.prototype = {
    constructor: Component,
    init: function () {},
    render: function (charts) {
        this.group.removeAll();
        var w = charts._zr.getWidth()
        var h = charts._zr.getHeight()
        var padding = 20

        var objx = new zrender.Line({
            shape:{
                x1: padding,
                y1: h-padding,
                x2: w-padding,
                y2: h-padding
            }
        })
        var objy = new zrender.Line({
            shape:{
                x1: padding,
                y1: h-padding,
                x2: padding,
                y2: padding
            }
        })
        this.group.add(objx)
        this.group.add(objy)
        charts._zr.add(this.group)
    }
};
var component = new Component()

export default component