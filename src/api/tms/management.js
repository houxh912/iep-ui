import request from '@/router/axios'

const prefixUrl = '/tms'
// @/api/tms/
export function getResultCenterPage (opts) {
  return request({
    url: `${prefixUrl}/result/center/page`,
    method: 'get',
    params: opts,
  })
}
export function getResultPageByTagId (id) {
  return function () {
    return request({
      url: `${prefixUrl}/result/satellite/page/${id}`,
      method: 'get',
    })
  }
}
export function getResultById (id) {
  return request({
    url: `${prefixUrl}/tag/${id}`,
    method: 'get',
  })
}
//联想获取游离标签集
export function getResultList (query) {
  return request({
    url: `${prefixUrl}/result/list`,
    method: 'get',
    params: query,
  })
}
export function getResultFreePage (opts) {
  return request({
    url: `${prefixUrl}/result/free/page`,
    method: 'get',
    params: opts,
  })
}