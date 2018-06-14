// sanxing
// types
const types = {
    UPDATE_PANEL_DATA: 'UPDATE_PANEL_DATA',
    UPDATE_PANEL_SUBMIT_DATA: 'UPDATE_PANEL_SUBMIT_DATA'
}

// state
const state = {
    componentName: 'yixing',
    panelData: {
        v_0: {
            total: 0,
            submitTotal: 0,
            odds: 0,
            cnName: '0'
        },
        v_1: {
            total: 0,
            submitTotal: 0,
            odds: 0,
            cnName: '1'
        },
        v_2: {
            total: 0,
            submitTotal: 0,
            odds: 0,
            cnName: '2'
        },
        v_3: {
            total: 0,
            submitTotal: 0,
            odds: 0,
            cnName: '3'
        },
        v_4: {
            total: 0,
            submitTotal: 0,
            odds: 0,
            cnName: '4'
        },
        v_5: {
            total: 0,
            submitTotal: 0,
            odds: 0,
            cnName: '5'
        },
        v_6: {
            total: 0,
            submitTotal: 0,
            odds: 0,
            cnName: '6'
        },
        v_7: {
            total: 0,
            submitTotal: 0,
            odds: 0,
            cnName: '7'
        },
        v_8: {
            total: 0,
            submitTotal: 0,
            odds: 0,
            cnName: '8'
        },
        v_9: {
            total: 0,
            submitTotal: 0,
            odds: 0,
            cnName: '9'
        },
        v_10: {
            total: 0,
            submitTotal: 0,
            odds: 0,
            cnName: '\u5927'
        },
        v_11: {
            total: 0,
            submitTotal: 0,
            odds: 0,
            cnName: '\u5c0f'
        }
    }
}

// getters
const getters = {
    getPanelData: state => state.panelData,
    getNumToIcon: (state, getters, rootState, rootGetters) => (numbers) => {
        let LotteryUnit = rootGetters.getModuleGetter('getUnit', true)
        let ballValue = ''
        let ballClass = ''
        let itemData = {
            num: ballValue,
            class: ballClass
        }
        let showingNumber = []

        // 无开奖号码
        if (numbers.length === 0) {
            // 未开奖
            ballClass = 'icon-unknow'

            itemData.num = ballValue
            itemData.class = ballClass

            return itemData
        }

        numbers.forEach(function (value, index) {
            if (LotteryUnit[index] > 0) {
                showingNumber.push(value)
            }
        })

        ballValue = showingNumber[0]

        // class
        if (Number(ballValue) >= 5) {
            ballClass = 'icon-da'
        } else {
            ballClass = 'icon-xiao'
        }

        itemData.num = ballValue
        itemData.class = ballClass

        return itemData
    },
    getBetData: (state, getters, rootState, rootGetters) => (data) => {
        console.log('BetData', data)
        // each bet list data
        let submitData = {
            gid: rootState.currentMethodData.currentMethodId,
            betValue: data.value,
            betName: data.class,
            money: rootState.currentCoin.money
        }

        // special play id match
        let specialBetMatch = rootState.currentMethodData.currentMethod.valueMatch
        if (specialBetMatch['v_' + data.value]) {
            submitData.gid = specialBetMatch['v_' + data.value].id
            submitData.betName = specialBetMatch['v_' + data.value].name
        }

        return submitData
    }
}

// actions
const actions = {
    actionUpdatePanelOdddata ({commit, state}, data) {
        commit(types.UPDATE_PANEL_DATA, data)
    },
    actionUpdatePanelSubmitData ({commit, state, rootState}, data) {
        const methodData = rootState.currentMethodData.currentMethod

        console.log('order', data)
        console.log('modalData', methodData)
        const methodId = rootState.currentMethodData.currentMethodId
        console.log('modalId', methodId)
        // special play id match
        let specialBetMatch = rootState.currentMethodData.currentMethod.valueMatch

        let submitData = {}
        data.map(order => {
            if (specialBetMatch) {}

            if (order.methodId === methodId) {
                if (submitData['v_' + order.betValue] === undefined) {
                    submitData['v_' + order.betValue] = order.betMoney
                } else {
                    submitData['v_' + order.betValue] += order.betMoney
                }
            }
        })
        console.log('submitData', submitData)
        commit(types.UPDATE_PANEL_SUBMIT_DATA, submitData)
    }
}

// mutations
const mutations = {
    [types.UPDATE_PANEL_DATA] (state, data) {
        // update panelData data from value data
        const panelData = state.panelData
        Object.keys(panelData).map(function (key, index) {
            if (index < 10) {
                panelData[key].odds = data.v_0to10.odds
            } else {
                if (panelData[key] !== undefined) {
                    panelData[key].odds = data[key].odds
                } else {
                    console.error('panelData[key] is undefined')
                }
            }
        })
    },
    [types.UPDATE_PANEL_SUBMIT_DATA] (state, data) {
        const panelData = state.panelData

        Object.keys(panelData).map(function (key, index) {
            panelData[key].submitTotal = 0
            if (data[key] !== undefined) {
                panelData[key].submitTotal = data[key]
            }
        })
    }
}

// modules
import wanwei from './modules/wanwei'
import qianwei from './modules/qianwei'
import baiwei from './modules/baiwei'
import shiwei from './modules/shiwei'
import gewei from './modules/gewei'

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
    modules: {
        wanwei,
        qianwei,
        baiwei,
        shiwei,
        gewei
    }
}

