import request from '@/router/axios'

const prefixUrl = '/hrms/title_system'
// @/api/hrms/title_system
export function getTitlePage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}