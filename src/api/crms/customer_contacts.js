import request from '@/router/axios'
const prefixUrl = '/crm/customer'
//联系人列表
export function getContactPage (query) {
  return request({
    url: `${prefixUrl}/contact/page`,
    method: 'get',
    params: query,
  })
}
//联系人id查询
export function getContactById (id) {
  return request({
    url: `${prefixUrl}/contact/${id}`,
    method: 'get',
  })
}
//联系人新增
export function postContact (obj) {
  return request({
    url: `${prefixUrl}/contract/create`,
    method: 'post',
    data: obj,
  })
}
//联系人更新
export function putContact (obj) {
  return request({
    url: `${prefixUrl}/contract/update`,
    method: 'post',
    data: obj,
  })
}
