import { constantRoutes } from '@/router'
import { getRoleRoutes } from '@/api/admin/role'
/* Layout */
import Layout from '@/layout'

/**
 * Use meta.role to determine if the current user has permission
 * @param {Array} roles
 * @param {object} route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

function getItemPermission(PathName, routes) {
  let ItemPermis = []

  for (const route of routes) {
    if (route.name && route.name === PathName && route.perms) {
      ItemPermis = route.perms
      break
    }

    if (route.children) {
      ItemPermis = getItemPermission(PathName, route.children)
      if (ItemPermis.length) {
        break
      }
    }
  }

  return ItemPermis
}

export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
}

export function convertRouter(routesData) {
  const router = []
  routesData.forEach(item => {
    let itemTemp = {
      path: item.path,
      name: item.name
    }

    if (item.component === 'layout') {
      itemTemp = Object.assign({}, itemTemp, { component: Layout })
    } else {
      itemTemp = Object.assign({}, itemTemp, { component: () => import(`@/views/${item.component}`) })
    }

    if (item.children) {
      itemTemp = Object.assign({}, itemTemp, { children: convertRouter(item.children) })
    }
    if (item.redirect) {
      itemTemp = Object.assign({}, itemTemp, { redirect: item.redirect })
    }
    if (item.hidden) {
      itemTemp = Object.assign({}, itemTemp, { hidden: true })
    }
    if (item.meta) {
      itemTemp = Object.assign({}, itemTemp, { meta: item.meta })
    } else {
      itemTemp = Object.assign({}, itemTemp, { meta: { title: item.name }})
    }
    if (item.perms) {
      itemTemp = Object.assign({}, itemTemp, { perms: item.perms })
    }

    router.push(itemTemp)
  })

  return router
}

const state = {
  routes: [],
  addRoutes: [],
  items: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_ITEM: (state, items) => {
    state.items = items
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise((resolve, reject) => {
      getRoleRoutes({ roles: roles.toString() }).then(response => {
        const { data } = response
        const accessedRoutes = convertRouter(data)
        accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })

        return accessedRoutes
      }).then(accessedRoutes => {
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      }).catch(error => {
        reject(error)
      })
    })
  },
  setItemPormise({ commit }, path) {
    return new Promise((resolve, reject) => {
      try {
        const itemPermis = getItemPermission(path, state.routes)
        commit('SET_ITEM', itemPermis)
        resolve(itemPermis)
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
