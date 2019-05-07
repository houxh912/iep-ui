import request from '@/router/axios'
const prefixUrl = '/tms/channel_tag'

export const getTagsList = (params) => {
  return request({
    url: `${prefixUrl}/list`,
    method: 'get',
    params: params,
  })
}
