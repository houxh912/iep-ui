import request from '@/router/axios'

const prefixUrl = '/hrms/administrative_approval'
// @/api/hrms/administrative_approval
export function getAdministrativeApprovalPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}
