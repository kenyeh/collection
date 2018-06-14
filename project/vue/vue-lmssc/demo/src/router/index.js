import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    // no hash , ex #/hello
    mode: 'history',
    base: __dirname,
    routes: []
})
