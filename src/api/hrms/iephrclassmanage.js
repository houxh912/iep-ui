import request from '@/router/axios'
const prefixUrl = '/hrms/iephrclassmanage'

export function getClassManagePage (params) {
  return request({
    url: `${prefixUrl}/getPage`,
    method: 'get',
    params: params,
  })
}

export function createClassManage (data) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: data,
  })
}

export function updateClassManage (data) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: data,
  })
}

export function deleteClassManage (id) {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: 'post',
  })
}

export function getClassManageList () {
  return request({
    url: `${prefixUrl}/list`,
    method: 'get',
  })
}
