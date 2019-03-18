import request from '@/router/axios'

const prefixUrl = '/hrms/relation'
// @/api/hrms/employee_profile
export function post (obj, relatioName, type, rid) {
  return request({
    url: `${prefixUrl}/${relatioName}/create`,
    method: 'post',
    params: {
      type,
      id: rid,
    },
    data: obj,
  })
}
export function put (obj, relatioName) {
  return request({
    url: `${prefixUrl}/${relatioName}/update`,
    method: 'post',
    data: obj,
  })
}
export function del (id, relatioName) {
  return request({
    url: `${prefixUrl}/${relatioName}/delete/${id}`,
    method: 'post',
  })
}