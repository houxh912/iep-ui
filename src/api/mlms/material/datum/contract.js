import request from '@/router/axios'
const prefixUrl = '/mlms/contract'

export function getTableData (params) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: params,
  })
}

export function createData (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function updateData (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}

export function deleteData (id) {
  let ids = typeof id === 'object' ? id : [id]
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: ids,
  })
}

export function getDataById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

// 查看所有客户列表
export function getCustomer (obj) {
  return request({
    url: '/crm/customer/page',
    method: 'get',
    params: obj,
  })
}

// 根据客户id查询市场经理
export function getManeger (id) {
  return request({
    url: `${prefixUrl}/getManeger/${id}`,
    method: 'get',
  })
}
