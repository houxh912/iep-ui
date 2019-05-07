import request from '@/router/axios'

const prefixUrl = '/fams/company'
// @/api/fams/company

export function getCompanyPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}
