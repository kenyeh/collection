import Vue from 'vue'
import Vuex from 'vuex'

// root
import {state, actions, mutations} from './root'
import * as getters from './getter'

// modules
import shop from './modules/shop'
import count from './modules/count'
import todo from './modules/todo'
import OpenData from './modules/openData'

// import * as actions from './action.js'

Vue.use(Vuex)

export default new Vuex.Store({
    // root
    state,
    actions,
    mutations,
    getters,
    // modules
    modules: {
        shop,
        count,
        todo,
        OpenData
    },

    // can't change
    strict: true
})
