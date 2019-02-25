import request from '@/router/axios'

const prefixUrl = '/hrms/employee_profile'
// @/api/hrms/employee_profile
export function getEmployeeProfilePage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}