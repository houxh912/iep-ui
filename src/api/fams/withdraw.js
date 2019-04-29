import request from '@/router/axios'

const prefixUrl = '/fams/withdraw'
// @/api/fams/withdraw
export function getWithdrawPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}
export function postWithdraw (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}