import Vue from 'vue'

function togglePassword (val) {
    return val ? 'text' : 'password'
}

// custom toggle password
Vue.directive('toggle-password', {
    bind (el, binding) {
        el.type = togglePassword(binding.value)
    },
    update (el, binding) {
        el.type = togglePassword(binding.value)
    }
})
