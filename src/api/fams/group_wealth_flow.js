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