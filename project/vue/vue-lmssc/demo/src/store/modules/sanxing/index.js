// sanxing
// types
const types = {
    UPDATE_PANEL_DATA: 'UPDATE_PANEL_DATA',
    UPDATE_PANEL_SUBMIT_DATA: 'UPDATE_PANEL_SUBMIT_DATA'
}

// state
const state = {
    componentName: 'sanxing',
    cnNameData: {
        '': ''
    },
    panelData: {
        v_0: {
            total: 0,
            submitTotal: 0,
            odds: 0,
            cnName: '\u8c79\u5b50'
        },
        v_1: {
            total: 0,
            submitTotal: 0,
            odds: 0,
            cnName: '\u987a\u5b50'
        },
        v_2: {
            total: 0,
            submitTotal: 0,
            odds: 0,
            cnName: '\u5bf9\u5b50'
        },
        v_3: {
            total: 0,
            submitTotal: 0,
            odds: 0,
            cnName: '\u5176\u5b83'
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
        let orderNumbers = []

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

        // 顺子 不论顺序
        orderNumbers = showingNumber.sort()

        // class
        // 其它
        ballClass = 'icon-ta'

        if (showingNumber[0] === showingNumber[1] && showingNumber[0] === showingNumber[2]) {
            // 豹子
            ballClass = 'icon-baozi'
        } else if (
            (orderNumbers[0] === 0 && orderNumbers[1] === 1 && orderNumbers[2] === 9) ||
            ((orderNumbers[0] - orderNumbers[1]) === -1 && (orderNumbers[1] - orderNumbers[2]) === -1)
        ) {
            // 顺子
            ballClass = 'icon-shun'
        } else if (showingNumber[0] === showingNumber[1] || showingNumber[1] === showingNumber[2] || showingNumber[0] === showingNumber[2]) {
            // 对子
            ballClass = 'icon-dui'
        }

        itemData.num = ballValue
        itemData.class = ballClass

        return itemData
    },
    getBetData: (state, getters, rootState, rootGetters) => (data) => {
        console.log('BetData', data)
        // each bet list data
        return {
            gid: rootState.currentMethodData.currentMethodId,
            betValue: data.value,
            betName: data.class,
            money: rootState.currentCoin.money
        }
    }
}

// actions
const actions = {
    actionUpdatePanelOdddata ({commit, state, rootState}, data) {
        commit(types.UPDATE_PANEL_DATA, data)
    },
    actionUpdatePanelSubmitData ({commit, state, rootState}, data) {
        console.log('order', data)

        const methodId = rootState.currentMethodData.currentMethodId
        console.log('modalId', methodId)

        let submitData = {}
        data.map(order => {
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
        Object.keys(data).map(function (key, index) {
            if (panelData[key] !== undefined) {
                panelData[key].odds = data[key].odds
            } else {
                console.error('panelData[key] is undefined')
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
import housan from './modules/housan'
import qiansan from './modules/qiansan'
import zhongsan from './modules/zhongsan'

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
    modules: {
        housan,
        qiansan,
        zhongsan
    }
}

