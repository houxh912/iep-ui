import request from '@/router/axios'
const prefixUrl = '/hrms/iephrsystemfilemanage'

export function getFilemanagePage (params) {
  return request({
    url: `${prefixUrl}/getPage`,
    method: 'get',
    params: params,
  })
}

export function createFilemanage (data) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: data,
  })
}

export function updateFilemanage (data) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: data,
  })
}

export function getDetailById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

export function deleteFilemanage (id) {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: 'post',
  })
}
