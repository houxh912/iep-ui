import request from '@/router/axios'

const prefixUrl = '/ims/common/template'
// @/api/ims/system_message
export function getPage () {
  return request({
    url: `${prefixUrl}/my_page`,
    method: 'get',
  })
}
export function getPageById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}
export function createPage (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}
export function updatePage (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}
export function deleteById (id) {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: 'post',
  })
}