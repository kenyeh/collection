import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/lotteryUserInfo/list',
    method: 'get',
    params
  })
}

export function updateUserData(data) {
  return request({
    url: '/lotteryUserInfo/update',
    method: 'post',
    data
  })
}
