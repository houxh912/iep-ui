import request from '@/router/axios'

const prefixUrl = '/fams/statistics'
// @/api/fams/statistics

export function getAssetsByDate (obj) {
  return request({
    url: `${prefixUrl}/assets`,
    method: 'post',
    data: obj,
  })
}

export function getPendingPage (query) {
  return request({
    url: `${prefixUrl}/pending/page`,
    method: 'get',
    params: query,
  })
}
