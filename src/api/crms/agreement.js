import request from '@/router/axios'
// const prefixUrl = '/mlms/contract'
const crmUrl = '/crm/contract'
//合同列表
// export function getAgreementPage (query) {
//   return request({
//     url: `${prefixUrl}/page`,
//     method: 'get',
//     params: query,
//   })
// }
// 客户详情下的合同列表
export function getAgreementPage (query) {
  return request({
    url: `${crmUrl}/page`,
    method: 'get',
    params: query,
  })
}