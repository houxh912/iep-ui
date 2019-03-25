import request from '@/router/axios'

const prefixUrl = '/admin/org'
// @/api/goms/org
export function getOrgBySelf () {
  return request({
    url: `${prefixUrl}`,
    method: 'get',
  })
}

export function getOrgById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

export function getOrgLogList () {
  return request({
    url: `${prefixUrl}/log_list`,
    method: 'get',
  })
}


export function putOrg (obj) {
  return request({
    url: `${prefixUrl}`,
    method: 'put',
    data: obj,
  })
}

export function getOrgNoAdminUserList () {
  return request({
    url: `${prefixUrl}/no_admin_user/list`,
    method: 'get',
  })
}

export function unSetOrgAdmin (id) {
  return request({
    url: `${prefixUrl}/unset/admin/${id}`,
    method: 'get',
  })
}

export function setOrgAdmin (id) {
  return request({
    url: `${prefixUrl}/set/admin/${id}`,
    method: 'get',
  })
}

export function toggleOrgOpen () {
  return request({
    url: `${prefixUrl}/update/open`,
    method: 'get',
  })
}