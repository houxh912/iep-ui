import request from '@/router/axios'

const prefixUrl = '/admin/union'
// @/api/goms/union
export function getUnionBySelf () {
  return request({
    url: `${prefixUrl}`,
    method: 'get',
  })
}

export function getUnionLogList (current) {
  return request({
    url: `${prefixUrl}/log_list`,
    method: 'get',
    params: {
      current,
    },
  })
}

export function putUnion (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}

export function getUnionNoAdminUserList () {
  return request({
    url: `${prefixUrl}/no_admin_user/list`,
    method: 'get',
  })
}

export function unSetUnionAdmin (id) {
  return request({
    url: `${prefixUrl}/unset/admin/${id}`,
    method: 'get',
  })
}

export function setUnionAdmin (id) {
  return request({
    url: `${prefixUrl}/set/admin/${id}`,
    method: 'get',
  })
}

export function toggleUnionOpen () {
  return request({
    url: `${prefixUrl}/update/open`,
    method: 'get',
  })
}