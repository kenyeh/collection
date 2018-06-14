<template>
    <transition name="modal-transition">
        <div class="dropModal history" v-on:click.self="closeModal">
            <div class="dm-content">
                <div class="dm-title"><span class="text-darkOrange">{{getLastNowIssues.current}}</span>期&nbsp;仅剩<span class="text-darkOrange">{{getSurplusTime}}</span></div>
                <div class="dm-body">
                    <div class="list-title clearfix">
                        <div class="title-issue">期号</div>
                        <div class="title-number">完整结果</div>
                        <div class="title-result">{{getcurrentMethodFullCnName}}</div>
                    </div>
                    <div class="history">
                        <table>
                            <tr class="list-data" v-for="(item, index) in getHistoryList">
                                <td class="issue">{{item.issue}}</td>
                                <td class="number">
                                    <span v-for="(num, index) in (item.wn_number.split(''))" :class="'num' + (index + 1)">{{num}}</span>
                                </td>
                                <td class="result">
                                    <span class="icon" :class="item.result.class">{{item.result.num}}</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="dm-foot">
                    <div class="btn-close" v-on:click.self="closeModal"></div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'record',
    computed: {
        ...mapGetters([
            'getSurplusTime',
            'getLastNowIssues',
            'getHistoryList',
            'getcurrentMethodFullCnName'
        ])
    },
    methods: {
        closeModal: function () {
            this.$store.dispatch('actionModalClose', {modal: 'History'})
        }
    }
}
</script>
<style lang="scss">
.dropModal.history {
    .dm-content {
        transition: all .3s ease;
        .dm-title {
            height: 11.11vw;

            color: #663a1f;
            font-size: 4.16vw;

            background: url(../assets/image/bg-history-title-2.png) no-repeat;
            background-position: 0% 100%;
            background-size: 13vw;
            background-color: #fdc899;
        }
        .dm-body {

            background-color: #f3b37a;
            .list-title {
                height: 8.33vw;

                text-align: center;
                font-size: 3.88vw;
                line-height: 8.33vw;
                color: #fdc899;
                background-color: #663a1f;
                .title-issue {
                    float: left;
                    width: 13.98vw;
                    height: inherit;
                    border-right: 1px solid #d99253;
                }
                .title-number {
                    float: left;
                    width: 27.77vw;
                    height: inherit;
                    border-right: 1px solid #d99253;
                }
                .title-result {
                    float: left;
                    width: 58.25vw;
                    height: inherit;
                }
            }
            .history {
                max-height: 108.1vw;
                overflow-y: auto;
                table{
                    width: 100%;
                    border-collapse:collapse;

                    text-align: center;

                    tr.list-data{
                        td {
                            height: 8.33vw;
                            font-size: 3.88vw;

                            font-size: 3.88vw;
                            color: #663a1f;

                            &:nth-child(1) {
                                width: 13.88vw;
                                border-right: 1px solid #d99253;
                            }

                            &:nth-child(2){
                                width: 27.77vw;
                                border-right: 1px solid #d99253;
                            }  

                            &.number {
                                letter-spacing:1vw;
                            }

                            &.result .icon {
                                display: inline-block;
                                width: 6vw;
                                height: 6vw;
                                line-height: 6vw;
                                vertical-align: middle;
                            }
                        }

                        &:nth-child(even){
                            background-color: #fdc899;
                        }
                    }

                    tr.show-more {
                        td {
                            position: relative;
                            .more {
                                color: #7d563c;
                                text-align: right;
                                padding-right: 5vw;
                                padding-top: 2vw;
                                width: 100%;
                                height: 15vw;
                                line-height: 9vw;
                            }
                        }
                    }
                }
            }
        }

        .dm-foot {
            height: 3.02vw;

            background-color: #f3b37a;
            //border-top: 1px solid #d99253;
            border-bottom: 3px solid #eb994b;
            .more {
                color: #7d563c;
                text-decoration: none;
            }
        }
        .btn-close {
            bottom: -2.7vw;
            background: url(../assets/image/btn-history-close.png) no-repeat top center;
            background-size: 100% 100%;
        }

    }
}
/** vue animation **/
.history.modal-transition-enter, .history.modal-transition-leave-active {
    .dm-content {
        transform: translateY(-89vw);
    }
}
</style>

