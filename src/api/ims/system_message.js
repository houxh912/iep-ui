import request from '@/router/axios'

const prefixUrl = '/ims/system_message'
// @/api/ims/system_message
export function getSystemMessagePage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}
