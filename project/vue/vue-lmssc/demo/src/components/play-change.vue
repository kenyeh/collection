<template>
    <transition name="modal-transition">
        <div class="dropModal change" v-on:click.self="closeModal">
            <div class="dm-content">
                <div class="dm-body">
                    <div class="change">
                        <!-- <div class="set-game-panel">
                            <div class="swiper-container">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide">111时时彩</div>
                                    <div class="swiper-slide">222时时彩</div>
                                    <div class="swiper-slide">333时时彩</div>
                                </div>
                            </div>
                        </div>
                        <div class="game-text">
                            <div class="text slide-0">
                                <p>由111市福彩发行中心提供</p>
                                <p>每10分钟一期，当前 第1/110期</p>
                            </div>
                            <div class="text slide-1">
                                <p>由222市福彩发行中心提供</p>
                                <p>每10分钟一期，当前 第20/120期</p>
                            </div>
                            <div class="text slide-2">
                                <p>由333市福彩发行中心提供</p>
                                <p>每10分钟一期，当前 第30/130期</p>
                            </div>
                        </div>
                        -->
                        <div class="set-plays">
                            <div class="title"><div class="title-text"></div></div>
                            <div class="plays-list clearfix">
                                <div
                                v-for="(item, index) in playList"
                                :key="item.id"
                                class="plays-item"
                                v-bind:class="{active: setPlay === item.id}"
                                v-on:click="changeGamePlay(item.id)"
                                >
                                    {{item.cn_name}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dm-foot">
                    <div class="btn-close" v-on:click="submitChange"></div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'playChange',
    data () {
        return {
            setPlay: this.$store.getters.getCurrentMethodGroup
        }
    },
    computed: {
        playList: function () {
            return this.$store.getters.getPlayList
        },
        nowPlayId: function () {
            return this.$store.getters.getCurrentMethodGroup
        }
    },
    methods: {
        closeModal: function () {
            this.$store.dispatch('actionModalClose', {modal: 'PlayChange'})
        },
        changeGamePlay: function (id) {
            this.setPlay = id
        },
        submitChange: function () {
            let id = this.setPlay
            console.log('id', id, this.nowPlayId)

            if (this.nowPlayId !== id) {
                this.$store.dispatch('actionChangeGamePlay', id)
            }

            this.closeModal()
        }
    }
}
</script>
<style lang="scss">
.dropModal.change {

    .dm-content {
        // margin-top: -55.55vw;
        // height: 55.55vw;
        height: 35.55vw;
        background-color: #ffac5c;
        background-image: url(../assets/image/bg-change-game.png);

        transition: all .3s ease;

        .dm-body {

            width: 100%;
            height: inherit;

            .change {
                width: 100%;

                .set-game-panel {
                    width: 100%;
                    height: 11.66vw;
                    padding: 0 2.77vw;
                    padding-top: 2.77vw;

                    background: url(../assets/image/bg-set-game-panel.png)no-repeat top center;
                    background-size: 100% auto;

                    .swiper-slide {
                        text-align: center;
                        color: #532320;
                        font-size: 4.72vw;
                        line-height: 5.83vw;

                        &.swiper-slide-active {
                            color: #fa957e;
                            font-size: 5.83vw;
                            transition: all .3s;
                        }
                    }
                }

                .game-text {
                    // margin-top: 5.55vw;
                    padding-top: 5.55vw;

                    text-align: center;
                    color: #532320;
                    font-size: 3.88vw;

                    .text {
                        display: none;
                    }
                }

                .set-plays {
                    padding-top: 5vw;
                    .title {
                        width: 16.11vw;
                        height: 8.75vw;
                        padding-left: 0.69vw;
                        padding-top: 2.5vw;

                        border: 0;
                        background-color: rgba(197,142,101,0.6);
                        border-top-right-radius: 2.7vw;
                        border-bottom-right-radius: 2.7vw;

                        .title-text {
                            width: 9.72vw;
                            height: 3.75vw;


                            background: url(../assets/image/text-play.png)no-repeat top center;
                            background-size: 100% auto;
                        }
                    }

                    .plays-list {
                        width: 100%;
                        margin-top: 3.8vw;
                        padding-left: 9.72vw;

                        .plays-item {
                            cursor: pointer;
                            float: left;

                            width: 13.19vw;
                            height: 7.91vw;
                            line-height: 7.91vw;

                            color: #532320;
                            font-size: 4.44vw;
                            text-align: center;

                            border: 1px solid #532320;
                            border-radius: 0.97vw;

                            &.active {
                                color: #ffac5c;
                                background-color: #532320;
                            }

                            +.plays-item {
                                margin-left: 3.48vw;
                            }
                        }
                    }
                }

            }
        }

        .dm-foot {
            width: 100%;
            height: 3px;
            background-color: #791c06;

            .btn-close {
                bottom: -2vw;


                width: 5.69vw;
                height: 4.86vw;
                margin-left: -2.84vw;

                background: url(../assets/image/btn-change-game-set.png) no-repeat top center;
                background-size: 100% 100%;
            }
        }
    }
}

/** vue animation **/
.dropModal.change.modal-transition-enter, .dropModal.change.modal-transition-leave-active {
    .dm-content {
        transform: translateY(-35.55vw);
    }
}
</style>

