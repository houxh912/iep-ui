import request from '@/router/axios'
const prefixUrl = '/admin/union/album'

// 组织相册
export function getAlbumPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}

// 修改
export function putAlbum (data) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: data,
  })
}

// 新增
export function postAlbum (data) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: data,
  })
}

// 删除
export function deleteAlbum (id) {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: 'post',
  })
}
