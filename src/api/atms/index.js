import request from '@/router/axios'
const prefixUrl = '/atms/task/'

export function getTableData (obj) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: obj,
  })
}

export function postAtms (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function getAtmsById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}
