import request from '@/router/axios'

const prefixUrl = '/admin/org'
// @/api/goms/org
export function getOrgBySelf () {
  return request({
    url: `${prefixUrl}`,
    method: 'get',
  })
}

export function getOrgLogList () {
  return request({
    url: `${prefixUrl}/log_list`,
    method: 'get',
  })
}

