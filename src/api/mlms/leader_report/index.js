import request from '@/router/axios'
const prefixUrl = '/mlms/leader_report'

export function getTableData (query) {
  return request({
    url: `${prefixUrl}/personal/report`,
    method: 'get',
    params: query,
  })
}
export function getOrgTableData (query) {
  return request({
    url: `${prefixUrl}/org/report`,
    method: 'get',
    params: query,
  })
}
export function getCount () {
  return request({
    url: `${prefixUrl}/getCount`,
    method: 'get',
  })
}
export function getStaffReport (id) {
  return request({
    url: `/mlms/weekmonthreport/${id}`,
    method: 'get',
  })
}
export function getOgrReport (id) {
  return request({
    url: `/mlms/orgreport/${id}`,
    method: 'get',
  })
}
export function putStaffReport (obj) {
  return request({
    url: '/mlms/weekmonthreport/report/time',
    method: 'post',
    data: obj,
  })
}