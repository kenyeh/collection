<template>
    <div class="bet-component">
        <!-- 3星-->
        <div class="show-block">
            <div class="four-bet-block clearfix">
                <div class="bet-block one chubaozi">
                    <div class="bet-text"></div>
                    <div class="bet-odds">
                        <span>1</span>赔
                        <span>{{valueData['v_0'].odds}}</span>
                    </div>
                    <span class="submit-bets" v-bind:class="{show: valueData['v_0'].submitTotal > 0}">
                        已下<span class="submit-bets-num">{{valueData['v_0'].submitTotal}}</span>
                    </span>
                    <span class="total-bets" v-bind:class="{show: valueData['v_0'].total > 0}">￥
                        <span class="total-bets-num">{{valueData['v_0'].total}}</span>
                    </span>
                </div>
                <div class="bet-block two chushunzi">
                    <div class="bet-text"></div>
                    <div class="bet-odds">
                        <span>1</span>赔
                        <span>{{valueData['v_1'].odds}}</span>
                    </div>
                    <span class="submit-bets" v-bind:class="{show: valueData['v_1'].submitTotal > 0}">
                        已下<span class="submit-bets-num">{{valueData['v_1'].submitTotal}}</span>
                    </span>
                    <span class="total-bets" v-bind:class="{show: valueData['v_1'].total > 0}">￥
                        <span class="total-bets-num">{{valueData['v_1'].total}}</span>
                    </span>
                </div>
                <div class="bet-block three chuduizi">
                    <div class="bet-text"></div>
                    <div class="bet-odds">
                        <span>1</span>赔
                        <span>{{valueData['v_2'].odds}}</span>
                    </div>
                    <span class="submit-bets" v-bind:class="{show: valueData['v_2'].submitTotal > 0}">
                        已下<span class="submit-bets-num">{{valueData['v_2'].submitTotal}}</span>
                    </span>
                    <span class="total-bets" v-bind:class="{show: valueData['v_2'].total > 0}">￥
                        <span class="total-bets-num">{{valueData['v_2'].total}}</span>
                    </span>
                </div>
                <div class="bet-block four qita">
                    <div class="bet-text"></div>
                    <div class="bet-odds">
                        <span>1</span>赔
                        <span>{{valueData['v_3'].odds}}</span>
                    </div>
                    <span class="submit-bets" v-bind:class="{show: valueData['v_3'].submitTotal > 0}">
                        已下<span class="submit-bets-num">{{valueData['v_3'].submitTotal}}</span>
                    </span>
                    <span class="total-bets" v-bind:class="{show: valueData['v_3'].total > 0}">￥
                        <span class="total-bets-num">{{valueData['v_3'].total}}</span>
                    </span>
                </div>
            </div>
        </div>
        <div class="touch-block">
            <div class="four-bet-block clearfix">
                <div class="bet-block one chubaozi" @click="bet({value:0, class:'chubaozi'})" betValue='0'></div>
                <div class="bet-block two chushunzi" @click="bet({value:1, class:'chushunzi'})" betValue='1'></div>
                <div class="bet-block three chuduizi" @click="bet({value:2, class:'chuduizi'})" betValue='2'></div>
                <div class="bet-block four qita" @click="bet({value:3, class:'qita'})" betValue='3'></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'sanxing',
    computed: {
        valueData: function () {
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

