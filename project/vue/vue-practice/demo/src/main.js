// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App'
import router from './router'
import store from './store'

Vue.use(VueI18n)

// i18n
import en from './i18n/en.json'
import tw from './i18n/tw.json'

const locales = {
    en: en,
    tw: tw
}

// set lang from state
Vue.config.lang = store.state.lang
// set locales
Object.keys(locales).forEach(function (lang) {
    console.log(lang, locales[lang])
    Vue.locale(lang, locales[lang])
})

/*
const i18n = new VueI18n({
    locale: store.state.lang, // set locale
    locales // set locale messages
})
*/

Vue.config.productionTip = false

// directive
import './directive/custom-directive'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    // i18n,
    render: h => h(App)
})

import './assets/css/bootstrap/stylesheets/_bootstrap.scss'
