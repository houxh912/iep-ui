import request from '@/router/axios'

const prefixUrl = '/fams/inner_cost'
// @/api/fams/inner_cost

export function getInnerCostPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}

export function postInnerCost (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}