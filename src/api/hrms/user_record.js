import request from '@/router/axios'

const prefixUrl = '/hrms/user_record'
// @/api/hrms/user_record
export function getUserRecordOvertimeListById (id) {
  return request({
    url: `${prefixUrl}/overtime/list/${id}`,
    method: 'get',
  })
}

export function getPersonnelChangePageByUserId (query) {
  return request({
    url: `${prefixUrl}/user/page`,
    method: 'get',
    params: query,
  })
}