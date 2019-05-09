import request from '@/router/axios'

const prefixUrl = '/fams/expenditure'
// @/api/fams/expenditure

export function getExpenditurePage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}