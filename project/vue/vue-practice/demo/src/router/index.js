import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import shop from '@/pages/shop'
import Hello from '@/pages/Hello'
import Cart from '@/pages/cart'
import TodoList from '@/pages/todolist'
import C2f from '@/components/C2F'
import OpenData from '@/pages/OpenData'
import Login from '@/pages/Login'

Vue.use(VueRouter)

const router = new VueRouter({
    // no hash , ex #/hello
    mode: 'history',
    base: __dirname,
    // routre
    routes: [{
        path: '/',
        name: 'Hello',
        component: Hello,
        meta: { requiresAuth: true }
    },
    {
        path: '/Hello',
        name: 'Hello',
        component: Hello,
        meta: { requiresAuth: true }
    },
    {
        path: '/shop',
        name: 'shop',
        component: shop,
        meta: { requiresAuth: true },
        children: [
            {
                path: 'cart',
                component: Cart,
                meta: { requiresAuth: true }
            }
        ]
    },
    /*
    {
        path: '/cart',
        name: 'Cart',
        component: Cart,
        meta: { requiresAuth: true }
    },
    */
    {
        path: '/todolist',
        name: 'TodoList',
        component: TodoList,
        meta: { requiresAuth: true }
    },
    {
        path: '/c2f',
        name: 'C2f',
        component: C2f,
        meta: { requiresAuth: false }
    },
    {
        path: '/opendata',
        name: 'OpenData',
        component: OpenData,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { requiresAuth: false }
    }
    // url path wrong, redirect
    /*
    {
        path: '/*',
        redirect: '/login'
    }
    */]
})

router.beforeEach((to, from, next) => {
    console.log('to=', to.fullPath, '| from=', from.fullPath)
    // requiresAuth
    let _requiresAuth = to.matched.some(record => {
        console.log(record.name, record.meta.requiresAuth)
        return record.meta.requiresAuth
    })

    if (_requiresAuth) {
        // need requires
        console.log('token?', store.state.token)
        if (store.state.token === '') {
            next({ path: '/login' })
        } else {
            next()
        }
    } else {
        // no need requires
        next()
    }
})

export default router
