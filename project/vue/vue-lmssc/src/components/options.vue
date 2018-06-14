<template>
    <transition name="modal-transition">
        <div class="dropModal modal-options" v-on:click.self="closeModal">
            <div class="dm-content">
                <div class="dm-body">
                    <div class="options">
                        <a href="javascript:" class="option" v-on:click="openPlayChangeModal">
                            <div class="option-content">
                                <span class="icon game"></span>切换号源
                            </div>
                        </a>
                        <a href="javascript:" class="option" id="legend">
                            <div class="option-content">
                                <span class="icon play"></span>操作说明
                            </div>
                        </a>
                        <a href="javascript:" class="option">
                            <div class="option-content">
                                <span class="icon history"></span>历史开奖
                            </div>
                        </a>
                        <a href="javascript:" class="option">
                            <div class="option-content">
                                <span class="icon deposit"></span>去充值
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'game-select',
    methods: {
        closeModal: function () {
            this.$store.dispatch('actionModalClose', {modal: 'Options'})
        },
        openPlayChangeModal: function () {
            this.$store.dispatch('actionModalShow', {modal: 'PlayChange'})
        }
    }
}
</script>
<style lang="scss">
.dropModal.modal-options {
    .dm-content {
        .dm-body {
            position: relative;

            .options {
                position: absolute;
                top: 2.7vw;
                right: 0;

                width: 30.55vw;
                background-color: #ffac5c;

                .option {
                    display: block;

                    width: 100%;
                    height: 9.72vw;
                    padding: 0 2vw;

                    line-height: 9.72vw;
                    font-size: 4.72vw;
                    color: #532320;
                    text-decoration: none;

                    .option-content {

                        .icon {
                            display: inline-block;
                            width: 4.3vw;
                            height: 4.3vw;
                            vertical-align: middle;
                            margin-right: 1.38vw;
                        }

                        .game {
                            background: url(../assets/image/icon-set-1.png) no-repeat center center;
                            background-size: auto 100%;
                        }
                        .play {
                            background: url(../assets/image/icon-set-2.png) no-repeat center center;
                            background-size: auto 100%;
                        }
                        .history {
                            background: url(../assets/image/icon-set-3.png) no-repeat center center;
                            background-size: auto 100%;
                        }
                        .deposit {
                            background: url(../assets/image/icon-set-4.png) no-repeat center center;
                            background-size: auto 100%;
                        }
                    }


                    &:hover {
                        background-color: #ffd3a8;
                        color: #ed6714;

                        .game {
                            background: url(../assets/image/icon-set-1-hover.png) no-repeat center center;
                            background-size: auto 100%;
                        }
                        .play {
                            background: url(../assets/image/icon-set-2-hover.png) no-repeat center center;
                            background-size: auto 100%;
                        }
                        .history {
                            background: url(../assets/image/icon-set-3-hover.png) no-repeat center center;
                            background-size: auto 100%;
                        }
                        .deposit {
                            background: url(../assets/image/icon-set-4-hover.png) no-repeat center center;
                            background-size: auto 100%;
                        }
                    }

                    + .option {
                        .option-content {
                            border-top: 1px solid #e99342;
                        }

                    }
                }

                &:before {
                    position: absolute;
                    top: -1.9vw;
                    right: 5vw;
                    content: '';
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 0 2vw 2vw 2vw;
                    border-color: transparent transparent #ffac5c transparent;
                }
            }
        }
    }
}


</style>

