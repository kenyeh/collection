import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/agent/list',
    method: 'get',
    params
  })
}
