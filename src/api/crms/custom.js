import request from '@/router/axios'

export function fetchList (query) {
  return request({
    url: '/crms/custom/page',
    method: 'get',
    params: query,
  })
}
