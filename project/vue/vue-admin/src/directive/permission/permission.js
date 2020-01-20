import store from '@/store'

export const rolePermission = {
  inserted(el, binding, vnode) {
    const { value } = binding
    const roles = store.getters && store.getters.roles

    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value

      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}

export const btnPermission = {
  inserted(el, binding, vnode) {
    const { value } = binding
    const items = store.getters && store.getters.permission_items

    if (value && value instanceof Array && value.length > 0) {
      const permissionItems = value

      const hasPermission = items.some(item => {
        return permissionItems.includes(item)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need item permit! Like v-btnPermission="['search','add']"`)
    }
  }
}
