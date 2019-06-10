import request from '@/router/axios'
const prefixUrl = '/admin/token'
export function fetchList (query) {
  return request({
    url: '/admin/token/page',
    method: 'get',
    params: query,
  })
}

export function delObj (token) {
  return request({
    url: '/admin/token/' + token,
    method: 'delete',
  })
}

export function getUnionPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}