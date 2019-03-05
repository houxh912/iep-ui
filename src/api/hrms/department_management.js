import request from '@/router/axios'

const prefixUrl = '/hrms/department_management'
// @/api/hrms/training_record
export function getDepartmentManagePage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}
