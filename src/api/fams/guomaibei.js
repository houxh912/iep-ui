import request from '@/router/axios'

const prefixUrl = '/fams/guomaibei'
// @/api/fams/guomaibei

export function getGuomaibeiPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}