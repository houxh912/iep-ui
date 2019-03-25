import request from '@/router/axios'
const prefixUrl = '/crm/customer'
//拜访记录列表
export function getRecordPage (query) {
  return request({
    url: `${prefixUrl}/record/page`,
    method: 'get',
    params: query,
  })
}
