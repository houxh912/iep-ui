import request from '@/router/axios'
const prefixUrl = '/admin/module'
// @/api/admin/module
// 模块列表
export function getModulePage (params) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: params,
  })
}


export function getUnionModulePage (params) {
  return request({
    url: `${prefixUrl}/union/module/page`,
    method: 'get',
    params: params,
  })
}

export function getOrgModuleList () {
  return request({
    url: `${prefixUrl}/org/list`,
    method: 'get',
  })
}

export function getUnionModuleList () {
  return request({
    url: `${prefixUrl}/union/list`,
    method: 'get',
  })
}

export function postModule (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function putModule (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}

export function putUnionModule (obj) {
  return request({
    url: `${prefixUrl}/set/charge`,
    method: 'post',
    data: obj,
  })
}

export function deleteModuleById (id) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: [id],
  })
}
