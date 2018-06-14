// import * as types from './mutations_type'
// import severData from '../../static/defoultGameSetting.json'
const types = {
    UPDATE_GAME_METHOD: 'UPDATE_GAME_METHOD',
    UPDATE_HISTORY_BAR_DATA: 'UPDATE_HISTORY_BAR_DATA',
    CHANGE_MODAL_STATE: 'CHANGE_MODAL_STATE',
    DISABLE_MODAL_STATE: 'DISABLE_MODAL_STATE',
    SET_COIN_TYPE: 'SET_COIN_TYPE',
    UPDATE_ORDER_DATA: 'UPDATE_ORDER_DATA',
    CLEAR_ORDERS: 'CLEAR_ORDERS',
    SET_COIN_FLY_TARGET: 'SET_COIN_FLY_TARGET',
    UPDATE_SURPLUS_TIME: 'UPDATE_SURPLUS_TIME',
    UPDATE_VALUE_TOTAL: 'UPDATE_VALUE_TOTAL',
    UPDATE_GAME_SETTING: 'UPDATE_GAME_SETTING',
    UPDATE_WINNUMBER_STATE: 'UPDATE_WINNUMBER_STATE',
    UPDATE_ISSUES_SETTING_DATA: 'UPDATE_ISSUES_SETTING_DATA',
    UPDATE_RECORD_DATA: 'UPDATE_RECORD_DATA',
    UPDATE_CANCEL_ORDER_STATE: 'UPDATE_CANCEL_ORDER_STATE'
}

export const state = {
    //  seconds to get issues winning numbers
    issueTimeInterval: 15,
    currentBalance: 0,
    currentIssues: '',
    lastIssues: '',
    lastWinNumber: {
        numner: '',
        animation: false
    },
    issueStateText: '待开奖',
    surplusTime: 0,
    historyBar: [],
    currentCoin: {
        type: '',
        money: 0,
        flyToTargetClass: ''
    },
    currentMethodData: {
        currentMethodId: 0,
        currentMethodGroup: 0,
        currentMethodName: '',
        currentMethodFullName: '',
        currentMethodFullCnName: '',
        currentMethod: {}
    },
    severData: {},
    modalState: {
        Options: false,
        Record: false,
        History: false,
        PlayChange: false,
        Winning: false,
        IssuesChange: false,
        Loading: false
    },
    // order data
    // ex { playId:10, methodId:101, betMoney: 500, ...}
    ordersList: {
        orders: [],
        orderAmount: 0,
        gameId: 0,
        gameName: '',
        userId: 1,
        userName: 'user1',
        userBalance: 0
    },
    // orders Record
    ordersRecord: {
        currentIssues: '',
        // state => 开奖
        // result => total win
        list: []
    }

}

