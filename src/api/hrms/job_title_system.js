import request from '@/router/axios'

const prefixUrl = '/hrms/job_title_system'
// @/api/hrms/training_record
export function getJobTitleSystemPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}