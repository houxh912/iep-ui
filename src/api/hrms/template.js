import request from '@/router/axios'

const prefixUrl = '/hrms/template'

export function getTemplatePage (params) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: params,
  })
}

export function deleteTemplateById (id) {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: 'post',
  })
}

export function createTemplate (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}
