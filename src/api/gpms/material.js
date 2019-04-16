import request from '@/router/axios'
const prefixUrl = '/prms/iepProjectMaterial'

export function getMaterialList (obj) {
  return request({
    url: `${prefixUrl}/standardList`,
    method: 'get',
    params: obj,
  })
}

export function getMeetingList (obj) {
  return request({
    url: `${prefixUrl}/meetingList`,
    method: 'get',
    params: obj,
  })
}