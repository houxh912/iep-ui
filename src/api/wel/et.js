import request from '@/router/axios'

const prefixUrl = '/admin/wel/et'
// @/api/wel/et
export function getOrgProfile () {
  return request({
    url: `${prefixUrl}/org/info`,
    method: 'get',
  })
}

export function getOrgCount () {
  return request({
    url: `${prefixUrl}/org/count`,
    method: 'get',
  })
}

export function getPendingList () {
  return request({
    url: `${prefixUrl}/pending/list`,
    method: 'get',
  })
}

export function getUserRelationList () {
  return request({
    url: `${prefixUrl}/user/relation/list`,
    method: 'get',
  })
}
