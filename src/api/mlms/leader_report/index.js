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