import request from '@/router/axios'
const prefixUrl = '/crm/customer'
// 查看客户信息
export function fetchInfo (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}
