import request from '@/router/axios'

const prefixUrl = '/fams/group_wealth_flow'
// @/api/fams/group_wealth_flow
export function getGroupWealthFlowPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}

// 收款情况
export function getGroupReceipts () {
  return request({
    url: `${prefixUrl}/group/receipts`,
    method: 'get',
  })
}
