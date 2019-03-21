import request from '@/router/axios'

const prefixUrl = '/wel/approval'
// @/api/hrms/post_type
export function getApprovalInitiate (query) {
  return request({
    url: `${prefixUrl}/initiate`,
    method: 'get',
    params: query,
  })
}