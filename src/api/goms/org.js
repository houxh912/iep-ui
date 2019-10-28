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

export function getOrgLogList (current) {
  return request({
    url: `${prefixUrl}/log_list`,
    method: 'get',
    params: {
      current,
    },
  })
}

export function putOrg (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
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

export function validOrgName (name) {
  return request({
    url: `${prefixUrl}/repeat/${name}`,
    method: 'get',
  })
}

export function getOrgList (orgName, orgType) {
  return request({
    url: `${prefixUrl}/list`,
    method: 'get',
    params: {
      orgName,
      orgType,
    },
  })
}

export function getICanOrgList (orgName, orgType) {
  return request({
    url: `${prefixUrl}/i_can/list`,
    method: 'get',
    params: {
      orgName,
      orgType,
    },
  })
}

export function addObj (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function addiCanObj (obj) {
  return request({
    url: `${prefixUrl}/i_can/create`,
    method: 'post',
    data: obj,
  })
}

export function applyObj (obj) {
  return request({
    url: `${prefixUrl}/apply`,
    method: 'post',
    data: obj,
  })
}

export function pullUser (data) {
  return request({
    url: `${prefixUrl}/pull`,
    method: 'post',
    data: data,
  })
}
export function pullUsersWithMessage (data) {
  return request({
    url: `${prefixUrl}/invite`,
    method: 'post',
    data: data,
  })
}

export function passJoins (obj) {
  return request({
    url: `${prefixUrl}/pass/joins`,
    method: 'post',
    data: obj,
  })
}

export function getOrgCard (id) {
  return request({
    url: `/admin/channel_admin/org/card/${id}`,
    method: 'get',
  })
}

export function getOrgAgreeReject (id, status) {
  return request({
    url: `${prefixUrl}/agree/reject/${id}?status=${status}`,
    method: 'get',
  })
}
