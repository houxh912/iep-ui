import request from '@/router/axios'

const prefixUrl = '/fams/investment'
// @/api/fams/investment

export function getInvestmentPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}

export function postInvestment (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}