import request from '@/router/axios'
const prefixUrl = '/mlms/contract'

export function getContractPage (params) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: params,
  })
}

export function postContract (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function putContract (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}

export function deleteContractById (id) {
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
