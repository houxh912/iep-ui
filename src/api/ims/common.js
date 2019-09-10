import request from '@/router/axios'

const prefixUrl = '/ims/common'
// @/api/ims/common
export function getTemplatePage (query) {
  return request({
    url: `${prefixUrl}/template/my_page`,
    method: 'get',
    params: query,
  })
}

export function getTemplateById (id) {
  return request({
    url: `${prefixUrl}/template/${id}`,
    method: 'get',
  })
}

export function postTemplate (obj) {
  return request({
    url: `${prefixUrl}/template/create`,
    method: 'post',
    data: obj,
  })
}

export function putTemplate (obj) {
  return request({
    url: `${prefixUrl}/template/update`,
    method: 'post',
    data: obj,
  })
}

export function deleteTemplateById (id) {
  return request({
    url: `${prefixUrl}/template/delete/${id}`,
    method: 'post',
  })
}
