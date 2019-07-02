import request from '@/router/axios'
const prefixUrl = '/ims/im'

export function getTotalHistory () {
  return request({
    url: `${prefixUrl}/init`,
    method: 'get',
  })
}

export function getMoreHistory (params) {
  return request({
    url: `${prefixUrl}/get_history`,
    method: 'get',
    params,
  })
}

export function clearUnread (data) {
  return request({
    url: `${prefixUrl}/read_all`,
    method: 'post',
    data,
  })
}

export function createGroup (data) {
  return request({
    url: `${prefixUrl}/creat_group`,
    method: 'post',
    data,
  })
}

export function updateGroupInfo (data) {
  return request({
    url: `${prefixUrl}/update_group`,
    method: 'post',
    data,
  })
}

export function updateGroupMember (data) {
  return request({
    url: `${prefixUrl}/update_member`,
    method: 'post',
    data,
  })
}

export function getGroup () {
  return request({
    url: `${prefixUrl}/get_group`,
    method: 'get',
  })
}

export function getGroupMembers (params) {
  return request({
    url: `${prefixUrl}/get_group_members`,
    method: 'get',
    params,
  })
}

export function deleteGroup (data) {
  return request({
    url: `${prefixUrl}/del_group`,
    method: 'post',
    data,
  })
}

export function getFile (fileName) {
  return request({
    url: `${prefixUrl}/file/${fileName}`,
    method: 'get',
    responseType: 'blob',
  })
}

export function createCustomGroup (data) {
  return request({
    url: `${prefixUrl}/create_custom_group`,
    method: 'post',
    data,
  })
}

export function moveToCustomGroup (data) {
  return request({
    url: `${prefixUrl}/add_custom_members`,
    method: 'post',
    data,
  })
}

export function getCustomGroup () {
  return request({
    url: `${prefixUrl}/get_custom_group`,
    method: 'get',
  })
}