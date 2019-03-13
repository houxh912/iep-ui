import request from '@/router/axios'
// @/api/hrms/post_type
export function getCommonList (url, name) {
  return request({
    url: `/${url}/list`,
    method: 'get',
    params: {
      name,
    },
  })
}