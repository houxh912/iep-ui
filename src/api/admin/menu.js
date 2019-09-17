import request from '@/router/axios'

export function getMenu () {
  return request({
    url: '/admin/menu',
    method: 'get',
  })
}

export function fetchMenuTree (query) {
  return request({
    url: '/admin/menu/tree',
    method: 'get',
    params: query,
  })
}

export function addObj (obj) {
  return request({
    url: '/admin/menu',
    method: 'post',
    data: obj,
  })
}

export function getObj (id) {
  return request({
    url: '/admin/menu/' + id,
    method: 'get',
  })
}

export function delObj (id) {
  return request({
    url: '/admin/menu/' + id,
    method: 'delete',
  })
}

export function putObj (obj) {
  return request({
    url: '/admin/menu',
    method: 'put',
    data: obj,
  })
}

export function getModuleMenuTree () {
  return request({
    url: '/admin/menu/module/menu/tree',
    method: 'get',
  })
}
export function getUnionModuleMenuTree () {
  return request({
    url: '/admin/menu/module/union/menu/tree',
    method: 'get',
  })
}
