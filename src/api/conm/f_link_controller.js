import request from '@/router/axios'

const prefixUrl = '/cms/info_friendlink'
// @/api/conm/f_link_controller
//友情链接管理
export function getPage (params) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: params,
  })
}
export function getPageDetailById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}
export function postPage (obj) {
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
export function deleteFLinkById (id) {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: 'post',
  })
}