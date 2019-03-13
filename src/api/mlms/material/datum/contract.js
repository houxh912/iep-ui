import request from '@/router/axios'
const prefixUrl = '/mlms/iepcontract'

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
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: 'post',
  })
}

export function getDataById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}
