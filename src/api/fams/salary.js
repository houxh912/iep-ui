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

export function getSalaryByIdPage (id) {
  return function (query) {
    return request({
      url: `${prefixUrl}/page/${id}`,
      method: 'get',
      params: query,
    })
  }
}

export function getSalaryById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}
export function getPayrollById (id) {
  return request({
    url: `${prefixUrl}/payroll/${id}`,
    method: 'get',
  })
}

export function grantSalaryById (id) {
  return request({
    url: `${prefixUrl}/payroll/grant/${id}`,
    method: 'post',
  })
}

export function addSalary (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function deleteSalaryById (id) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: [id],
  })
}