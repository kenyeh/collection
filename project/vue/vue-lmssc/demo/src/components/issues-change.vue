<template>
    <transition name="modal-transition" v-on:after-enter="afterEnter">
        <div class="dropModal issues-end" id="issuesChange">
            <div class="dm-content">
                <div class="dm-body">
                    <div class='es-body'>
                        <div class='es-title-word clearfix'>
                            <div class='word'>
                                <div class='flipper'>
                                    <div class='front'>
                                    </div>
                                    <div class='back'>
                                    </div>
                                </div>
                            </div>
                            <div class='word'>
                                <div class='flipper'>
                                    <div class='front'>
                                    </div>
                                    <div class='back'>
                                    </div>
                                </div>
                            </div>
                            <div class='word'>
                                <div class='flipper'>
                                    <div class='front'>
                                    </div>
                                    <div class='back'>
                                    </div>
                                </div>
                            </div>
                            <div class='word'>
                                <div class='flipper'>
                                    <div class='front'>
                                    </div>
                                    <div class='back'>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='es-msg'>
                            <span class='first-msg'><span class='text-orange'>{{issuesData.last}}</span>期 已结束</span>
                            <span class='second-msg'><span class='text-orange'>{{issuesData.current}}</span>期</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import $ from 'jquery'
export default {
    name: 'issuesChange',
    computed: {
        issuesData: function () {
            return this.$store.getters.getLastNowIssues
        }
    },
    methods: {
        afterEnter: function (el) {
            const $model = $(el)
            const $titleWords = $model.find('.es-title-word')
            const $fistMsg = $model.find('.es-msg .first-msg')
            const $secondMsg = $model.find('.es-msg .second-msg')
            const $store = this.$store

            // showing animation
            $model.queue('change', function (next) {
                const words = $titleWords.find('.word')
                let i = -1
                const runNextFadein = function () {
                    // console.log(words.eq(i))
                    i += 1

                    words.eq(i).fadeIn('500', function () {
                        // console.log($titleWords.length)
                        if (i === (words.length - 1)) {
                            // console.log('next')
                            next()
                        } else {
                            runNextFadein()
                        }
                    })
                }

                runNextFadein()
            })
            .queue('change', function (next) {
                $fistMsg.fadeIn(function () {
                    // console.log('next')
                    setTimeout(function () {
                        next()
                    }, 1000)
                })
            })
            // flip
            .queue('change', function (next) {
                const words = $titleWords.find('.word')
                let i = -1
                const runNextFlip = function () {
                    i += 1

                    const flippers = words.eq(i).find('.flipper')

                    flippers.addClass('flip')
                    flippers.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
                        if (i === (words.length - 1)) {
                            // console.log('next')
                            next()
                        } else {
                            runNextFlip()
                        }
                    })
                }
                runNextFlip()
            })
            .queue('change', function (next) {
                $fistMsg.fadeOut(function () {
                    $secondMsg.fadeIn(function () {
                        // console.log('next')
                        // setTimeout(function () {
                        //     next()
                        // }, 500)
                        next()
                    })
                })
            })
            // close modal
            .queue('change', function () {
                // console.log('close')
                setTimeout(function () {
                    // close modal
                    $store.dispatch('actionModalClose', {modal: 'IssuesChange'})
                }, 1000)
            })

            // start queue
            $model.dequeue('change')
        }
    }
}
</script>
<style lang="scss">
//modal
.dropModal.issues-end {
    top: 0vw;
    width: 100%;
    height: 100%;

    .dm-content {
        height: 34.72vw;
        // margin-top: 40vw;
        transform: translateY(50vw);

        border-radius:0;
        border: 0;

        background: url(../assets/image/bg-endissue2.png) no-repeat center center;
        background-size:100% auto;
        -webkit-box-shadow:none;
        box-shadow:none;

        transition: all .3s ease;
        .dm-body {
            text-align: center;
            padding-top: 4vw;
            .es-body {
                width: 83.33vw;
                height: 27.77vw;
                margin: 0 auto;
                .es-title-word {
                    width: 100%;
                    height: 12.5vw;
                    margin-top: 2.7vw;
                    padding-left: 8.2vw;



                    .word {
                        display: none;
                        float: left;

                        width: 12.5vw;
                        height: 12.5vw;


                        .flipper {
                            position: relative;
                            width: inherit;
                            height: inherit;

                            transition: 0.2s;
                            transform-style: preserve-3d;

                            &.flip {
                                transform: rotateY(180deg);
                            }

                            .front {
                                z-index: 2;
                                backface-visibility: hidden;
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: inherit;
                                height: inherit;

                                transform: rotateY(0deg);
                            }

                            .back {
                                backface-visibility: hidden;
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: inherit;
                                height: inherit;

                                transform: rotateY(180deg);
                            }
                        }



                        &:nth-child(1){
                            .front {
                                background: url(../assets/image/text-es-mai.png) no-repeat center center;
                                background-size: 100% 100%;
                            }
                            .back {
                                background: url(../assets/image/text-es-kai.png) no-repeat center center;
                                background-size: 100% 100%;
                            }
                        }

                        &:nth-child(2){
                            .front {
                                background: url(../assets/image/text-es-ding.png) no-repeat center center;
                                background-size: 100% 100%;
                            }
                            .back {
                                background: url(../assets/image/text-es-shi.png) no-repeat center center;
                                background-size: 100% 100%;
                            }
                        }

                        &:nth-child(3){
                            .front {
                                background: url(../assets/image/text-es-li.png) no-repeat center center;
                                background-size: 100% 100%;
                            }
                            .back {
                                background: url(../assets/image/text-es-tou.png) no-repeat center center;
                                background-size: 100% 100%;
                            }
                        }

                        &:nth-child(4){
                            .front {
                                background: url(../assets/image/text-es-shou.png) no-repeat center center;
                                background-size: 100% 100%;
                            }
                            .back {
                                background: url(../assets/image/text-es-zhu.png) no-repeat center center;
                                background-size: 100% 100%;
                            }
                        }

                        + .word {
                            margin-left: 5.55vw;
                        }

                    }
                }

                .es-msg {
                    width: 100%;
                    height: 5.55vw;

                    margin-top: 6vw;

                    font-size: 3.88vw;
                    color: #945222;
                    .first-msg, .second-msg {
                        display: none;
                    }
                }
            }
            
        }
    }
    
}
/** vue animation **/
.dropModal.issues-end.modal-transition-enter, .dropModal.issues-end.modal-transition-leave-active {
    .dm-content {
        transform: translateY(30vw);
    }
}
</style>

