import request from '@/router/axios'

const prefixUrl = '/fams/income'
// @/api/fams/income

export function getIncomePage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}