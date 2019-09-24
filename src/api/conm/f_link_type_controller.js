import request from '@/router/axios'

const prefixUrl = '/cms/info_friendlinktype'
// @/api/conm/f_link_controller
//友情链接管理
export function getTypePage (params) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: params,
  })
}
export function getTypePageDetailById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}
export function postTypePage (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}
export function updateTypePage (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}
export function deleteFLinkTypeById (id) {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: 'post',
  })
}