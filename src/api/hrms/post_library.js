import request from '@/router/axios'

const prefixUrl = '/hrms/post_library'
// @/api/hrms/talent_pool
export function getPostLibraryPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}