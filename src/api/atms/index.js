import request from '@/router/axios'
const prefixUrl = '/atms/task'

export function getTableData (obj) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: obj,
  })
}

export function createAtms (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function updateAtms (obj) {
  return request({
    url: `${prefixUrl}/update`,
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

export function conversionAtms (obj) {
  return request({
    url: `${prefixUrl}/transfer`,
    method: 'post',
    data: obj,
  })
}

export function getAtmsListByName (query) {
  return request({
    url: `${prefixUrl}/list`,
    method: 'get',
    params: query,
  })
}