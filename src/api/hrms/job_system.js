import request from '@/router/axios'

const prefixUrl = '/hrms/job_system'
// @/api/hrms/training_record
export function getJobSystemPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}