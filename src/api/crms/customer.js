import request from '@/router/axios'

const prefixUrl = '/crm/customer'
//客户page
export function getCustomerPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}
//客户详情
export function getCustomerById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}
//新增客户
export function postCustomer (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}
//编辑客户
export function putCustomer (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}
//删除客户
export function deleteCustomerById (id) {
  return request({
    url: `${prefixUrl}/delete/batch/${id}`,
    method: 'post',
  })
}
export function deleteCustomerBatch (ids) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: ids,
  })
}
// 添加协助人
export function AddCollaborator (query) {
  return request({
    url: `${prefixUrl}/create/collaboration`,
    method: 'post',
    data: query,
  })
}
//获取协作人列表
export function getCollaboratorPage (id, query) {
  return request({
    url: `${prefixUrl}/page/collaboration/${id}`,
    method: 'get',
    params: query,
  })
}
//转移客户
export function TransferCustomers (query) {
  return request({
    url: `${prefixUrl}/transfer`,
    method: 'post',
    data: query,
  })
}
