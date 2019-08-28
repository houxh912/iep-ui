import request from '@/router/axios'
export const prefixUrl = '/rss/gms'
// @/api/rss/gms
export function getRssGmsPage (params) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: params,
  })
}
