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

export function postExpenditure (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}
