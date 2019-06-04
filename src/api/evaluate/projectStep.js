// 项目阶段
import request from '@/views/wenjuan/router/request'
const queryUrl = '/evaluate/evaluatesection'

// 项目阶段删除
export function deleteData (id) {
  return request({
    url: `${queryUrl}/delete/${id}`,
    method: 'post',
  })
}

// 项目阶段保存
export function createData (params) {
  return request({
    url: `${queryUrl}/save`,
    method: 'post',
    data: params,
  })
}

// 项目阶段修改
export function updateData (params) {
  return request({
    url: `${queryUrl}/update`,
    method: 'post',
    data: params,
  })
}

// 项目阶段查询
export function getData (params) {
  return request({
    url: `${queryUrl}/select`,
    method: 'get',
    params: params,
  })
}
