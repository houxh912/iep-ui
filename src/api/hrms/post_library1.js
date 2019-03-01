import request from '@/router/axios'

const prefixUrl = '/hrms/post_library1'
// @/api/hrms/training_record
export function getPostLibrary1Page (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}