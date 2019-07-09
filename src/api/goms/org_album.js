import request from '@/router/axios'
const prefixUrl = '/admin/org_album'

// 组织相册
export function geOrgPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}

// 新增
export function orgUpdate (data) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: data,
  })
}

// 修改
export function orgCreate (data) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: data,
  })
}

// 删除
export function orgDelete (id) {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: 'post',
  })
}
