import request from '@/router/axios'

const prefixUrl = '/fams/finance/account'
// @/api/fams/financial_management

export function getCreateFinanceByUserId (userId) {
  return request({
    url: `${prefixUrl}/create_by_user/${userId}`,
    method: 'get',
  })
}
