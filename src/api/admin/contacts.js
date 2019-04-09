import request from '@/router/axios'

const prefixUrl = '/admin/contacts'
// @/api/admin/contacts
export function getUnionList () {
  return request({
    url: `${prefixUrl}/union/list`,
    method: 'get',
  })
}

export function getOrgListById (id) {
  return request({
    url: `${prefixUrl}/org/list/${id}`,
    method: 'get',
  })
}

export function getUserListById (id) {
  return request({
    url: `${prefixUrl}/user/list/${id}`,
    method: 'get',
  })
}

export function getUserListTree () {
  return request({
    url: `${prefixUrl}/all/user/list`,
    method: 'get',
  })
}