import request from '@/router/axios'

const prefixUrl = '/hrms/job_title_system'
// @/api/hrms/job_title_system
export function getJobTitleSystemPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}