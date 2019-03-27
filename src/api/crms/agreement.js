import request from '@/router/axios'
const prefixUrl = '/crm/customer'
//合同列表
export function getAgreementPage (query) {
  return request({
    url: `${prefixUrl}/agreement/page`,
    method: 'get',
    params: query,
  })
}
