import request from '@/router/axios'
const prefixUrl = '/prms/iepProjectInformation'

export function getTableData (obj) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: obj,
  })
}

export function createData (obj) {
  return request({
    url: `${prefixUrl}`,
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

// 详情
export function getDataDetail (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
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
