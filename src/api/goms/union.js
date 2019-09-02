import request from '@/router/axios'

const prefixUrl = '/admin/union'
// @/api/goms/union
export function getUnionPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}

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

export function getUnionOrgList () {
  return request({
    url: `${prefixUrl}/org/list`,
    method: 'get',
  })
}

export function getUnionOrgPage (query) {
  return request({
    url: `${prefixUrl}/org/page`,
    method: 'get',
    params: query,
  })
}

export function getUnionNoOrgList () {
  return request({
    url: `${prefixUrl}/no_union_org/list`,
    method: 'get',
  })
}

export function removeOrgById (id) {
  return request({
    url: `${prefixUrl}/org/remove/${id}`,
    method: 'get',
  })
}

export function addOrgById (id) {
  return request({
    url: `${prefixUrl}/org/add/${id}`,
    method: 'get',
  })
}

export function addOrgByIds (ids) {
  return request({
    url: `${prefixUrl}/org/pull`,
    method: 'post',
    data: ids,
  })
}

export function putUnion (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}

export function postUnion (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
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

export function getOrgMessage () {
  return request({
    url: `${prefixUrl}/org/message`,
    method: 'get',
  })
}

export function agreeOrgMessage (id) {
  return request({
    url: `${prefixUrl}/agree/join/union/${id}`,
    method: 'get',
  })
}

export function refuseOrgMessage (id) {
  return request({
    url: `${prefixUrl}/refuse/join/union/${id}`,
    method: 'get',
  })
}

export function reviewById (obj) {
  return request({
    url: `${prefixUrl}/review/batch`,
    method: 'post',
    data: obj,
  })
}


export function putObj (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}

export function delObj (id) {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: 'post',
  })
}

export function getUserPage (query) {
  return request({
    url: `${prefixUrl}/user/page`,
    method: 'get',
    params: query,
  })
}

export function getEventPage (query) {
  return request({
    url: `${prefixUrl}/event/page`,
    method: 'get',
    params: query,
  })
}

export function postEvent (obj) {
  return request({
    url: `${prefixUrl}/event/create`,
    method: 'post',
    data: obj,
  })
}

export function putEvent (obj) {
  return request({
    url: `${prefixUrl}/event/update`,
    method: 'post',
    data: obj,
  })
}

export function deleteEventById (id) {
  return request({
    url: `${prefixUrl}/event/delete/batch`,
    method: 'post',
    data: [id],
  })
}

export function deleteEvent (ids) {
  return request({
    url: `${prefixUrl}/event/delete/batch`,
    method: 'post',
    data: ids,
  })
}

export function getHistoryPage (query) {
  return request({
    url: `${prefixUrl}/history/page`,
    method: 'get',
    params: query,
  })
}

export function postHistory (obj) {
  return request({
    url: `${prefixUrl}/history/create`,
    method: 'post',
    data: obj,
  })
}

export function putUnionRoleUpdate (obj) {
  return request({
    url: `${prefixUrl}/update/user/role`,
    method: 'post',
    data: obj,
  })
}

export function getUnionRoleByUserId (id) {
  return request({
    url: `${prefixUrl}/user/role/${id}`,
    method: 'get',
  })
}

export function getNotInUnionOrgPage (query) {
  return request({
    url: `${prefixUrl}/no_union_org/page`,
    method: 'get',
    params: query,
  })
}
