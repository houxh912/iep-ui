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

export function deleteAtmsById (id) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: [id],
  })
}

export function changeAtmsStatus (id, status) {
  return request({
    url: `${prefixUrl}/status/update`,
    method: 'post',
    data: {
      id,
      status,
    },
  })
}

export function transferPrincipal (obj) {
  return request({
    url: `${prefixUrl}/deliver`,
    method: 'post',
    data: obj,
  })
}