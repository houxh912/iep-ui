import request from '@/router/axios'
const prefixUrl = '/crm/business'

export const getBusinessPage = (params) => {
  return request({
    url: `${prefixUrl}/getPage`,
    method: 'get',
    params: params,
  })
}

export const getLatestList = (params) => {
  return request({
    url: `${prefixUrl}/latest`,
    method: 'get',
    params: params,
  })
}

export const getPopularList = (params) => {
  return request({
    url: `${prefixUrl}/popular`,
    method: 'get',
    params: params,
  })
}
