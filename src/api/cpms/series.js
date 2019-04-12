import request from '@/router/axios'
const prefixUrl = '/cpms/product'
//合同列表

export function getSeriesPage (params) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: params,
  })
}

export function postSeries (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function putSeries (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}

export function getSeriesById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}
