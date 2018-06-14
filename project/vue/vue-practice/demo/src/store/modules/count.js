// types
const types = {
    INCREASE: 'count/INCREASE',
    DECREASE: 'count/DECREASE',
    COUNT_RESET: 'count/COUNT_RESET'
}

// state
const state = {
    count: 0
}

// getters
const getters = {
    getCount: state => {
        return state.count
    }
}

// actions
const actions = {
    actionIncrease ({ commit }, num) {
        commit(types.INCREASE, num)
    },
    actionDecrease ({ commit }, num) {
        commit(types.DECREASE, num)
    },
    actionCountReset ({ commit }) {
        commit(types.COUNT_RESET)
    }
}

// mutations
const mutations = {
    [types.INCREASE] (state, num) {
        num
        state.count += parseInt(num)
        console.log('INCREASE', num, 'state?', state.count)
    },
    [types.DECREASE] (state, num) {
        state.count -= parseInt(num)
        console.log('DECREASE', num, 'state?', state.count)
    },
    [types.COUNT_RESET] (state) {
        state.count = 0
        console.log('COUNT_RESET - state?', state.count)
    }
}

/* export */
export default {
    state,
    getters,
    actions,
    mutations
}
