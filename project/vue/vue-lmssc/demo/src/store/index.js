import Vue from 'vue'
import Vuex from 'vuex'

// root
import {state, actions, mutations} from './root'
import * as getters from './getter'

// modules
import sanxing from './modules/sanxing/index'
import yixing from './modules/yixing/index'

Vue.use(Vuex)

export default new Vuex.Store({
    // root
    state,
    actions,
    mutations,
    getters,
    // modules,
    modules: {
        sanxing,
        yixing
    },
    // can't change
    strict: true
})
