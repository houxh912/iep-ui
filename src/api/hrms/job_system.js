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
export function postJob (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}
export function putJob (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}