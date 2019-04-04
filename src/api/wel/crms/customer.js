import request from '@/router/axios'

export function getContractList (query) {
  return request({
    url: '/crm/cms/wel/contract/list',
    method: 'get',
    params: query,
  })
}
export function getCustomerList (query) {
  return request({
    url: '/crm/cms/wel/customer/list',
    method: 'get',
    params: query,
  })
}
