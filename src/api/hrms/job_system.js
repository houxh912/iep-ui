import request from '@/router/axios'

const prefixUrl = '/hrms/job_system'
// @/api/hrms/job_system
export function getJobPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}