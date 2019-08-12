import request from '@/router/axios'

export function roleList () {
  return request({
    url: '/admin/role/roleList',
    method: 'get',
  })
}

export function fetchList (query) {
  return request({
    url: '/admin/role/page',
    method: 'get',
    params: query,
  })
}

export function getOrgRolePage (query) {
  return request({
    url: '/admin/role/org/page',
    method: 'get',
    params: query,
  })
}

export function getUnionRolePage (query) {
  return request({
    url: '/admin/role/union/page',
    method: 'get',
    params: query,
  })
}

export function postUnionRole (obj) {
  return request({
    url: '/admin/role/union/create',
    method: 'post',
    data: obj,
  })
}

export function deptRoleList () {
  return request({
    url: '/admin/role/list',
    method: 'get',
  })
}

export function getObj (id) {
  return request({
    url: '/admin/role/' + id,
    method: 'get',
  })
}

export function addObj (obj) {
  return request({
    url: '/admin/role',
    method: 'post',
    data: obj,
  })
}

export function postOrgObj (obj) {
  return request({
    url: '/admin/role/create/org',
    method: 'post',
    data: obj,
  })
}

export function putObj (obj) {
  return request({
    url: '/admin/role/update',
    method: 'post',
    data: obj,
  })
}

export function delObj (id) {
  return request({
    url: '/admin/role/delete/' + id,
    method: 'post',
  })
}

export function permissionUpd (roleId, menuIds) {
  return request({
    url: '/admin/role/menu',
    method: 'put',
    params: {
      roleId: roleId,
      menuIds: menuIds,
    },
  })
}

export function fetchRoleTree (roleName) {
  return request({
    url: '/admin/menu/tree/' + roleName,
    method: 'get',
  })
}
