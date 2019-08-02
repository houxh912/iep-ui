import request from '@/router/axios'
const prefixUrl = '/mlms/leader_report'

export function getTableData (query) {
  return request({
    url: `${prefixUrl}/personal/report`,
    method: 'get',
    params: query,
  })
}
export function getProjectPage (query) {
  return request({
    url: `${prefixUrl}/project/page`,
    method: 'get',
    params: query,
  })
}
export function getVisitPage (query) {
  return request({
    url: `${prefixUrl}/visit/page`,
    method: 'get',
    params: query,
  })
}
export function getProjectReportById (projectWeekReportId) {
  return request({
    url: `/mlms/projectreport/${projectWeekReportId}`,
    method: 'get',
  })
}
export function putProjectReport (obj) {
  return request({
    url: '/mlms/projectreport/report/time',
    method: 'post',
    data: obj,
  })
}
export function getMeeting (id) {
  return request({
    url: `/mlms//meeting/${id}`,
    method: 'get',
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
export function putOrgReport (obj) {
  return request({
    url: '/mlms/orgreport/report/time',
    method: 'post',
    data: obj,
  })
}