export const actions = {
    actionInitiGame ({commit, state, dispatch, getters}) {
        dispatch('actionModalShow', {modal: 'Loading'})
        console.log('init game')

        dispatch('actionFetchGameSetting')
        .then(() => {
            // set default Method
            dispatch('actionChangeGameMethod', state.severData.defaultMethodId)
            // set default coin
            dispatch('actionSetCoin', state.severData.defaultCoin)

            dispatch('actionModalClose', {modal: 'Loading'})
            // start count down
            dispatch('actionCountdown')
            // check issue state
            dispatch('actionCheckIssueState')
        })
    },
    actionChangeGamePlay ({commit, state, dispatch, getters}, playId) {
        let playData = getters.getPlayById(playId)

        if (Object.keys(playData).length !== 0) {
            dispatch('actionChangeGameMethod', playData.children[0].id)
        }
    },
    actionChangeGameMethod ({commit, state, dispatch, getters}, methodId) {
        console.log('going to change method', methodId)
        console.log(state.currentMethodData.currentMethodId)

        /*
        // same game
        if (state.currentMethodData.currentMethodId === methodId) {
            return
        }
        */
        // update currentMethodData setting
        dispatch('actionUpdateCurrentMethod', methodId)
        dispatch('actionUpdateSubmitPanelData')

        // update history bar
        dispatch('actionUpdateHistoryBar')

        // clear orders
        dispatch('actionClearOrders')
    },
    actionUpdateCurrentMethod ({commit, state, dispatch, getters}, methodId) {
        const methodData = getters.getMethodById(methodId)
        const methodName = getters.getModuleNameById(methodId)
        console.log(methodData, methodName)

        commit(types.UPDATE_GAME_METHOD, {methodData, methodName})

        // update panel odd data
        const moduleActionUpdatePanelOdddata = methodName.name + '/actionUpdatePanelOdddata'
        dispatch(moduleActionUpdatePanelOdddata, methodData.valueData)
    },
    actionUpdateSubmitPanelData ({commit, state, dispatch, getters}) {
        console.log('update panel submit data')
        const methodName = state.currentMethodData.currentMethodName
        let submitOrders = []
        const recordData = state.ordersRecord.list.find(item => item.issue === state.currentIssues)
        if (recordData !== undefined) {
            submitOrders = recordData.orders
        }

        // update panel submit data
        const moduleActionUpdatePanelSubmitdata = methodName + '/actionUpdatePanelSubmitData'
        dispatch(moduleActionUpdatePanelSubmitdata, submitOrders)
    },
    actionUpdateHistoryBar ({commit, state, getters}) {
        // console.log('updateHistoryBar')
        const NumToIconFn = getters.getModuleGetter('getNumToIcon')
        const data = []
        // data.push(NumToIconFn(''))

        state.severData.issueHistory.forEach((element) => data.push(NumToIconFn([...element.wn_number])))
        console.log(data)

        commit(types.UPDATE_HISTORY_BAR_DATA, data)
    },
    actionAllModalHide ({commit}) {
        return new Promise((resolve, reject) => {
            commit(types.DISABLE_MODAL_STATE)
            resolve()
        })
    },
    actionModalShow ({commit, state, dispatch}, {modal}) {
        if (typeof state.modalState.modal === undefined) {
            console.error('this modal is not defined')
            return
        }

        if (modal === 'Loading') {
            commit(types.CHANGE_MODAL_STATE, {modal, show: true})
        } else {
            dispatch('actionAllModalHide').then(() => {
                commit(types.CHANGE_MODAL_STATE, {modal, show: true})
            })
        }
    },
    actionModalClose ({commit, state, dispatch}, {modal}) {
        if (typeof state.modalState.modal === undefined) {
            console.error('this modal is not defined')
            return
        }

        commit(types.CHANGE_MODAL_STATE, {modal, show: false})
    },
    actionSetCoin ({commit}, coin) {
        commit(types.SET_COIN_TYPE, coin)
    },
    actionClearOrders ({commit}) {
        console.log('clear orders')
        commit(types.CLEAR_ORDERS)
    },
    actionBet ({commit, state, getters}, betActData) {
        console.log('actionBet', betActData)
        let balance = state.currentBalance
        let betMoney = state.currentCoin.money

        // check balance
        if ((balance - betMoney) < 0) {
            console.error('not enough money')
            // show deposit message
            return
        }
        // set fly target
        commit(types.SET_COIN_FLY_TARGET, betActData.class)

        // get bet detail
        let betDetail = getters.getModuleGetter('getBetData')(betActData)
        console.log('bet detail', betDetail)

        // update orders
        commit(types.UPDATE_ORDER_DATA, betDetail)
    },
    actionUpdateValueTotal ({commit}, betValue) {
        commit(types.UPDATE_VALUE_TOTAL, parseInt(betValue))
    },
    actionCountdown ({commit, state, dispatch}) {
        const currentTime = state.severData.currentTime
        const nextTime = state.severData.nextTime
        let surplusTime = nextTime - currentTime
        let timer
        const countFn = () => {
            // surplusTime => 0
            if (surplusTime === 0) {
                console.log('end this issue')
                clearInterval(timer)
                // clear orders
                dispatch('actionClearOrders')

                // fetch game Setting
                dispatch('actionFetchGameSetting')
                .then(() => {
                    // after update
                    console.log('after update')
                    // show change animaion
                    dispatch('actionModalShow', {modal: 'IssuesChange'})

                    // start count down
                    dispatch('actionCountdown')
                })
                .then(() => {
                    // check Issue State
                    dispatch('actionCheckIssueState')

                    // update history bar
                    dispatch('actionUpdateHistoryBar')
                })

                return
            }

            surplusTime -= 1
            commit(types.UPDATE_SURPLUS_TIME, surplusTime)
        }
        timer = setInterval(countFn, 1000)
    },
    actionGetGameIssuesTimer ({commit, state, dispatch}) {
        const intervalTime = state.issueTimeInterval * 1000
        let timer
        // let surplusTime = intervalTime

        const countFn = () => {
            // fetch game Setting
            dispatch('actionFetchGameIssues')
            .then(() => {
                if (state.lastWinNumber.numner !== '') {
                    // stop load WinNumber number
                    console.log('stop load WinNumber')
                    clearInterval(timer)

                    // UpdateRecord
                    dispatch('actionUpdateRecord')
                }
            })

            return
        }

        timer = setInterval(countFn, intervalTime)
    },
    actionFetchGameSetting ({commit, state, dispatch}) {
        return new Promise((resolve, reject) => {
            // use fetch call to get data API
            fetch('static/gameSetting.json')
            .then(function (response) {
                // fetch -> ok ( response state 200 )
                if (response.ok) {
                    return response.json()
                } else {
                    console.log(response)
                    // end loading (if there is)
                }
            })
            .then(function (data) {
                // update setting
                commit(types.UPDATE_GAME_SETTING, data)
                // update currentMethodData setting
                dispatch('actionUpdateCurrentMethod', state.currentMethodData.currentMethodId || data.defaultMethodId)
                // UpdateRecord
                dispatch('actionUpdateRecord')
                .then(() => {
                    console.log('call UpdateRecord', state.ordersRecord)
                    resolve()
                })
                // end loading (if there is)
            })
            .catch(function (error) {
                console.error(error)
                // end loading (if there is)
            })
        })
    },
    actionFetchGameIssues ({commit, state}) {
        return new Promise((resolve, reject) => {
            // use fetch call to get data API
            fetch('static/gameIssues.json')
            .then(function (response) {
                // fetch -> ok ( response state 200 )
                if (response.ok) {
                    return response.json()
                } else {
                    console.log(response)
                }
            })
            .then(function (data) {
                if (data.issueHistory[0].issue === state.severData.issueHistory[0].issue) {
                    commit(types.UPDATE_ISSUES_SETTING_DATA, data)
                }
                resolve()
            })
            .catch(function (error) {
                console.error(error)
            })
        })
    },
    actionCheckIssueState ({commit, state, dispatch}) {
        const lastWinNumber = state.severData.issueHistory[0].wn_number

        if (lastWinNumber === '') {
            // start load WinNumber number
            console.log('start load WinNumber')
            dispatch('actionGetGameIssuesTimer')
        }

        commit(types.UPDATE_WINNUMBER_STATE, lastWinNumber)
    },
    actionSubmitOrders ({commit, state, dispatch}) {
        console.log('action submit orders')
        /*
        fetch('submitUrl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state.ordersList)
        })
        */
    },
    actionOpenRecord ({commit, state, dispatch}) {
        dispatch('actionUpdateRecord')
        .then(() => {
            dispatch('actionModalShow', {modal: 'Record'})
        })
    },
    actionUpdateRecord ({commit, state, dispatch}) {
        return new Promise((resolve, reject) => {
            // use fetch call to get data API
            fetch('static/gameRecord.json')
            .then(function (response) {
                // fetch -> ok ( response state 200 )
                if (response.ok) {
                    return response.json()
                } else {
                    console.log(response)
                }
            })
            .then(function (data) {
                commit(types.UPDATE_RECORD_DATA, data)
                dispatch('actionUpdateSubmitPanelData')
                resolve()
            })
            .catch(function (error) {
                console.error(error)
            })
        })
    },
    actionCancelOrder ({commit, state, dispatch}, id) {
        console.log('actionCancelOrder', id)
        commit(types.UPDATE_CANCEL_ORDER_STATE, {orderId: id, state: 0})
        /*
        fetch('cancelUrl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orderId: id
            })
        })
        */
    },
    actionCheckWinning ({commit, state, dispatch}) {
        console.log('actionCheckWinning')
        if (state.ordersRecord.list[1].totalResult > 0 && state.ordersRecord.list[1].issue === state.lastIssues) {
            dispatch('actionModalShow', {modal: 'Winning'})
            // after seconds close
            setTimeout(function () {
                dispatch('actionModalClose', {modal: 'Winning'})
            }, 10000)
        }
    }
}

