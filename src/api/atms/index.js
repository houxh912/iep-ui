import request from '@/router/axios'
const prefixUrl = '/atms/task'

export function getMyAtms (obj) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: obj,
  })
}

export function getAllAtms (obj) {
  return request({
    url: `${prefixUrl}/page/all`,
    method: 'get',
    params: obj,
  })
}

export function getMyCount (obj) {
  return request({
    url: `${prefixUrl}/myCount`,
    method: 'get',
    params: obj,
  })
}

export function getAllCount (obj) {
  return request({
    url: `${prefixUrl}/allCount`,
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

export function deleteAtmsById (id,reserved) {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: 'post',
    data: {
      id,
      reserved,
    },
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