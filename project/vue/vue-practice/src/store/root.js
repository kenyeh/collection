import * as types from './mutations_type'

// seting lang
import Vue from 'vue'

export const state = {
    loading: false,
    token: '',
    lang: 'en'
}

export const actions = {
    toggleLoading ({ commit }, isLoading) {
        commit(types.LOADING, isLoading)
    },
    // loagin
    actionLogin ({ commit }, {email, password}) {
        console.log('1. action login')
        // open loading
        commit(types.LOADING, true)
        // use promise to be a fake api
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === 'vue_vuex@demo.com' && password === '1234') {
                    console.log('2. promise resolve')
                    // close loading
                    commit(types.LOADING, false)
                    // get token
                    commit(types.TOKEN, '3345678')
                    // resolve => then
                    resolve()
                } else {
                    // error
                    // close loading
                    commit(types.LOADING, false)
                    // reject => catch
                    reject()
                }
            }, 1500)
        })
    },
    setlanguage ({ commit }, lang) {
        commit(types.LANGUAGE, lang)
    }
}

export const mutations = {
    [types.LOADING] (state, isLoading) {
        state.loading = isLoading
    },
    [types.TOKEN] (state, token) {
        state.token = token
    },
    [types.LANGUAGE] (state, setlang) {
        state.lang = setlang
        // set vue config will change i18n lang
        Vue.config.lang = state.lang
    }
}
