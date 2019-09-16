import request from '@/router/axios'

const prefixUrl = '/tms'
// @/api/tms/tag
export function getTagDescriptionPageByTagId (id) {
  return request({
    url: `${prefixUrl}/description/page/${id}`,
    method: 'get',
  })
}

export function putTagDesc (obj) {
  return request({
    url: `${prefixUrl}/description/update`,
    method: 'post',
    data: obj,
  })
}

// 添加标签描述
export function postTagDesc (obj) {
  return request({
    url: `${prefixUrl}/description/create`,
    method: 'post',
    data: obj,
  })
}

// 添加标签描述
export function getTagDesc (params) {
  return request({
    url: `${prefixUrl}/description/page/${params.id}`,
    method: 'get',
    params: params,
  })
}

export function deleteTagDescById (id) {
  return request({
    url: `${prefixUrl}/description/delete/${id}`,
    method: 'post',
  })
}
