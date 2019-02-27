import request from '@/router/axios'

export function getAdmniList (query) {
  return request({
    url: '/hrms/administrative_approval/page',
    method: 'get',
    params: query,
  })
}
