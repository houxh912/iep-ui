import request from '@/router/axios'
export const prefixUrl = '/cpms/module'

export function getModulePage (params) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: params,
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

export function passModule (id) {
  return request({
    url: `${prefixUrl}/audit_agree/${id}`,
    method: 'post',
  })
}

export function rejectModule (id) {
  return request({
    url: `${prefixUrl}/audit_disagree/${id}`,
    method: 'post',
  })
}

export function getModuleById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

export function deleteModuleById (id) {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: 'post',
  })
}
