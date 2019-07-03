import request from '@/router/axios'
const prefixUrl = '/admin/org_events'

// 组织大事记列表
export function getOrgEventsPage (params) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: params,
  })
}

// 组织大事记列表
export function getOrgEventsById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

// 新增
export function orgEventsCreate (data) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: data,
  })
}

// 修改
export function orgEventsUpdate (data) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: data,
  })
}

// 删除
export function orgEventsDelete (id) {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: 'post',
  })
}

// 根据组织id获取大事记集合
export function getOrgEventsByOrgId (id) {
  return request({
    url: `${prefixUrl}/list/${id}`,
    method: 'get',
  })
}
