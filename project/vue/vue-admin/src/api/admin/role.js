import request from '@/utils/request'

export function getRoleRoutes(role) {
  return request({
    url: '/routes/role',
    method: 'get',
    params: { role }
  })
}

export function getAllRoutes() {
  return request({
    url: '/routes',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/roles',
    method: 'get'
  })
}

export function deleteRole(id) {
  return request({
    url: `/role/${id}`,
    method: 'delete'
  })
}

export function updateRole(id, data) {
  return request({
    url: `/role/${id}`,
    method: 'put',
    data
  })
}

export function addRole(data) {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}
