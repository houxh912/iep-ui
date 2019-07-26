import request from '@/router/axios'
export const prefixUrl = '/cpms/iepcommonpeopleimpression'

export function getImpressionById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

export function impressionCreate (data) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: data,
  })
}
