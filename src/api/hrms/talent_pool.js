import request from '@/router/axios'

const prefixUrl = '/hrms/talent_pool'
// @/api/hrms/talent_pool
export function getTalentPoolPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}