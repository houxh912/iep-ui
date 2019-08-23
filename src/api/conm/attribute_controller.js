import request from '@/router/axios'

const prefixUrl = '/cms/info_attribute'
// @/api/conm/info_attribute
//推荐位管理控制器
export function getPageById (id) {
  return request({
    url: `${prefixUrl}/${id}/list`,
    method: 'get',
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
export function deleteAttributeById (id) {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: 'post',
  })
}