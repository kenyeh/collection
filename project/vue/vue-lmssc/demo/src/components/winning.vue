<template>
    <transition name="modal-transition">
        <div class="dropModal winning">
            <div class="dm-content">
                <div class="dm-body">
                    <div class="winning">
                        <div class="winning-coin"></div>
                        <div class="winning-issue"><span>{{winningData.showIssue}}</span>期</div>
                        <div class="winning-num">+{{winningData.winMoney}}</div>
                        <div class="wining-btns clearfix">
                            <div class="record" v-on:click.self="linkToRecoedModal"></div>
                            <div class="share"></div>
                            <div class="btn-close close" v-on:click.self="closeModal"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'winning',
    computed: {
        winningData: function () {
            return this.$store.getters.getWinningData
        }
    },
    methods: {
        closeModal: function () {
            this.$store.dispatch('actionModalClose', {modal: 'Winning'})
        },
        linkToRecoedModal: function () {
            this.$store.dispatch('actionModalShow', {modal: 'Record'})
        }
    }
}
</script>
<style lang="scss">
.dropModal.winning {
    // display: none;
    height: 51.5vw;

    .dm-content {
        transition: all .3s ease;
        // margin-top: -50vw;

        .dm-body {
            .winning {
                position: relative;
                width: 97.91vw;
                height: 46.8vw;
                margin:  0 auto;
                margin-top: 3.47vw;
                padding-top: 3.61vw;

                background: url(../assets/image/bg-winning-2.png) no-repeat center center;
                background-size:100% auto;

                .winning-coin {
                    position: absolute;
                    top: 10vw;
                    left: 10vw;
                    width: 75.69vw;
                    height: 26.66vw;
                    background: url(../assets/image/winning-coin.png) no-repeat center center;
                    background-size:100% auto;
                    transform-origin: center bottom;
                    transition: transform 1s ease;
                }

                .winning-issue {
                    width: 16.66vw;
                    height: 4.58vw;
                    margin: 0 auto;


                    font-size: 3.61vw;
                    line-height: 4.68vw;
                    color: #ffac5c;
                    text-align: center;

                    background: url(../assets/image/bg-win-title.png) no-repeat center center;
                    background-size:100% 100%;
                }

                .winning-num {
                    width: 90.27vw;
                    height: 7vw;
                    margin:  0 auto;
                    margin-top: 6.25vw;

                    font-size: 6.63vw;
                    line-height: 6.63vw;
                    text-align: center;
                    color: #ffea00;
                    font-weight: bold;

                    transform-origin: center bottom;
                    transition: transform 0.75s ease;

                }

                .wining-btns {
                    width: 100%;
                    height: 8.75vw;
                    margin-top: 15vw;

                    div {
                        float: left;
                        width: 8.75vw;
                        height: 8.75vw;
                    }

                    .record {
                        margin-left: 13.6vw;
                    }
                    .share {
                        margin-left: 22vw;
                    }
                    .close {
                        margin-left: 21.8vw;
                    }
                }
            }
        }
    }

}

/** vue animation **/
.winning.modal-transition-enter, .winning.modal-transition-leave-active {
    .dm-content {
        transform: translateY(-50vw);
    }
}
.winning.modal-transition-enter {
    .winning-coin {
        transform: scale(0.1);
    }

    .winning-num {
        transform: scale(0.1);
        transform: translateY(12vw);
    }
}
</style>

