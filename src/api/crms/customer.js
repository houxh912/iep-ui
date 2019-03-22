import request from '@/router/axios'

const prefixUrl = '/crms/customer'
// @/api/crms/customer
export function getCustomerPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}
export function getCustomerById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}
export function postCustomer (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}
export function putCustomer (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}
export function deleteCustomerById (id) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: [id],
  })
}
export function deleteCustomerBatch (ids) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: ids,
  })
}