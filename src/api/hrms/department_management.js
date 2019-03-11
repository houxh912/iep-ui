import request from '@/router/axios'

const prefixUrl = '/admin/dept'
// @/api/hrms/department_management
export function getDepartmentManagePage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}
