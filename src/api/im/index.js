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