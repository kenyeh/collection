import { rolePermission, btnPermission } from './permission'

const install = function(Vue) {
  Vue.directive('rolePermission', rolePermission)
  Vue.directive('btnPermission', btnPermission)
}

if (window.Vue) {
  window['rolePermission'] = rolePermission
  window['btnPermission'] = btnPermission
  Vue.use(install); // eslint-disable-line
}

export default {
  rolePermission,
  btnPermission
}
