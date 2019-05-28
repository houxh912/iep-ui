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

export function postGuomaibei (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}