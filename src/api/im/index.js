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

