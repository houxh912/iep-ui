import request from '@/router/axios'
const prefixUrl = '/crm/customer' 
//方案列表
export function getSchemePage (query) {
  return request({
    url: `${prefixUrl}/scheme/page`,
    method: 'get',
    params: query,
  })
}
