import request from '@/router/axios'
const prefixUrl = '/mlms/leader_report'

export function getTableData (params) {
  return request({
    url: `${prefixUrl}/personal/report`,
    method: 'get',
    data: params,
  })
}
