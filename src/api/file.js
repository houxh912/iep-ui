import request from '@/router/axios'
const prefixUrl = '/admin/file'

export const uploadIdCard = (data, config) => {
  return request({
    url: `${prefixUrl}/upload/avatar`,
    method: 'post',
    data: data,
  }, config)
}
