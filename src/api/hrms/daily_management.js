import request from '@/router/axios'

const prefixUrl = '/hrms'
// @/api/hrms/daily_management
export function getLaborContractPage (query) {
  return request({
    url: `${prefixUrl}/relation/labor_contract/maturity/page`,
    method: 'get',
    params: query,
  })
}

export function getPersonnelDynamicsPage (query) {
  return request({
    url: `${prefixUrl}/administrative_approval/personnel/page`,
    method: 'get',
    params: query,
  })
}