import request from '@/router/axios'

const prefixUrl = '/fams/salary'
// @/api/fams/salary

export function getSalaryPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}

export function reviewApprovaBatch (obj) {
  return request({
    url: `${prefixUrl}/status/batch`,
    method: 'post',
    data: obj,
  })
}

export function getSalaryByIdPage (id) {
  return function (query) {
    return request({
      url: `${prefixUrl}/${id}`,
      method: 'get',
      params: query,
    })
  }
}