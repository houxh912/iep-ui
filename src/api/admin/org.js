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
export function delGomsUser (id, orgId) {
  return request({
    url: '/admin/org/org/fire',
    method: 'post',
    data: [{
      id,
      orgId,
    }],
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

export function passPerson (obj) {
  return request({
    url: '/admin/org/pass/join',
    method: 'post',
    data: obj,
  })
}

export function orgDetail () {
  return request({
    url: '/admin/org',
    method: 'get',
  })
}

export function gomsOpen () {
  return request({
    url: '/admin/org/update/open',
    method: 'post',
  })
}

export function gomsUserPage (query) {
  return request({
    url: '/admin/org/user/page',
    method: 'get',
    params: query,
  })
}

export function usesLock (id) {
  return request({
    url: `/admin/org/lock/${id}`,
    method: 'post',
    data: id,
  })
}
export function usesUnLock (id) {
  return request({
    url: `/admin//org/unlock/${id}`,
    method: 'post',
    data: id,
  })
} 