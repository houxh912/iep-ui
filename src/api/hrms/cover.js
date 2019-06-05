import request from '@/router/axios'

const prefixUrl = '/hrms/check'
const detailsUrl = '/hrms/details'

export function getTemplatePage (params) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: params,
  })
}

export function createTemplate (obj) {
  return request({
    url: `${detailsUrl}/create`,
    method: 'post',
    data: obj,
  })
}
