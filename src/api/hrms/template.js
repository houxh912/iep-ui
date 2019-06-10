import request from '@/router/axios'

const prefixUrl = '/hrms/template'
const checkUrl = '/hrms/check'

export function getTemplatePage (params) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: params,
  })
}

export function getTemplateById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
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

export function updateTemplate (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}

// 删除考核指标
export function deleteCheckById (id) {
  return request({
    url: `${checkUrl}/delete/${id}`,
    method: 'post',
  })
}
