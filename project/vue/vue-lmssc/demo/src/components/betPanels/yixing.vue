<template>
    <div class="bet-component">
        <!-- 1星 -->
        <div class="show-block">
            <div class="line-0"></div>
            <div class="two-bet-block clearfix">
                <div class="bet-block one da">
                    <div class="bet-text"></div>
                    <div class="bet-odds">
                        <span>1</span>赔
                        <span>{{valueData['v_10'].odds}}</span>
                    </div>
                    <span class="submit-bets" v-bind:class="{show: valueData['v_10'].submitTotal > 0}">
                        已下<span class="submit-bets-num">{{valueData['v_10'].submitTotal}}</span>
                    </span>
                    <span class="total-bets" v-bind:class="{show: valueData['v_10'].total > 0}">￥
                        <span class="total-bets-num">{{valueData['v_10'].total}}</span>
                    </span>
                    <div class="rule">
                        <div class="icon icon-coin-blue"></div>
                        <div class="text">5-9</div>
                    </div>
                </div>
                <div class="bet-block two xiao">
                    <div class="bet-text"></div>
                    <div class="bet-odds">
                        <span>1</span>赔
                        <span>{{valueData['v_11'].odds}}</span>
                    </div>
                    <span class="submit-bets" v-bind:class="{show: valueData['v_11'].submitTotal > 0}">
                        已下<span class="submit-bets-num">{{valueData['v_11'].submitTotal}}</span>
                    </span>
                    <span class="total-bets" v-bind:class="{show: valueData['v_11'].total > 0}">￥
                        <span class="total-bets-num">{{valueData['v_11'].total}}</span>
                    </span>
                    <div class="rule">
                        <div class="icon icon-coin-red"></div>
                        <div class="text">0-4</div>
                    </div>
                </div>
            </div>
            <div class="line"></div>

            <div class="ten-bet-block clearfix">
                <div class="bet-top-row">
                    <div class="bet-block ten-zero">
                        <div class="bet-text"></div>
                        <span class="submit-bets" v-bind:class="{show: valueData['v_0'].submitTotal > 0}">
                            <span class="submit-bets-num">{{valueData['v_0'].submitTotal}}</span>
                        </span>
                        <span class="total-bets" v-bind:class="{show: valueData['v_0'].total > 0}">
                            <span class="total-bets-num">{{valueData['v_0'].total}}</span>
                        </span>
                    </div>
                    <div class="bet-block ten-one">
                        <div class="bet-text"></div>
                        <span class="submit-bets" v-bind:class="{show: valueData['v_1'].submitTotal > 0}">
                            <span class="submit-bets-num">{{valueData['v_1'].submitTotal}}</span>
                        </span>
                        <span class="total-bets" v-bind:class="{show: valueData['v_1'].total > 0}">
                            <span class="total-bets-num">{{valueData['v_1'].total}}</span>
                        </span>
                    </div>
                    <div class="bet-block ten-two">
                        <div class="bet-text"></div>
                        <span class="submit-bets" v-bind:class="{show: valueData['v_2'].submitTotal > 0}">
                            <span class="submit-bets-num">{{valueData['v_2'].submitTotal}}</span>
                        </span>
                        <span class="total-bets" v-bind:class="{show: valueData['v_2'].total > 0}">
                            <span class="total-bets-num">{{valueData['v_2'].total}}</span>
                        </span>
                    </div>
                    <div class="bet-block ten-three">
                        <div class="bet-text"></div>
                        <span class="submit-bets" v-bind:class="{show: valueData['v_3'].submitTotal > 0}">
                            <span class="submit-bets-num">{{valueData['v_3'].submitTotal}}</span>
                        </span>
                        <span class="total-bets" v-bind:class="{show: valueData['v_3'].total > 0}">
                            <span class="total-bets-num">{{valueData['v_3'].total}}</span>
                        </span>
                    </div>
                    <div class="bet-block ten-four">
                        <div class="bet-text"></div>
                        <span class="submit-bets" v-bind:class="{show: valueData['v_4'].submitTotal > 0}">
                            <span class="submit-bets-num">{{valueData['v_4'].submitTotal}}</span>
                        </span>
                        <span class="total-bets" v-bind:class="{show: valueData['v_4'].total > 0}">
                            <span class="total-bets-num">{{valueData['v_4'].total}}</span>
                        </span>
                    </div>
                </div>

                <div class="show-odds">
                    <div class="odds">1赔{{valueData['v_0'].odds}}</div>
                </div>

                <div class="bet-bottom-row">
                    <div class="bet-block ten-five">
                        <div class="bet-text"></div>
                        <span class="submit-bets" v-bind:class="{show: valueData['v_5'].submitTotal > 0}">
                            <span class="submit-bets-num">{{valueData['v_5'].submitTotal}}</span>
                        </span>
                        <span class="total-bets" v-bind:class="{show: valueData['v_5'].total > 0}">
                            <span class="total-bets-num">{{valueData['v_5'].total}}</span>
                        </span>
                    </div>
                    <div class="bet-block ten-six">
                        <div class="bet-text"></div>
                        <span class="submit-bets" v-bind:class="{show: valueData['v_6'].submitTotal > 0}">
                            <span class="submit-bets-num">{{valueData['v_6'].submitTotal}}</span>
                        </span>
                        <span class="total-bets" v-bind:class="{show: valueData['v_6'].total > 0}">
                            <span class="total-bets-num">{{valueData['v_6'].total}}</span>
                        </span>
                    </div>
                    <div class="bet-block ten-seven">
                        <div class="bet-text"></div>
                        <span class="submit-bets" v-bind:class="{show: valueData['v_7'].submitTotal > 0}">
                            <span class="submit-bets-num">{{valueData['v_7'].submitTotal}}</span>
                        </span>
                        <span class="total-bets" v-bind:class="{show: valueData['v_7'].total > 0}">
                            <span class="total-bets-num">{{valueData['v_7'].total}}</span>
                        </span>
                    </div>
                    <div class="bet-block ten-eight">
                        <div class="bet-text"></div>
                        <span class="submit-bets" v-bind:class="{show: valueData['v_8'].submitTotal > 0}">
                            <span class="submit-bets-num">{{valueData['v_8'].submitTotal}}</span>
                        </span>
                        <span class="total-bets" v-bind:class="{show: valueData['v_8'].total > 0}">
                            <span class="total-bets-num">{{valueData['v_8'].total}}</span>
                        </span>
                    </div>
                    <div class="bet-block ten-nine">
                        <div class="bet-text"></div>
                        <span class="submit-bets" v-bind:class="{show: valueData['v_9'].submitTotal > 0}">
                            <span class="submit-bets-num">{{valueData['v_9'].submitTotal}}</span>
                        </span>
                        <span class="total-bets" v-bind:class="{show: valueData['v_9'].total > 0}">
                            <span class="total-bets-num">{{valueData['v_9'].total}}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div class="touch-block">
            <div class="two-bet-block clearfix">
                <div class="bet-block one da" @click="bet({value:10, class:'da'})" betValue='10'></div>
                <div class="bet-block two xiao" @click="bet({value:11, class:'xiao'})" betValue='11'></div>
            </div>
            <div class="ten-bet-block clearfix">
                <div class="bet-block ten-zero" @click="bet({value:0, class:'ten-zero'})" betValue='0'></div>
                <div class="bet-block ten-one" @click="bet({value:1, class:'ten-one'})" betValue='1'></div>
                <div class="bet-block ten-two" @click="bet({value:2, class:'ten-two'})" betValue='2'></div>
                <div class="bet-block ten-three" @click="bet({value:3, class:'ten-three'})" betValue='3'></div>
                <div class="bet-block ten-four" @click="bet({value:4, class:'ten-four'})" betValue='4'></div>
                <div class="bet-block ten-five" @click="bet({value:5, class:'ten-five'})" betValue='5'></div>
                <div class="bet-block ten-six" @click="bet({value:6, class:'ten-six'})" betValue='6'></div>
                <div class="bet-block ten-seven" @click="bet({value:7, class:'ten-seven'})" betValue='7'></div>
                <div class="bet-block ten-eight" @click="bet({value:8, class:'ten-eight'})" betValue='8'></div>
                <div class="bet-block ten-nine" @click="bet({value:9, class:'ten-nine'})" betValue='9'></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'yixing',
    computed: {
        valueData: function () {
            console.log(this.$store.getters.getModuleGetter('getPanelData'))
            return this.$store.getters.getModuleGetter('getPanelData')
        }
    },
    methods: {
        bet: function (betData) {
            console.log(betData)
            this.$store.dispatch('actionBet', betData)
        }
    }
}
</script>

