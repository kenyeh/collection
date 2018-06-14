import zrender from 'zrender'
import axios from './axis'
import text from './text'
import axisLabel from './axisLabel'
import line from './line'

var ee = require('event-emitter');
var MyClass = function () { /* .. */ };
ee(MyClass.prototype); // All instances of MyClass will expose event-emitter interface
var emitter = new MyClass();



var instances = {};
var idBase = new Date() - 0;
var DOM_ATTRIBUTE_KEY = '_icharts_instance_';



function iCharts(dom, opts) {
    opts = opts || {};
    this._dom = dom;

    this.count = 0;
    this.time = (new Date()).getTime()
    this.animRequest = null
    this.gameState = 'GAME_ENDED' // 当前游戏状态
    this.currentTime = 0  // 当前游戏时间
    this.lastGameTick = 0
    this.currentPayout = 0 // 当前开奖数据

    this.bust = 0
    this.XTimeMinValue = 1e4
    this.YPayoutMinValue = 200

    var defaultRenderer = 'canvas';

    this._zr = zrender.init(dom, {
        renderer: opts.renderer || defaultRenderer,
        devicePixelRatio: opts.devicePixelRatio,
        width: opts.width || 'auto',
        height: opts.height || 'auto'
    });

    this._componentsViews = [];
    this.XScale = 1
    this.yScale = 1

    // In case some people write `window.onresize = chart.resize`
    this.resize = zrender.util.bind(this.resize, this);


    window.addEventListener('resize', ()=>{
        this.resize()
    })

    this.renderLoop = zrender.util.bind(this.renderLoop, this);
}


var ichartsProto = iCharts.prototype;
/**
 * @return {HTMLElement}
 */
ichartsProto.getDom = function () {
    return this._dom;
};


ichartsProto.initialize = function (data) {
    this.gameState = data.gameState
    this.bust = data.bust || 0
    data.elapsed !== undefined && (this.startTime = Date.now() - data.elapsed)
    this.lastGameTick = Date.now()

    axios.render(this)
    text.render(this)
    axisLabel.render(this)
    this.animRequest = window.requestAnimationFrame(this.renderLoop)
    emitter.on('GAME_STATE_CHANGED',  () => {
        text.render(this)
    });
    emitter.on('GAME_ENDED',  (data) => {
      this.bust = data.bust
      text.render(this)
    });
}


ichartsProto.update = function () {
    this.calculatePlotValues()
    axios.render(this)
    text.render(this)
    axisLabel.render(this)
    line.render(this)
}

ichartsProto.renderLoop = function() {
    this.update()
    this.animRequest = window.requestAnimationFrame(this.renderLoop)
}

ichartsProto.gameStarting = function() {
    this.gameState = 'GAME_STARTING'
    this.startTime = Date.now() + 5e3
    emitter.emit('GAME_STATE_CHANGED')

}
ichartsProto.gameStarted = function() {
    this.gameState = 'GAME_IN_PROGRESS'
    this.startTime = Date.now()
    this.lastGameTick = Date.now()

    emitter.emit('GAME_STATE_CHANGED')
}
ichartsProto.gameEnded = function(data) {
    this.gameState = 'GAME_ENDED'
    emitter.emit('GAME_STATE_CHANGED')
    emitter.emit('GAME_ENDED',data)
}
ichartsProto.gameStopped = function() {
    this.gameState = 'GAME_STOPPED'
    emitter.emit('GAME_STATE_CHANGED')
}
ichartsProto.cashedOut = function(value) {
    this.onGameTick(value)
}

ichartsProto.onGameTick = function(value) {
    var t = this.calculateTime(value), now = Date.now();
    now - t < this.startTime && (this.startTime = now - t)
    this.lastGameTick = this.startTime + t

}

//计算初始值
ichartsProto.calculatePlotValues = function() {
    this.currentTime = this.getCurrentTime()
    this.XTimeBeg = 0
    this.XTimeEnd = Math.max(this.XTimeMinValue, this.currentTime)
    this.YPayoutBeg = 100
    this.YPayoutEnd = Math.max(this.YPayoutMinValue, this.currentPayout*100)
    this.currentPayout = this.getCurrentPayout()
    this.XScale = this.getWidth() / (this.XTimeEnd - this.XTimeBeg)
    this.YScale = this.getHeight() / (this.YPayoutEnd - this.YPayoutBeg)
}
//获取当前时间
ichartsProto.getCurrentTime = function(){
    if ("GAME_IN_PROGRESS" === this.gameState) {
        return Math.min(Date.now(), this.lastGameTick + 300000) - this.startTime
    }
    return 0
}
//获取当前payout
ichartsProto.getCurrentPayout = function(){
    var e = this.currentTime
    return this.calculateBust(e)
}
//根据时间计算payout
ichartsProto.calculateBust = function(e) {
    if("number" === typeof e && e >= 0){
        return Math.pow(2, 1e-4 * e)
    }
}
//根据payout反算时间
ichartsProto.calculateTime = function(e) {
    if("number" === typeof e && e >= 0){
      return parseInt(14427 * Math.log(e),10)
    }
}

//获取canvas宽度
ichartsProto.getWidth = function(){
    return this._zr.getWidth()
}
//获取canvas高度
ichartsProto.getHeight = function(){
    return this._zr.getHeight()
}

ichartsProto.trX = function(e) {
    return this.XScale * (e - this.XTimeBeg)
}

ichartsProto.trY = function(e) {
    return -this.YScale * (e - this.YPayoutBeg)
}

ichartsProto.getStatus = function(){
    return this.gameState
}

ichartsProto.resize = function (opts) {
    this.update()
    this._zr.resize(opts);
};


export function game(dom, opts) {

    var existInstance = getInstanceByDom(dom);
    if (existInstance) {
        return existInstance;
    }
    var chart = new iCharts(dom, opts);
    chart.id = 'ec_' + idBase++;
    instances[chart.id] = chart;
    if (dom.setAttribute) {
        dom.setAttribute(DOM_ATTRIBUTE_KEY, chart.id);
    }
    else {
        dom[DOM_ATTRIBUTE_KEY] = chart.id;
    }

    return chart;
}

/**
 * @param  {HTMLElement} dom
 * @return {echarts~ECharts}
 */
export function getInstanceByDom(dom) {
    var key;
    if (dom.getAttribute) {
        key = dom.getAttribute(DOM_ATTRIBUTE_KEY);
    }
    else {
        key = dom[DOM_ATTRIBUTE_KEY];
    }
    return instances[key];
}
