import request from '@/router/axios'
const prefixUrl = '/mlms'

export function getTableData () {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
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
