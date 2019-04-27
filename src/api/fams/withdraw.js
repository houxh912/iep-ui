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