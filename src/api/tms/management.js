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
  return function (opts) {
    return request({
      url: `${prefixUrl}/result/satellite/page/${id}`,
      method: 'get',
      params: opts,
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
export function releaseSatelliteById (opts) {
  return request({
    url: `${prefixUrl}/result/release/satellite`,
    method: 'get',
    params: opts,
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
//人工管理分页
export function getManageRecordPage (opts) {
  return request({
    url: `${prefixUrl}/record/page`,
    method: 'get',
    params: opts,
  })
}
//人工管理分页
export function getResultStatistics () {
  return request({
    url: `${prefixUrl}/result/statistics`,
    method: 'get',
  })
}

//归类记录分页
export function getClassificationPage (opts) {
  return request({
    url: `${prefixUrl}/sort/page`,
    method: 'get',
    params: opts,
  })
}
//游离归类
export function getFreeCluster () {
  return request({
    url: `${prefixUrl}/sort/free_Cluster`,
    method: 'get',
  })
}
export function getSortPageByTagId (id) {
  return function (opts) {
    return request({
      url: `${prefixUrl}/sort/page/value/${id}`,
      method: 'get',
      params: opts,
    })
  }
}
export function getSortById (id) {
  return request({
    url: `${prefixUrl}/sort/${id}`,
    method: 'get',
  })
}