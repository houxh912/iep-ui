import request from '@/router/axios'

export function getOrgList () {
  return request({
    url: '/admin/org/list',
    method: 'get',
  })
}

export function addObj (obj) {
  return request({
    url: '/admin/org/create',
    method: 'post',
    data: obj,
  })
}

export function fetchList (query) {
  return request({
    url: '/admin/org/page',
    method: 'get',
    params: query,
  })
}

export function putObj (obj) {
  return request({
    url: '/admin/org/update',
    method: 'post',
    data: obj,
  })
}

export function delObj (id) {
  return request({
    url: '/admin/org/delete/' + id,
    method: 'post',
  })
}

export function reviewById (id, command) {
  return request({
    url: `/admin/org/${command}/` + id,
    method: 'post',
  })
}

export function applyObj (obj) {
  return request({
    url: '/admin/org/applyJoin',
    method: 'post',
    data: obj,
  })
}

export function applyPersonList (id) {
  return request({
    url: `/admin/org/apply/list/${id}`,
    method: 'get',
  })
}