export const mutations = {
    [types.UPDATE_GAME_METHOD] (state, data) {
        // console.log('mutations', 'UPDATE_GAME_METHOD')
        // id
        state.currentMethodData.currentMethodGroup = data.methodData.pid
        state.currentMethodData.currentMethodId = data.methodData.id
        // names
        state.currentMethodData.currentMethodName = data.methodName.name
        state.currentMethodData.currentMethodFullName = data.methodName.fullName
        state.currentMethodData.currentMethodFullCnName = data.methodName.fullCnName

        state.currentMethodData.currentMethod = data.methodData
    },
    [types.UPDATE_HISTORY_BAR_DATA] (state, data) {
        state.historyBar = data.reverse()
    },
    [types.DISABLE_MODAL_STATE] (state) {
        Object.keys(state.modalState).map(function (key, index) {
            state.modalState[key] = false
        })
    },
    [types.CHANGE_MODAL_STATE] (state, {modal, show}) {
        state.modalState[modal] = show
    },
    [types.SET_COIN_TYPE] (state, coin) {
        state.currentCoin.type = coin.type
        state.currentCoin.money = coin.value
    },
    [types.CLEAR_ORDERS] (state) {
        state.ordersList.orders = []

        const panelData = state[state.currentMethodData.currentMethodName].panelData
        Object.keys(panelData).map(function (key, index) {
            panelData[key].total = 0
        })
    },
    [types.SET_COIN_FLY_TARGET] (state, TargetClass) {
        state.currentCoin.flyToTargetClass = TargetClass
    },
    [types.UPDATE_ORDER_DATA] (state, bet) {
        let amount = 0
        // add a bet to order
        state.ordersList.orders.push(bet)
        for (var order of state.ordersList.orders) {
            amount += order.money
        }
        // update amount
        state.ordersList.orderAmount = amount
    },
    [types.UPDATE_SURPLUS_TIME] (state, timeNum) {
        state.surplusTime = timeNum
    },
    [types.UPDATE_VALUE_TOTAL] (state, id) {
        const thisPanelData = state[state.currentMethodData.currentMethodName].panelData['v_' + id]
        console.log(state.currentMethodData.currentMethodName, thisPanelData, state.currentCoin.money)
        thisPanelData.total = parseFloat(thisPanelData.total) + parseFloat(state.currentCoin.money)
        thisPanelData.total = thisPanelData.total.toFixed(2)
    },
    [types.UPDATE_GAME_SETTING] (state, data) {
        state.severData = data

        state.currentBalance = data.balance

        state.currentIssues = data.currentIssues
        state.lastIssues = data.issueHistory[0].issue
        state.lastWinNumber.numner = data.issueHistory[0].wn_number
    },
    [types.UPDATE_WINNUMBER_STATE] (state, nums) {
        // state.issueStateText = text

        if (nums === '') {
            state.issueStateText = '待开奖'
        } else {
            state.issueStateText = '已开奖'
            state.lastWinNumber.numner = nums
            state.lastWinNumber.animation = false
        }
    },
    [types.UPDATE_ISSUES_SETTING_DATA] (state, data) {
        state.severData.issueHistory = data.issueHistory
        state.lastWinNumber.numner = data.issueHistory[0].wn_number
        state.lastWinNumber.animation = true
    },
    [types.UPDATE_RECORD_DATA] (state, data) {
        state.ordersRecord = data
    },
    [types.UPDATE_CANCEL_ORDER_STATE] (state, data) {
        const listIssue = state.ordersRecord.list.find(item => item.state === 0)
        const _order = listIssue.orders.find(order => order.orderId === data.orderId)
        if (_order !== undefined) {
            _order.cancelState = 0
        }
    }
}
