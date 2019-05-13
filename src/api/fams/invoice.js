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
// 财务管理
export function getInvoicePage (query) {
  return request({
    url: `${prefixUrl}/financial_page`,
    method: 'get',
    params: query,
  })
}

export function getInvoiceById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

export function postInvoice (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function deleteInvoiceById (id) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: [id],
  })
}

export function deleteInvoiceBatch (ids) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: ids,
  })
}