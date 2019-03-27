import request from '@/router/axios'
const prefixUrl = '/mlms/contract'
//合同列表
export function getAgreementPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}
