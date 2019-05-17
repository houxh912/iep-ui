import request from '@/router/axios'

const prefixUrl = '/fams/org_borrow'
// @/api/fams/org_borrow

export function getOrgBorrowPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}
