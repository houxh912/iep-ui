import request from '@/router/axios'

const prefixUrl = '/hrms/post_type'
// @/api/hrms/post_type
export function getPostLibrary1Page (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}