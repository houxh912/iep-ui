// org guide drivers
import request from '@/router/axios'
// @/api/admin/guide

const prefixUrl = '/admin/guide'

export function getOrgGuideDrivers () {
  return request({
    url: `${prefixUrl}/drivers`,
    method: 'get',
  })
}

export function getOrgGuideStep (step) {
  return request({
    url: `${prefixUrl}/step/${step}`,
    method: 'get',
  })
}
