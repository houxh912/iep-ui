import request from '@/router/axios'
const prefixUrl = '/crm/customer'
//咨询列表
export function getInfoPage (query) {
  return request({
    url: `${prefixUrl}/information/page`,
    method: 'get',
    params: query,
  })
}
