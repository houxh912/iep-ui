import request from '@/router/axios'

const prefixUrl = '/fams/wealth_flow'
// @/api/fams/wealth_flow
export function getWealthFlowPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}

// 频道页获取奖惩记录
export function getWealthFlowListById (id) {
  return request({
    url: `${prefixUrl}/list/${id}`,
    method: 'get',
  })
}

// 频道页获取奖惩记录
export function getWealthFlowPageByUserId (query) {
  return request({
    url: `${prefixUrl}/hr/page`,
    method: 'get',
    params: query,
  })
}
