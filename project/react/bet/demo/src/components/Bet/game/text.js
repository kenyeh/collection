import zrender from "zrender";

var Component = function () {
    /**
     * @type {module:zrender/container/Group}
     * @readOnly
     */
    this.group = new zrender.Group();
    this.type = 'text'
    this.views = []
};
Component.prototype = {
    constructor: Component,
    init: function () {},
    render: function (charts) {
        this.group.removeAll();

        this.buildDate(charts).forEach((value,index,arr)=>{
            this.group.add(value)
        })
        charts._zr.add(this.group)
    },
    buildDate: function(charts){

        var result = []
        var w = charts._zr.getWidth()
        var h = charts._zr.getHeight()

        var objText = {}
        objText = new zrender.Text({
            style: {
                fontSize: w/4,
                textAlign: 'center',
                textVerticalAlign: 'middle',
                fontFamily: 'Verdana'
            },
            position: [w/2,h/2]
        })
        var style = {}
        switch(charts.gameState){
            case 'CONNECTING':
            case 'DISCONNECTED':
                style = {
                    textFill:'#e74c3c',
                    fontSize: w/3.5,
                    text: charts.gameState === 'DISCONNECTED'?'失去连接':'连接中...'
                }
                break;
            case 'GAME_STARTING':
                var n = ((charts.startTime - Date.now()) / 1e3).toFixed(1);
                style = {
                    textFill:'#808080',
                    fontSize: w/10,
                    text: '距离开始投注\n还有'+ n +'秒'
                }
                break;
            case 'GAME_IN_PROGRESS':

                style = {
                    textFill:'#000',
                    fontSize: w/6,
                    text: (charts.currentPayout).toFixed(charts.currentPayout < 1e5 ? 2 : 0) + "倍"
                }
                break;
            case 'GAME_ENDED':
                style = {
                    textFill:'#e74c3c',
                    fontSize: w/6,
                    text: "爆了\n " + charts.bust + "倍"
                }
                break;
            case "GAME_STOPPED":
                style = {
                    textFill:'#e74c3c',
                    fontSize: w/3.5,
                    text: '停售'
                }
                break;
            default :
                console.warn("未知状态: ", charts.gameState)
                break;
        }
        objText.attr('style', style);
        result.push(objText)
        return result
    }
};
var component = new Component()

export default component
