<template>
    <transition
        name="coin-transition"
        v-bind:css="false"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:after-enter="afterEnter"
        v-on:enter-cancelled="enterCancelled"
        v-on:before-leave="beforeLeave"
        v-on:leave="leave"
        v-on:after-leave="afterLeave"
        v-on:leave-cancelled="leaveCancelled"
    >
        <div class="flybet" v-bind:class="coinType"></div>
    </transition>
</template>
<script>
import $ from 'jquery'

export default {
    name: 'coin',
    data () {
        return {
            coinType: '',
            coinMoney: 0,
            flyingToTarget: {},
            flyingPosition: {},
            coinSize: {}
        }
    },
    created () {
        let CurrentCoinData = this.$store.getters.getCurrentCoin
        this.coinType = CurrentCoinData.type
        this.coinMoney = CurrentCoinData.money
        this.flyingToTarget = $('.touch-block .bet-block.' + CurrentCoinData.flyToTargetClass)
        this.coinSize = {
            width: $('.bet-sets .btn').width() / 2.5,
            height: $('.bet-sets .btn').height() / 2.5
        }
    },
    methods: {
        setFlyingPosition: function (coin, target) {
            const targetPosition = $(target).position()
            const targetParentPosition = $(target).parent().position()
            const coinWidth = this.coinSize.width
            const coinheight = this.coinSize.height
            const left = targetPosition.left + targetParentPosition.left + parseFloat($(target).css('margin-left'))
            const top = targetPosition.top + parseFloat($(target).css('margin-top'))
            const maxX = left + $(target).width() - coinWidth
            const minX = left + (coinWidth / 2)
            const maxY = top + $(target).height() - (coinheight / 2)
            const minY = top + coinheight
            // random
            let randomMaxMin = function (max, min) {
                let randomNum = (Math.random() * (max - min) + min).toFixed(2)
                // console.log('randomNum: ' + randomNum);
                return randomNum
            }

            this.flyingPosition = {
                left: randomMaxMin(maxX, minX),
                top: randomMaxMin(maxY, minY)
            }
        },
        // transition ---
        beforeEnter: function (el) {
            let $flyingToTarget = this.flyingToTarget
            // console.log(this.coinType, this.flyingTo)
            // console.log(el, $flyingToTarget)
            this.setFlyingPosition(el, $flyingToTarget)
        },
        // 此回调函数是可选项的设置
        // 与 CSS 结合时使用
        enter: function (el, done) {
            let gotoX = this.flyingPosition.left
            let gotoY = this.flyingPosition.top
            let sizeWidth = this.coinSize.width
            let sizeHeight = this.coinSize.height

            $(el).animate({
                left: gotoX,
                top: gotoY,
                width: sizeWidth,
                height: sizeHeight
            }, 700, function () {
                $(this).css('z-index', 8)
                done()
            })
        },
        afterEnter: function (el) {
            // console.log('done')
            // action update total
            this.$store.dispatch('actionUpdateValueTotal', this.flyingToTarget.attr('betValue'))
        },
        enterCancelled: function (el) {
            // ...
        },
        // --------
        // 离开时
        // --------
        beforeLeave: function (el) {
            // ...
        },
        // 此回调函数是可选项的设置
        // 与 CSS 结合时使用
        leave: function (el, done) {
            // ...
            done()
        },
        afterLeave: function (el) {
            // ...
        },
        // leaveCancelled 只用于 v-show 中
        leaveCancelled: function (el) {
            // ...
        }
    }
}
</script>
