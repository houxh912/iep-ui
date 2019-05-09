import request from '@/router/axios'

const prefixUrl = '/fams/invoice'
// @/api/fams/invoice

export function getMyInvoicePage (query) {
  return request({
    url: `${prefixUrl}/my/page`,
    method: 'get',
    params: query,
  })
}