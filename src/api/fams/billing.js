import request from '@/router/axios'

const prefixUrl = '/fams/billing'
// @/api/fams/billing

export function getMyBillingPage (query) {
  return request({
    url: `${prefixUrl}/my/page`,
    method: 'get',
    params: query,
  })
}