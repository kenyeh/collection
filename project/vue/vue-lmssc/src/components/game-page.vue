<template>
    <div class="game-body">
        <div class="game-info">
            <div class="info-title">
                <span class="text-yellow">{{getLastNowIssues.last}}</span>期&nbsp;<span>{{getIssueStateText}}</span>
            </div>
            <game-Info></game-Info>
            <button class="btn btn-info left" @click="actionChangeGameMethod(getPreMethodId)"></button>
            <button class="btn btn-info right" @click="actionChangeGameMethod(getNextMethodId)"></button>
        </div>
        <div class="bet-body">
            <div class="bet-title">
                <span class="text-yellow">{{getLastNowIssues.current}}</span>期&nbsp;仅剩&nbsp;<span class="text-yellow">{{getSurplusTime}}</span>
            </div>
            <bet-component></bet-component>
            <div class="bet-sets">
                <ul class="clearfix">
                    <li>
                        <button class="btn set-clean" v-on:click="actionClearOrders()"></button>
                    </li>
                    <li
                    v-for="(item, index) in coninList"
                    :key="item.type"
                    v-on:click="setCoin(item)">
                        <button class="btn btn-bet" v-bind:class="[{setting: getCurrentCoin.type === item.type}, item.type]"></button>
                    </li>
                </ul>
            </div>
            <coin v-for="(item, index) in getOrders" :key="item.index"></coin>
        </div>
    </div>
</template>

<script>
import gameInfo from '@/components/game-info'
import betComponent from '@/components/bet-component'
import coin from '@/components/coin'

import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'gamePage',
    data () {
        return {
            coninList: [
                {
                    type: 'set-01',
                    value: 0.1
                },
                {
                    type: 'set-1',
                    value: 1
                },
                {
                    type: 'set-10',
                    value: 10
                },
                {
                    type: 'set-100',
                    value: 100
                },
                {
                    type: 'set-500',
                    value: 500
                }
            ]
        }
    },
    components: {
        'game-Info': gameInfo,
        'bet-component': betComponent,
        'coin': coin
    },
    computed: {
        ...mapGetters([
            'getPreMethodId',
            'getNextMethodId',
            'getCurrentCoin',
            'getOrders',
            'getSurplusTime',
            'getLastNowIssues',
            'getIssueStateText'
        ])
    },
    methods: {
        ...mapActions([
            'actionChangeGameMethod',
            'actionSetCoin',
            'actionClearOrders'
        ]),
        setCoin: function (coin) {
            this.actionSetCoin(coin)
        }
    }
}
</script>
