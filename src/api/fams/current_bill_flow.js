import request from '@/router/axios'

const prefixUrl = '/fams/current_bill_flow'
// @/api/fams/current_bill_flow

export function getCurrentBillFlowPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}
export function getAllCurrentBillFlowPage (query) {
  return request({
    url: `${prefixUrl}/all/page`,
    method: 'get',
    params: query,
  })
}