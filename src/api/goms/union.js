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

export function getUnionOrgList () {
  return request({
    url: `${prefixUrl}/org/list`,
    method: 'get',
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

export function putUnion (obj) {
  return request({
    url: `${prefixUrl}/update`,
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
