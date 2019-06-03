import request from '@/router/axios'

const prefixUrl = '/fams/balance_rule'
// @/api/fams/balance_rule

export function addBellBalanceRule () {
  return request({
    url: `${prefixUrl}/login/bell/add`,
    method: 'get',
  })
}