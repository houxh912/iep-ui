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
//新增
export function addCenterWord (centerId,obj) {
  return request({
    url: `${prefixUrl}/result/add/center/${centerId}`,
    method: 'post',
    data: obj,
  })
}
//释放中心词
export function releaseCenterById (id) {
  return request({
    url: `${prefixUrl}/result/release/${id}`,
    method: 'get',
  })
}
//释放卫星词
export function releaseSatelliteById (id) {
  return request({
    url: `${prefixUrl}/result/release/satellite/${id}`,
    method: 'get',
  })
}
//新增
export function editCenterWord (id,obj) {
  return request({
    url: `${prefixUrl}/result/add/satellite/${id}`,
    method: 'post',
    data: obj,
  })
}
//更替中心词
export function releaseTransById (opts) {
  return request({
    url: `${prefixUrl}/result/trans`,
    method: 'get',
    params: opts,
  })
}