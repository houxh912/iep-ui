import request from '@/router/axios'
const prefixUrl = '/ics/serviceDialog'

export function getQuery (query) {
  return request({
    url: `${prefixUrl}/query/${query}`,
    method: 'get',
  })
}

export function getDialogPage (query) {
  return request({
    url: `${prefixUrl}/getDialogPage`,
    method: 'get',
    params: query,
  })
}
