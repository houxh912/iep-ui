import request from '@/router/axios'
const prefixUrl = '/admin/token'
export function fetchList (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}

export function delObj (token) {
  return request({
    url: `${prefixUrl}/${token}`,
    method: 'delete',
  })
}