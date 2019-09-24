import request from '@/router/axios'

const prefixUrl = '/admin/social'

export function fetchList (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}

export function addObj (obj) {
  return request({
    url: `${prefixUrl}/`,
    method: 'post',
    data: obj,
  })
}

export function getObj (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

export function delObj (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'delete',
  })
}

export function putObj (obj) {
  return request({
    url: `${prefixUrl}/`,
    method: 'put',
    data: obj,
  })
}

export function bindAccount (obj) {
  return request({
    url: `${prefixUrl}/bind`,
    method: 'get',
    params: obj,
  })
}
