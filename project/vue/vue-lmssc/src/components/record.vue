<template>
    <transition name="modal-transition">
        <div class="dropModal record" v-on:click.self="closeModal">
            <div class="dm-content">
                <div class="dm-title"><span class="text text-wode"></span></div>
                <div class="dm-body">
                    <div class="record-issue" v-for="(item, index) in recordList" :key="item.issue">
                        <div class="issue-title">{{item.issue}}期</div>
                        <div class="issue-result" v-if="item.state" v-bind:class="item.totalResult > 0 ? 'win' : 'lose'">
                            <span v-if="item.totalResult >= 0">+{{item.totalResult}}元</span>
                            <span v-else>{{item.totalResult}}元</span>
                        </div>
                        <div class="record-list">
                            <div class="record-bet" v-for="(order, index) in item.orders" :key="order.orderId">
                                <div class="info clearfix">
                                    <div class="type">{{order.cnTitle}}</div>
                                    <div class="num">{{order.betCnName}}</div>
                                    <div class="money">{{order.betMoney}}元</div>  
                                </div>
                                <div class="result clearfix">
                                    <div class="rs">{{order.stateText}}</div>
                                    <div class="action">
                                        <a href="javascript:" class="cancel" v-if="(!item.state)&&order.cancelState===-1" v-on:click="cancelOrder(order.orderId)">撤销</a>
                                        <span v-else-if="(!item.state)&&order.cancelState===0">撤销中</span>
                                        <span v-else-if="(!item.state)&&order.cancelState===1">已撤销</span>
                                        <span class="prize" v-else-if="order.result > 0">+{{order.result}}元</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dm-foot">
                    <a href="#" class="more">查看完整结果>></a>
                    <div class="btn-close" v-on:click.self="closeModal"></div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'record',
    computed: {
        recordList: function () {
            return this.$store.getters.getRecordList
        }
    },
    methods: {
        closeModal: function () {
            this.$store.dispatch('actionModalClose', {modal: 'Record'})
        },
        cancelOrder: function (oid) {
            this.$store.dispatch('actionCancelOrder', oid)
        }
    }
}
</script>
<style lang="scss">
.dropModal.record {
    .dm-content {
        transition: all .3s ease;
        .dm-title {
            background-color: #ba2a1f;
        }

        .dm-body {
            max-height: 108.1vw;
            overflow-y: auto;
            background-color: #d25031;

            .record-issue {
                position: relative;
                .issue-title {

                    width: 100%;
                    height: 5.55vw;
                    padding-left: 3.47vw;

                    color: #fe9981;
                    line-height: 5.55vw;
                    font-size: 3.33vw;

                    background-color: #d25031;
                }
                .issue-result {
                    position: absolute;
                    top: 0;
                    right: 0;

                    width: 50%;
                    height: 5.55vw;
                    
                    padding-right: 8.47vw;

                    text-align: right;
                    line-height: 5.55vw;
                    font-size: 3.93vw;

                    &.win {
                        color:#ffd43d;
                    }
                    &.lose {
                        color:#008522;
                    }
                }

                .record-list {
                    background-color: #ffc48a;
                    padding: 0 4.16vw;


                    .record-bet{
                        padding: 0 3.47vw;


                        color: #461a0f;
                        font-size: 3.33vw;
                        .info {
                            > div{
                                float: left;
                                width: 33%;
                                height: 6.94vw; 
                                line-height: 6.94vw; 
                            }
                            .type {
                                text-align: left;
                            }
                            .money {
                                text-align: right;
                            }
                            .num {
                                text-align: center;
                            }
                        }
                        .result {

                            .rs {
                                float: left;
                                width: 66%;
                                height: 6.94vw;
                                line-height: 6.94vw; 
                            }

                            .action {
                                float: left;
                                width: 33%;
                                height: 6.94vw; 
                                line-height: 6.94vw; 
                                text-align: right;

                                .prize {
                                    color: #ba2a1f;
                                }
                                .cancel {
                                    //display: none;
                                    color: #461a0f;
                                    text-decoration: underline;
                                }
                            }
                        }

                        + .record-bet {
                            border-top: 1px solid #d25031;
                        }
                    }

                }
            }
        }

        .dm-foot {
            background-color: #d25031;
            border-bottom: 0.8vw solid #eb994b;
            .more {
                color: #461a0f;
            }

            .btn-close {
                background: url(../assets/image/btn-record-close.png) no-repeat top center;
                background-size: 100% 100%;
            }
        }
    }
}

/** vue animation **/
.record.modal-transition-enter, .record.modal-transition-leave-active {
    .dm-content {
        transform: translateY(-120vw);
    }
}
</style>
