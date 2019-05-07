import request from '@/router/axios'
const prefixUrl = '/hrms/channel_recruit'

export const getPostList = (params) => {
  return request({
    url: `${prefixUrl}/list`,
    method: 'get',
    params: params,
  })
}
