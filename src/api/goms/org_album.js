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
export function orgCreate (data) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: data,
  })
}
