import request from '@/router/axios'

const prefixUrl = '/hrms/iephrsplendormanage'
// @/api/hrms/iephrsplendormanage
export function getGloriousPeoplePage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}