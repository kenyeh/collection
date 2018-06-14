<template>
    <div class="info-main">
        <div class="front-list">
            <ul>
                <li v-for="(item, index) in unitShow" v-bind:class="unitShow[index].class">
                    <span class="list-title">{{item.title}}</span>
                    <span class="num" v-bind:class="{show:UnitData[index].numShow}">{{item.num}}</span>
                </li>
            </ul>
        </div>
        <div class="back-list">
            <ul>
                <li v-for="(item, index) in UnitData" v-bind:class="{loading:UnitData[index].class.loading}">
                    <span class="list-title">{{item.title}}</span>
                    <span class="num" v-bind:class="{show:UnitData[index].numShow}">{{item.num}}</span>
                </li>
            </ul>
        </div>
        <div class="history" v-bind:class="historyClass" v-on:click="openModal">
            <div class="history-title"></div>
            <div class="history-list">
                <ul>
                    <li v-for="(item, index) in historyBarData">
                        <span class="icon" v-bind:class="item.class">{{item.num}}</span><!--{{item.num}}-->
                    </li>
                </ul>
            </div>
            <div class="history-more">
                <button class="btn btn-history-more"></button>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'

export default {
    name: 'gameInfo',
    data () {
        return {
            UnitData: [
                {
                    class: {
                        enable: false,
                        first: false,
                        last: false,
                        loading: true
                    },
                    title: '万位',
                    num: '0',
                    numShow: false
                },
                {
                    class: {
                        enable: false,
                        first: false,
                        last: false,
                        loading: true
                    },
                    title: '千位',
                    num: '0',
                    numShow: false
                },
                {
                    class: {
                        enable: false,
                        first: false,
                        last: false,
                        loading: true
                    },
                    title: '百位',
                    num: '0',
                    numShow: false
                },
                {
                    class: {
                        enable: false,
                        first: false,
                        last: false,
                        loading: true
                    },
                    title: '十位',
                    num: '0',
                    numShow: false
                },
                {
                    class: {
                        enable: false,
                        first: false,
                        last: false,
                        loading: true
                    },
                    title: '个位',
                    num: '0',
                    numShow: false
                }
            ],
            historyClass: {
                first: false,
                last: false
            }
        }
    },
    computed: {
        unitShow: function () {
            // get children getter
            const _this = this
            const unit = _this.$store.getters.getModuleGetter('getUnit', true) || []
            const lastWinNumber = _this.$store.getters.geLastWinNumber
            let unitSetting = _this.UnitData
            let historyClass = _this.historyClass

            unit.map(function (value, index) {
                let thisUnit = unitSetting[index]
                // enable
                if (value) {
                    thisUnit.class.enable = true
                } else {
                    thisUnit.class.enable = false
                }

                if (index > 0) {
                    if (!unit[index - 1] && value) {
                        // first
                        thisUnit.class.first = true
                    } else {
                        thisUnit.class.first = false
                    }
                } else if (value) {
                    // first
                    thisUnit.class.first = true
                    historyClass.first = true
                } else {
                    thisUnit.class.first = false
                    historyClass.first = false
                }

                if (index < (unit.length - 1)) {
                    if (!unit[index + 1] && value) {
                        // last
                        thisUnit.class.last = true
                    } else {
                        thisUnit.class.last = false
                    }
                } else if (value) {
                    // last
                    thisUnit.class.last = true
                    historyClass.last = true
                } else {
                    thisUnit.class.last = false
                    historyClass.last = false
                }

                if (lastWinNumber.numner === '') {
                    thisUnit.class.loading = true
                } else {
                    thisUnit.class.loading = false

                    if (index === (unit.length - 1)) {
                        // show issue Num
                        console.log('new win number', lastWinNumber.numner)
                        _this.showIssueNum(lastWinNumber)
                    }
                }
            })

            return unitSetting
        },
        historyBarData: function () {
            // console.log('get', this.$store.getters.getHistoryBarData)
            return this.$store.getters.getHistoryBarData
        }
    },
    created () {
        // this.$store.dispatch('actionUpdateHistoryBar')
    },
    methods: {
        openModal: function () {
            this.$store.dispatch('actionModalShow', {modal: 'History'})
        },
        showIssueNum: function (numbersData) {
            console.log('showIssueNum', numbersData.numner)
            let unitData = this.UnitData
            const aryNumbers = numbersData.numner.split('')
            const stopFlag = [0, 0, 0, 0, 0]
            const _this = this

            if (!numbersData.animation) {
                // no animation
                aryNumbers.map(function (num, index) {
                    unitData[index].num = num
                })
            } else {
                // use animation
                console.log('use animation')

                unitData.map(function (unit, index) {
                    unit.num = (Math.random() * 9).toFixed(0)
                    let t = setInterval(function () {
                        let unitNum = parseInt(unit.num)
                        if (stopFlag[index]) {
                            // console.log('stop on ' + _num);

                            // stop next
                            setTimeout(function () {
                                stopFlag[index + 1] = 1
                            }, 250)

                            // show num
                            unit.num = aryNumbers[index]
                            unit.numShow = true

                            // stop repeat
                            clearInterval(t)

                            // end last one and update history
                            if (index === (unitData.length - 1)) {
                                // console.log(index);
                                // run updatehistory
                                // updateHistory(numbers);
                                console.log('going to updateHistory')
                                _this.updateHistoryAnimation(aryNumbers)
                            }
                        } else {
                            // continue

                            if (unitNum === 9) {
                                unitNum = 0
                            } else {
                                unitNum += 1
                            }

                            unit.num = unitNum.toFixed(0)
                        }
                    }, 80)
                })

                // 2 second waiting and show numbers
                setTimeout(function () {
                    stopFlag[0] = 1
                }, 2000)
            }
        },
        updateHistoryAnimation: function (numbers) {
            console.log('update history', numbers)
            const _this = this

            const $list = $('.history-list ul')
            // const $li = $list.find('li').last().prev('li')
            const $li = $list.find('li').last()
            const $icon = $li.find('span')
            // const move = parseFloat($li.css('margin-left')) + $li.width()

            // change
            $icon.queue('update', function (next) {
                _this.$store.dispatch('actionUpdateHistoryBar')
                next()
            })
            // blink
            .queue('update', function (next) {
                $(this).animate({opacity: 0}, 'fast')
                $(this).animate({opacity: 1}, 'fast')
                $(this).animate({opacity: 0}, 'fast')
                $(this).animate({opacity: 1}, 'fast')
                $(this).animate({opacity: 0}, 'fast')
                $(this).animate({opacity: 1}, 'fast', function () {
                    next()
                })
            })
            /*
            .queue('update', function (next) {
                const _margin = parseFloat($list.css('margin-left')) - move

                $list.animate({
                    marginLeft: _margin
                }, function () {
                    next()
                })
            })
            */
            .queue('update', function () {
                _this.$store.dispatch('actionCheckIssueState')

                // show winning
                _this.$store.dispatch('actionUpdateRecord', false)
                .then(() => {
                    _this.$store.dispatch('actionCheckWinning')
                })
            })

            $icon.dequeue('update')
        }
    }
}
</script>
