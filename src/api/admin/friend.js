import request from '@/router/axios'
const prefixUrl = '/admin/friend'
// @/api/admin/friend
export function getFriendPage (params) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: params,
  })
}
export function getFriendById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}
export function getFriendAgreeReject (id, status) {
  return request({
    url: `${prefixUrl}/agree/reject/${id}?status=${status}`,
    method: 'get',
  })
}
