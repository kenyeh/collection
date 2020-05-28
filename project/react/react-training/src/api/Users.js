import request from '../utils/request';

export function fetchList(params) {
  return request({
    url: '/users',
    method: 'get',
    params,
  });
}

export function addUser(data) {
  return request({
    url: '/user',
    method: 'post',
    data,
  });
}

export function updateUser(id, data) {
  return request({
    url: `/user/${id}`,
    method: 'put',
    data,
  });
}

export function deleteUser(id) {
  return request({
    url: `/user/${id}`,
    method: 'delete',
  });
}
