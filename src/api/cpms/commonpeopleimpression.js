import request from '@/router/axios'
export const prefixUrl = '/cpms/iepcommonpeopleimpression'

export function getImpressionByUserId (params) {
  return request({
    url: `${prefixUrl}/userId`,
    method: 'get',
    params: params,
  })
}

export function impressionCreate (data) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: data,
  })
}
