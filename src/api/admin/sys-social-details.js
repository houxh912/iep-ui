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

export function getBindUserInfoList () {
  return request({
    url: `${prefixUrl}/user/info/list`,
    method: 'get',
  })
}

export function getBindCheck (obj) {
  return request({
    url: `${prefixUrl}/check`,
    method: 'get',
    params: obj,
  })
}

export function unBindAccount (obj) {
  return request({
    url: `${prefixUrl}/unbind`,
    method: 'get',
    params: obj,
  })
}

export function newUserLogin (obj) {
  return request({
    url: `${prefixUrl}/new/user`,
    method: 'get',
    params: obj,
  })
}
export function changeMobile (obj) {
  return request({
    url: `${prefixUrl}/change`,
    method: 'get',
    params: obj,
  })
}
