import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/report/donateReport',
    method: 'get',
    params
  })
}
