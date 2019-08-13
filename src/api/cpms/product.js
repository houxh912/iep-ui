import request from '@/router/axios'
export const prefixUrl = '/cpms/product'

export function getProductPage (params) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: params,
  })
}

export function postProduct (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function putProduct (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}

export function passProduct (id) {
  return request({
    url: `${prefixUrl}/audit_agree/${id}`,
    method: 'post',
  })
}

export function rejectProduct (id) {
  return request({
    url: `${prefixUrl}/audit_disagree/${id}`,
    method: 'post',
  })
}

export function getProductById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

export function deleteProductById (id) {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: 'post',
  })
}
