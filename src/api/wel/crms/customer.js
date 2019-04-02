import request from '@/router/axios'

export function getContractPage (query) {
  return request({
    url: '/crm/cms/wel/contract/list',
    method: 'get',
    params: query,
  })
}
export function getCustomerPage (query) {
  return request({
    url: '/crm/cms/wel/customer/list',
    method: 'get',
    params: query,
  })
}
